import * as React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function CardWithForm() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true after the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchBalance = async () => {
    if (publicKey) {
      const newBalance = await connection.getBalance(publicKey);
      setBalance(newBalance / LAMPORTS_PER_SOL);
    }
  };

  useEffect(() => {
    if (connected) {
      fetchBalance();
    }
  }, [connected]);

  return (
    <Card className="w-[300px] md:w-[450px] md:h-[310px]">
      <CardHeader>
        <CardTitle>ACCOUNT</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <div className="flex justify-between items-center ">
        <CardDescription>{connected ? `Balance: ${balance} SOL` : `Balance: 0 SOL`}</CardDescription>
        <Button variant="outline" onClick={fetchBalance}>Check Balance</Button>
        </div>
      </CardHeader>
      <CardHeader>
        <CardTitle>Public Key</CardTitle>
        <CardDescription>{publicKey?.toString()}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end">
        {isClient && <WalletMultiButton />}
      </CardFooter>
    </Card>
  );
}
