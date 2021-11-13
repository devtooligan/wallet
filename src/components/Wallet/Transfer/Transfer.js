import './Transfer.scss'

import { BsArrowDown } from 'react-icons/bs'
import { FaAddressCard } from 'react-icons/fa'
import { useParams, withRouter } from 'react-router'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import SendPlaceholder from './SendPlaceholder/SendPlaceholder'
import { Interface } from 'ethers/lib/utils'
import { useToasts } from '../../../hooks/toasts'
import { TextInput, NumberInput, Button, Select, Loading, DropDown } from '../../common'

const ERC20 = new Interface(require('adex-protocol-eth/abi/ERC20'))
const crossChainAssets = [
    {
        label: 'USD Coin (Polygon)',
        value: 'USDC-polygon',
        icon: 'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/polygon/assets/0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174/logo.png'
    },
    {
        label: 'Tether USD (Polygon)',
        value: 'USDT-polygon',
        icon: 'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/polygon/assets/0xc2132D05D31c914a87C6611C10748AEb04B58e8F/logo.png'
    }
]

const Transfer = ({ history, portfolio, selectedAcc, selectedNetwork, accounts, addRequest }) => {
    const { addToast } = useToasts()
    const { tokenAddress } = useParams()
    const [asset, setAsset] = useState(tokenAddress)
    const [amount, setAmount] = useState(0)
    const [bigNumberHexAmount, setBigNumberHexAmount] = useState('')
    const [address, setAddress] = useState('')
    const [disabled, setDisabled] = useState(true)

    const assetsItems = portfolio.tokens.map(({ label, address, img }) => ({
        label,
        value: address,
        icon: img
    }))

    const addressesItems = accounts
        .filter(({ id }) => id !== selectedAcc)
        .map(({ id }) => id)

    const selectedAsset = portfolio.tokens.find(({ address }) => address === asset)

    const setMaxAmount = () => {
        const { balanceRaw, decimals } = selectedAsset
        const amount = ethers.utils.formatUnits(balanceRaw, decimals)
        onAmountChange(amount)
    }

    const onAmountChange = (value) => {
        const amount = value || '0'
        const { decimals } = selectedAsset
        const bigNumberAmount = ethers.utils.parseUnits(amount, decimals).toHexString()
        setAmount(amount)
        setBigNumberHexAmount(bigNumberAmount)
    }

    const sendTx = () => {
        try {
            const txn = {
                to: tokenAddress,
                value: '0',
                data: ERC20.encodeFunctionData('transfer', [address, bigNumberHexAmount])
            }

            if (Number(tokenAddress) === 0) {
                txn.to = address
                txn.value = bigNumberHexAmount
                txn.data = '0x'
            }

            addRequest({
                id: `transfer_${Date.now()}`,
                type: 'eth_sendTransaction',
                chainId: selectedNetwork.chainId,
                account: selectedAcc,
                txn
            })
        } catch(e) {
            console.error(e)
            addToast(`Error: ${e.message || e}`, { error: true })
        }
    }

    useEffect(() => {
        setAmount(0)
        setBigNumberHexAmount('')
        history.push({ pathname: `/wallet/transfer/${asset}` })
    }, [asset, history])

    useEffect(() => {
        const isAddressValid = /^0x[a-fA-F0-9]{40}$/.test(address)
        setDisabled(!isAddressValid || !(amount > 0) || address === selectedAcc)
    }, [address, amount])

    return (
        <div id="transfer">
           <div className="panel">
               <div className="title">
                   Send
               </div>
               {
                    portfolio.isBalanceLoading ?
                        <Loading/>
                        :
                        assetsItems.length ? 
                            <div className="form">
                                <Select searchable defaultValue={asset} items={assetsItems} onChange={(value) => setAsset(value)}/>
                                <NumberInput value={amount} min="0" onInput={onAmountChange} button="MAX" onButtonClick={() => setMaxAmount()}/>
                                <div id="recipient-field">
                                    <TextInput
                                        placeholder="Recipient"
                                        info="Please double-check the recipient address, blockchain transactions are not reversible."
                                        value={address}
                                        onInput={setAddress}
                                    />
                                    {
                                        addressesItems.length ? 
                                            <DropDown title={<FaAddressCard/>} closeOnClick={true}>
                                                <label>Select from your accounts:</label>
                                                {
                                                    addressesItems.map(id => (
                                                        <div className={`item ${id === address ? 'active' : ''}`} key={id} onClick={() => setAddress(id)}>
                                                            { id }
                                                        </div>
                                                    ))
                                                }
                                            </DropDown>
                                            :
                                            null
                                    }
                                </div>
                                <div className="separator"/>
                                <Button disabled={disabled} onClick={sendTx}>Send</Button>
                            </div>
                            :
                            <SendPlaceholder/>
               }
           </div>
           <div className="panel">
               <div className="placeholder-overlay">
                    Coming Soon...
               </div>
               <div className="title blurred">
                   Cross-chain
               </div>
               <div className="form blurred">
                    <label>From</label>
                    <Select searchable defaultValue={asset} items={assetsItems} onChange={value => setAsset(value)}/>
                    <NumberInput value={amount} min="0" onInput={value => setAmount(value)} button="MAX" onButtonClick={() => setMaxAmount()}/>
                    <div className="separator">
                        <BsArrowDown/>
                    </div>
                    <label>To</label>
                    <Select searchable defaultValue={asset} items={crossChainAssets} onChange={() => {}}/>
                    <NumberInput value={0} min="0" onInput={() => {}} button="MAX" onButtonClick={() => {}}/>
                    <Button>Transfer</Button>
                </div>
           </div>
        </div>
    )
}

export default withRouter(Transfer)
