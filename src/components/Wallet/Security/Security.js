import './Security.scss'

import * as blockies from 'blockies-ts';
import { MdOutlineAdd, MdOutlineDelete } from 'react-icons/md'
import { Loading, TextInput, Button } from '../../common'
import { Interface } from 'ethers/lib/utils'
import accountPresets from '../../../consts/accountPresets'
import privilegesOptions from '../../../consts/privilegesOptions'
import { useRelayerData } from '../../../hooks'

const IDENTITY_INTERFACE = new Interface(
  require('adex-protocol-eth/abi/Identity5.2')
)

const Security = ({ relayerURL, selectedAcc, selectedNetwork, accounts, addresses, addAddress, removeAddress, addRequest }) => {
  const { data, errMsg, isLoading } = useRelayerData(relayerURL ? `${relayerURL}/identity/${selectedAcc}/${selectedNetwork.id}/privileges` : null)
  const privileges = data ? data.privileges : {}

  const craftTransaction = (address, privLevel) => {
    return {
      to: selectedAcc,
      data: IDENTITY_INTERFACE.encodeFunctionData('setAddrPrivilege', [
        address,
        privLevel,
      ]),
      value: '0x',
    }
  }

  const addTransactionToAddRequest = txn => {
    addRequest({
      id: `setPriv_${txn.data}`,
      txn: txn,
      chainId: selectedNetwork.chainId,
      account: selectedAcc,
    })
  }

  const onMakeDefaultBtnClicked = key => {
    // @TODO
  }

  const onRemoveBtnClicked = key => {
    const txn = craftTransaction(key, privilegesOptions.false)
    addTransactionToAddRequest(txn)
  }

  const selectedAccount = accounts.find(x => x.id === selectedAcc)

  const privList = Object.entries(privileges).map(([addr, privValue]) => {
    if (!privValue) return null
    const isQuickAcc = addr === accountPresets.quickAccManager
    const privText = isQuickAcc
      ? `Email/Password signer (${selectedAccount.email})`
      : addr
    const signerAddress = isQuickAcc
      ? selectedAccount.signer.quickAccManager
      : selectedAccount.signer.address
    const isSelected = signerAddress === addr

    return (
      <li key={addr}>
        <TextInput className='depositAddress' value={privText} disabled />
        <div className='btns-wrapper'>
          <Button disabled={isSelected} onClick={() => onMakeDefaultBtnClicked(addr)} small>
            {isSelected ? 'Current signer' : 'Make default'}
          </Button>
          <Button
            onClick={() => onRemoveBtnClicked(addr)}
            small
            red
            title={isSelected ? 'Cannot remove the currently used signer' : ''}
            disabled={isSelected}
          >
            Remove
          </Button>
        </div>
      </li>
    )
  }).filter(x => x)

  const accountsList = accounts.filter(({ id }) => id !== selectedAcc)
  const accountType = ({ email, signerExtra }) => {
    const walletType = signerExtra && signerExtra.type === 'ledger' ? 'Ledger' : signerExtra && signerExtra.type === 'trezor' ? 'Trezor' : 'Web3'
    return email ? `Ambire account for ${email}` : `Ambire account (${walletType})`
  }
  const toIcon = seed => blockies.create({ seed }).toDataURL()
  const toIconBackgroundImage = seed => ({ backgroundImage: `url(${toIcon(seed)})`})

  // @TODO relayerless mode: it's not that hard to implement in a primitive form, we need everything as-is
  // but rendering the initial privileges instead; or maybe using the relayerless transactions hook/service
  // and aggregate from that
  if (!relayerURL) return (<section id='security'>
    <h3 className='error'>Unsupported: not currently connected to a relayer.</h3>
  </section>)
  return (
    <section id='security'>
      <div className='panel'>
        <div className='title'>Authorized signers</div>
        {errMsg && (<h3 className='error'>Error getting authorized signers: {errMsg}</h3>)}
        {isLoading && <Loading />}
        <ul className='content'>{!isLoading && privList}</ul>
      </div>
  
      <div id="addresses" className='panel'>
        <div className='title'>Addresses</div>
        <div className="content">
          <div className="list">
            {
              accountsList.map(account => (
                  <div className="item" key={account.id} onClick={() => {}}>
                      <div className="inner">
                          <div className="icon" style={toIconBackgroundImage(account.id)}></div>
                          <div className="details">
                              <label>{ accountType(account) }</label>
                              <div className="address">{ account.id }</div>
                          </div>
                      </div>
                  </div>
              ))
            }
            {
                addresses.map(({ name, address }) => (
                    <div className="item" key={address + name}>
                        <div className="inner" onClick={() => {}}>
                            <div className="icon" style={toIconBackgroundImage(address)}></div>
                            <div className="details">
                                <label>{ name }</label>
                                <div className="address">{ address }</div>
                            </div>
                        </div>
                        <div className="button" onClick={() => removeAddress(name, address)}>
                            <MdOutlineDelete/>
                        </div>
                    </div>
                ))
            }
          </div>
          <Button small icon={<MdOutlineAdd/>}>Add Address</Button>
        </div>
      </div>
    </section>
  )
}

export default Security
