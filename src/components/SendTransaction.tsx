import * as React from "react";
import { useState, ChangeEvent, useCallback ,useMemo} from "react";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PublicKey , Connection } from "@solana/web3.js";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SendTransaction() {
    const [tokey, setToKey] = useState<string>("");
    const [amount, setAmount] = useState<string>(""); // State for the amount
    const connection = useMemo(() => new Connection("https://api.devnet.solana.com"), []);

    const { publicKey, sendTransaction } = useWallet();

    const handleClick = useCallback(async () => {
        if (!publicKey) {
            alert('Please connect your wallet!');
            return;
        }

        const toPubkey = new PublicKey(tokey);
        const lamports = parseFloat(amount) * LAMPORTS_PER_SOL; // Convert SOL to lamports

        if (isNaN(lamports) || lamports <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: toPubkey,
                lamports: lamports,
            }),
        );

        try {
            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, 'confirmed');
            alert(`Transaction successful! Signature: ${signature}`);
        } catch (error) {
            console.error('Transaction failed', error);
            alert('Transaction failed!');
        }
    }, [publicKey, sendTransaction, connection, tokey, amount]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setToKey(event.target.value);
    };

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Send SOL</CardTitle>
                <CardDescription>Enter recipients public key and amount</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="recipient">To</Label>
                            <Input id="recipient" placeholder="Public key" value={tokey} onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount">Amount (SOL)</Label>
                            <Input id="amount" type="number" placeholder="Amount in SOL" value={amount} onChange={handleAmountChange} />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 border border-black rounded" onClick={handleClick}>
                    Send
                </button>
            </CardFooter>
        </Card>
    );
}
