import * as React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

export default function CardWithForm() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [mounted, setMounted] = useState(false); // State to track if the component is mounted

  // Function to fetch balance
  const fetchBalance = useCallback(async () => {
    if (publicKey) {
      const newBalance = await connection.getBalance(publicKey);
      setBalance(newBalance / LAMPORTS_PER_SOL);
    }
  }, [publicKey, connection]);

  // Automatically update balance when the user connects their wallet
  useEffect(() => {
    if (connected) {
      fetchBalance();
    }
  }, [connected, fetchBalance]);

  // Set mounted to true when the component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Card className="w-[300px] md:w-[450px] md:h-[310px]">
      <CardHeader>
        <CardTitle>ACCOUNT</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      {connected ? (
        <>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
            <div className="flex justify-between items-center">
              <CardDescription>{`Balance: ${balance} SOL`}</CardDescription>
              <Button variant="outline" onClick={fetchBalance}>
                Check Balance
              </Button>
            </div>
          </CardHeader>
          <CardHeader>
            <CardTitle>Public Key</CardTitle>
            <CardDescription>{publicKey?.toString()}</CardDescription>
          </CardHeader>
        </>
      ) : (
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>Please connect your wallet to view details.</CardDescription>
        </CardHeader>
      )}

      <CardFooter className="flex justify-end">
        {mounted && <WalletMultiButton />} {/* Render the button only after component is mounted */}
      </CardFooter>
    </Card>
  );
}
