"use client";
import Nav from "@/components/Nav";
import Card from "@/components/Card";

 
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import SendTransaction from "@/components/SendTransaction";
 
export default function Home() {
  
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="border hover:border-slate-900 rounded">
        {/* <Nav>
        <WalletMultiButton style={{}} />
        </Nav> */}
      </div>
      <div>
        <Card />
      </div>
      <div>
        <SendTransaction />
      </div>
    </main>
  );
}