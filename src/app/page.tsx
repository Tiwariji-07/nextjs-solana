"use client";
import Nav from "@/components/Nav";
import Card from "@/components/Card";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import SendTransaction from "@/components/SendTransaction";
import { useWallet } from "@solana/wallet-adapter-react"; // Import useWallet

export default function Home() {
  const { connected } = useWallet(); // Destructure connected from useWallet

  return (
    <main className="flex items-center flex-col gap-10 justify-center min-h-screen bg-slate-900">
      <h1 className="text-white font-bold md:text-6xl text-4xl">Solana Wallet</h1>

      {/* Optionally include Nav and WalletMultiButton */}
      {/*<div className="border hover:border-slate-900 rounded">
        <Nav>
          <WalletMultiButton />
        </Nav>
      </div>*/}

      <div className="bg-white flex-col md:flex-row flex gap-5 rounded-lg border-2 border-slate-300 shadow-xl shadow-slate-500/50 p-5">
        <Card />
        {connected && <SendTransaction />} {/* Conditionally render SendTransaction based on connection state */}
      </div>
    </main>
  );
}
