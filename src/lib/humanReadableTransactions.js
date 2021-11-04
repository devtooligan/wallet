import { Interface, getAddress } from 'ethers/lib/utils'

import { verifiedContracts, tokens } from '../consts/verifiedContracts'
import networks from '../consts/networks'
import ERC20ABI from 'adex-protocol-eth/abi/ERC20'

const ERC20 = new Interface(ERC20ABI)
const TRANSFER_SIGHASH = ERC20.getSighash(ERC20.getFunction('transfer').format())

// @TODO custom parsing for univ2 contracts, exact output, etc.
export function getTransactionSummary(txn, bundle) {
    const [to, value, data] = txn
    let callSummary, sendSummary
    // @TODO proper asset symbol
    const network = networks.find(x => x.id === bundle.network)

    const contractKey = bundle.network + ':' + getAddress(to)
    const contractInfo = verifiedContracts[contractKey]

    if (parseInt(value) > 0) sendSummary = `send ${(parseInt(value)/1e18).toFixed(4)} ${network.nativeAssetSymbol} to ${contractInfo ? contractInfo.name : to}`
    if (data !== '0x') {
        if (data.startsWith(TRANSFER_SIGHASH)) {
            const [to, amount] = ERC20.decodeFunctionData('transfer', data)
            const token = tokens[getAddress(to)]
            if (token) {
                callSummary = `send ${(amount/Math.pow(10, token[1])).toFixed(4)} ${token[0]} to ${to}`
            } else {
                // @TODO: maybe we can call the contract and get detailed data
                callSummary = `send ${amount/1e18} unknown token to ${to}`
            }
        } else if (contractInfo) {
            const iface = new Interface(contractInfo.abi)
            const parsed = iface.parseTransaction({ data, value })
            callSummary = `Interaction with ${contractInfo.name}: ${parsed.name}`
        } else callSummary = `unknown call to ${to}`
    }
    return [callSummary, sendSummary].filter(x => x).join(', ')
}