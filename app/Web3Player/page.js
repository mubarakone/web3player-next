"use client"
import React from 'react'
import Web3PlayerVideo from './useWeb3Player'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon, baseGoerli, goerli } from 'wagmi/chains'

const chains = [arbitrum, mainnet, polygon, baseGoerli, goerli]
const projectId = '92c9ed2e916af5edd361392cd8dc7101'

const { publicClient, webSocketPublicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

export default function Web3Player() {
  return (
    <>
        <WagmiConfig config={wagmiConfig}>
            <Web3PlayerVideo />
        </WagmiConfig>

        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}