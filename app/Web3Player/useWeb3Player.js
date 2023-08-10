'use client'
import React, { useRef, useState, useEffect } from 'react'
import useVideoPlayer from './useVideoPlayer'
import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'

export default function Web3PlayerVideo() {
    const video = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    const videoElement = useRef(null)
    const { status } = useAccount()
    
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

    useEffect(() => {
        if (status == "connected") {
            setConnectedState(true)
            console.log("Connected Wallet")
        } else {
            setConnectedState(false)
            console.log("Disconnected Wallet")
        }
    }, [status])

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
        {connectedState ? (<div name="controls" className='flex items-center justify-evenly absolute w-full max-w-[550px] flex-wrap shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] backdrop-blur-sm border translate-y-[150%] group-hover:translate-y-[0%] transition-all duration-[0.3s] ease-in-out p-3.5 rounded-[10px] border-solid border-[rgba(255,255,255,0.18)] bottom-[30px]'>
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
        </div>) : (null)}
    </div>
  )
}
