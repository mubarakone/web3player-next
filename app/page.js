import Image from 'next/image'
import Web3Player from './Web3Player/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <Web3Player />
    </main>
  )
}
