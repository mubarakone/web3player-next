import React from 'react'
import Modal from './Modal'
import { useAccount, useSwitchNetwork, useContractWrite, useContractRead } from 'wagmi'

export default function Deposit(props) {
    const StakingContractABI = [
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"_nftContractAddress",
                 "type":"address"
              }
           ],
           "stateMutability":"payable",
           "type":"constructor"
        },
        {
           "anonymous":false,
           "inputs":[
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"previousOwner",
                 "type":"address"
              },
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"newOwner",
                 "type":"address"
              }
           ],
           "name":"OwnershipTransferred",
           "type":"event"
        },
        {
           "anonymous":false,
           "inputs":[
              {
                 "indexed":false,
                 "internalType":"address",
                 "name":"player",
                 "type":"address"
              },
              {
                 "indexed":false,
                 "internalType":"uint256",
                 "name":"priceInput",
                 "type":"uint256"
              }
           ],
           "name":"PlayerToStake",
           "type":"event"
        },
        {
           "inputs":[
              
           ],
           "name":"Owner",
           "outputs":[
              {
                 "internalType":"address payable",
                 "name":"",
                 "type":"address"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"",
                 "type":"address"
              }
           ],
           "name":"balances",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"deposit",
           "outputs":[
              
           ],
           "stateMutability":"payable",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"fetchMsgValue",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"getBalance",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"isMsgValueGreater",
           "outputs":[
              {
                 "internalType":"bool",
                 "name":"",
                 "type":"bool"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"msgValue",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"nftContract",
           "outputs":[
              {
                 "internalType":"contract NFTContract",
                 "name":"",
                 "type":"address"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"owner",
           "outputs":[
              {
                 "internalType":"address",
                 "name":"",
                 "type":"address"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"ownerWithdrawAll",
           "outputs":[
              
           ],
           "stateMutability":"payable",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"priceOfVideo",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"renounceOwnership",
           "outputs":[
              
           ],
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"newOwner",
                 "type":"address"
              }
           ],
           "name":"transferOwnership",
           "outputs":[
              
           ],
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"uint256",
                 "name":"priceOfAmountVideoWatched",
                 "type":"uint256"
              },
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"withdraw",
           "outputs":[
              
           ],
           "stateMutability":"payable",
           "type":"function"
        }
     ]
    
    const { write } = useContractWrite({
        address: '0xB4e0156F3621dC80e72E78D0388aBce8aa2187c1',
        abi: StakingContractABI,
        functionName: 'deposit',
        chainId: 5,
        args: [1],
        onSuccess(data) {
            setStakeCondition(true)
            console.log('ContractWrite Success: ', data)
            setOnOpen(false)
        },
        onError(error) {
            setStakeCondition(false)
            console.log('ContractWrite Error: ', error)
            setOnOpen(false)
        },
    })
  return (
    <Modal
        clickPlay={props.clickPlay} 
        cancelModal={props.cancelModal} 
        acceptModal={write}
        stakedAmount={props.stakedAmount}
     />
  )
}
