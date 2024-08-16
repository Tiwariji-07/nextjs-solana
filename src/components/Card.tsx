import * as React from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function CardWithForm() {
  const { connection } = useConnection();
  const { publicKey , connected } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  //Balance fetching
  useEffect(() => {
    if (publicKey) {
      (async function getBalanceEvery10Seconds() {
        const newBalance = await connection.getBalance(publicKey);
        setBalance(newBalance / LAMPORTS_PER_SOL);
        setTimeout(getBalanceEvery10Seconds, 100);
      })();
    }
  }, [publicKey, connection, balance]);
  
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>ACCOUNT</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        {/* <CardDescription>{balance} SOL</CardDescription> */}
        <CardDescription><p>{connected ? `Balance: ${balance} SOL` : `Balance: 0 SOL`}</p></CardDescription>
      </CardHeader>
      <CardHeader>
        <CardTitle>Public Key</CardTitle>
        <CardDescription>{publicKey?.toString()}</CardDescription>

      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <WalletMultiButton style={{}} />
      </CardFooter>
    </Card>
  )
}
