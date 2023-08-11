'use client'
import React, { useRef, useState, useEffect } from 'react'
import useVideoPlayer from './useVideoPlayer'
import { Web3Button } from '@web3modal/react'
import { useAccount, useSwitchNetwork, useContractWrite } from 'wagmi'
import Modal from './overlays/Modal'

export default function Web3PlayerVideo() {
    const video = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    const videoElement = useRef(null)
    const { status } = useAccount()
    const { switchNetwork } = useSwitchNetwork()
    const testnet = () => {
        switchNetwork(11155111)
    } 

    const StakingContractABI = [
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"_nftContractAddress",
                 "type":"address"
              }
           ],
           "stateMutability":"nonpayable",
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
              
           ],
           "name":"priceOfFullVideo",
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
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"stake",
           "outputs":[
              {
                 "internalType":"bool",
                 "name":"stakeSate",
                 "type":"bool"
              }
           ],
           "stateMutability":"payable",
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
              }
           ],
           "name":"unstake",
           "outputs":[
              {
                 "internalType":"bool",
                 "name":"unstakeState",
                 "type":"bool"
              }
           ],
           "stateMutability":"payable",
           "type":"function"
        }
     ]
    
    const {
        playerState,
        togglePlay,
        handleOnEnded,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        toggleMute,
        toggleFullscreen,
    } = useVideoPlayer(videoElement)

    const [connectedState, setConnectedState] = useState(false)
    const [isStaked, setStakeCondition] = useState(false)

    useEffect(() => {
        if (status == "connected") {
            setConnectedState(true)
            console.log("Connected Wallet")
            testnet()
        } else {
            setConnectedState(false)
            console.log("Disconnected Wallet")
        }
    }, [status])

    const toggleStop = () => {
        setConnectedState(false);
    }

    const { write } = useContractWrite({
        address: '0x0F038A52Fc3205aA3481336de7516DE73838f3C3',
        abi: StakingContractABI,
        functionName: 'stake',
        chainId: 11155111,
        onSuccess(data) {
            setStakeCondition(true)
            console.log('Success: ', data)
        },
        onError(error) {
            setStakeCondition(false)
            console.log('Contract Error: ', error)
        }
    })

  return (
    <div className='group w-full max-w-[700px] relative flex justify-center overflow-hidden rounded-[10px]'>
        {!connectedState 
            ? (<Web3Button style={{position: "fixed", bottom: "55%", zIndex: 1}} />)
            : (null)
        }
        <video 
            src={video}
            ref={videoElement}
            onTimeUpdate={handleOnTimeUpdate}
            onEnded={handleOnEnded}
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            className='w-full'
        />
        {connectedState ?
        (<>
            {isStaked ? 
            (<div name="controls" className='flex items-center justify-evenly absolute w-full max-w-[550px] flex-wrap shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] backdrop-blur-sm border translate-y-[150%] group-hover:translate-y-[0%] transition-all duration-[0.3s] ease-in-out p-3.5 rounded-[10px] border-solid border-[rgba(255,255,255,0.18)] bottom-[30px]'>
                <div name="actions">
                    <button onClick={togglePlay} className='cursor-pointer border-[none]'>
                        {!playerState.isPlaying ? (
                            <i className='bg-[none] text-[white] text-3xl not-italic'>▶️</i>
                        ) : (
                            <i className='bg-[none] text-[white] text-3xl not-italic'>⏸</i>
                        )}
                    </button>
                </div>
                <input 
                    type="range"
                    min="0"
                    max="100"
                    value={playerState.progress}
                    onChange={(e) => handleVideoProgress(e)}
                    className='h-1 w-[350px] rounded-[20px] cursor-pointer h-1.5'
                />
                <button onClick={toggleStop} className='cursor-pointer border-[none]'>
                    <i className='bg-[none] text-[white] text-3xl not-italic'>⏹️</i>
                </button>
                <select
                    className='appearance-none text-center text-base not-italic border-none'
                    value={playerState.speed}
                    onChange={(e) => handleVideoSpeed(e)}
                >
                    <option value="0.50">0.50x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="2">2x</option>
                </select>
                {!connectedState 
                    ? (null)
                    : (<Web3Button style={{}} />)
                }
                <button onClick={toggleMute} className='cursor-pointer border-[none]'>
                    {!playerState.isMuted ? (
                        <i className='bg-[none] text-[white] text-xl not-italic'>🔊</i>
                    ) : (
                        <i className='bg-[none] text-[white] text-xl not-italic'>🔇</i>
                    )}
                </button>
                <button onClick={toggleFullscreen} className='inline cursor-pointer border-[none]'>
                    <i className='bg-[none] text-[white] text-xl not-italic'>📺</i>
                </button>
            </div>) : (
                <button onClick={() => write()} className='z-1 fixed bottom-1/2 font-bold text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-20 h-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    </svg>
                    Start
                </button>
            )}
        </>) : (null)}
            
    </div>
  )
}
