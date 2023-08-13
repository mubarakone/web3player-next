'use client'
import React, { useRef, useState, useEffect } from 'react'
import useVideoPlayer from './useVideoPlayer'
import { Web3Button } from '@web3modal/react'
import { useAccount, useSwitchNetwork, useContractWrite, useContractRead } from 'wagmi'
import Modal from './overlays/Modal'

export default function Web3PlayerVideo() {
    const video = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    const videoElement = useRef(null)
    const { status } = useAccount()
    const { switchNetwork } = useSwitchNetwork()
    const testnet = () => {
        switchNetwork(5)
    }

    const StakingContractABI = [
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"_nftContractAddress",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"_usdcContractAddress",
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
                 "name":"priceOutput",
                 "type":"uint256"
              }
           ],
           "name":"PlayerToUnstate",
           "type":"event"
        },
        {
           "inputs":[
              {
                 "internalType":"uint256",
                 "name":"_amount",
                 "type":"uint256"
              }
           ],
           "name":"approve",
           "outputs":[
              
           ],
           "stateMutability":"nonpayable",
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
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"usdcContract",
           "outputs":[
              {
                 "internalType":"contract IERC20",
                 "name":"",
                 "type":"address"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        }
     ]

    const NFTContractABI = [
        {
           "inputs":[
              
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
                 "name":"owner",
                 "type":"address"
              },
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"approved",
                 "type":"address"
              },
              {
                 "indexed":true,
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"Approval",
           "type":"event"
        },
        {
           "anonymous":false,
           "inputs":[
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"owner",
                 "type":"address"
              },
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"operator",
                 "type":"address"
              },
              {
                 "indexed":false,
                 "internalType":"bool",
                 "name":"approved",
                 "type":"bool"
              }
           ],
           "name":"ApprovalForAll",
           "type":"event"
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
                 "indexed":true,
                 "internalType":"address",
                 "name":"from",
                 "type":"address"
              },
              {
                 "indexed":true,
                 "internalType":"address",
                 "name":"to",
                 "type":"address"
              },
              {
                 "indexed":true,
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"Transfer",
           "type":"event"
        },
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"to",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"approve",
           "outputs":[
              
           ],
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"owner",
                 "type":"address"
              }
           ],
           "name":"balanceOf",
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
           "name":"getApproved",
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
              {
                 "internalType":"uint256",
                 "name":"_tokenId",
                 "type":"uint256"
              }
           ],
           "name":"getpriceOfFullVideo",
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
                 "internalType":"address",
                 "name":"owner",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"operator",
                 "type":"address"
              }
           ],
           "name":"isApprovedForAll",
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
              {
                 "internalType":"uint256",
                 "name":"_price",
                 "type":"uint256"
              }
           ],
           "name":"mintNFT",
           "outputs":[
              
           ],
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"name",
           "outputs":[
              {
                 "internalType":"string",
                 "name":"",
                 "type":"string"
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
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"ownerOf",
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
           "name":"price",
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
                 "name":"from",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"to",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"safeTransferFrom",
           "outputs":[
              
           ],
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"from",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"to",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              },
              {
                 "internalType":"bytes",
                 "name":"data",
                 "type":"bytes"
              }
           ],
           "name":"safeTransferFrom",
           "outputs":[
              
           ],
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"operator",
                 "type":"address"
              },
              {
                 "internalType":"bool",
                 "name":"approved",
                 "type":"bool"
              }
           ],
           "name":"setApprovalForAll",
           "outputs":[
              
           ],
           "stateMutability":"nonpayable",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"bytes4",
                 "name":"interfaceId",
                 "type":"bytes4"
              }
           ],
           "name":"supportsInterface",
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
           "name":"symbol",
           "outputs":[
              {
                 "internalType":"string",
                 "name":"",
                 "type":"string"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              
           ],
           "name":"tokenId",
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
           "name":"tokenURI",
           "outputs":[
              {
                 "internalType":"string",
                 "name":"",
                 "type":"string"
              }
           ],
           "stateMutability":"view",
           "type":"function"
        },
        {
           "inputs":[
              {
                 "internalType":"address",
                 "name":"from",
                 "type":"address"
              },
              {
                 "internalType":"address",
                 "name":"to",
                 "type":"address"
              },
              {
                 "internalType":"uint256",
                 "name":"tokenId",
                 "type":"uint256"
              }
           ],
           "name":"transferFrom",
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
                 "name":"",
                 "type":"uint256"
              }
           ],
           "name":"videoPrices",
           "outputs":[
              {
                 "internalType":"uint256",
                 "name":"",
                 "type":"uint256"
              }
           ],
           "stateMutability":"view",
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
        watchedTime,
        videoDuration,
    } = useVideoPlayer(videoElement)

    const [connectedState, setConnectedState] = useState(false)
    const [isStaked, setStakeCondition] = useState(false)
    const [isOpen, setOnOpen] = useState(false)

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

    const readPriceFromContract = useContractRead({
        address: '0x1AB2a434F093C669424354e884E92Ea10690C6a4',
        abi: NFTContractABI,
        functionName: "getpriceOfFullVideo",
        chainId: 5,
        args: [1],
        onSuccess(data) {
            console.log('readPriceFromContract Success: ', data)
        },
        onError(error) {
            console.log('readPriceFromContract Error: ', error)
        },
    })

    const priceOfFullVideo = readPriceFromContract.data.toString()

    const { write } = useContractWrite({
        address: '0x9E4fAF439C081884F7a057e987177E1fBAA7EdC6',
        abi: StakingContractABI,
        functionName: 'stake',
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

    const toggleStop = () => {
    //    setStakeCondition(false);
        console.log('Watched Time is ', watchedTime)
        console.log('Video Duration is ', videoDuration)
        console.log('priceOfFullVideo is ', priceOfFullVideo)
        const pricePerSecond = priceOfFullVideo/videoDuration
        const priceOfAmountVideoWatched = watchedTime * pricePerSecond
        const finalPriceOfAmountVideoWatched = priceOfAmountVideoWatched.toFixed(2)
        console.log('pricePerSecond is ', pricePerSecond)
        console.log('priceOfAmountVideoWatched is ', priceOfAmountVideoWatched)
        console.log('finalPriceOfAmountVideoWatched is ', finalPriceOfAmountVideoWatched)
    }

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
                            <i className='bg-[none] text-[white] text-3xl not-italic'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                </svg>
                            </i>
                        ) : (
                            <i className='bg-[none] text-[white] text-3xl not-italic'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                </svg>
                            </i>
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
                    <i className='bg-[none] text-[white] text-3xl not-italic'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
                        </svg>
                    </i>
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
                        <i className='bg-[none] text-[white] text-xl not-italic'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                        </i>
                    ) : (
                        <i className='bg-[none] text-[white] text-xl not-italic'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                        </i>
                    )}
                </button>
                <button onClick={toggleFullscreen} className='inline cursor-pointer border-[none]'>
                    <i className='bg-[none] text-[white] text-xl not-italic'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                    </i>
                </button>
            </div>) : ( 
                <>
                    <button onClick={() => setOnOpen(true)} className='z-1 fixed bottom-1/2 font-bold text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-20 h-20">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                        </svg>
                        Start
                    </button>
                    <Modal
                        clickPlay={isOpen} 
                        cancelModal={() => setOnOpen(false)} 
                        acceptModal={() => setStakeCondition(true)}
                        stakedAmount={priceOfFullVideo}
                    />
                </>
            )}
        </>) : (null)}
            
    </div>
  )
}
