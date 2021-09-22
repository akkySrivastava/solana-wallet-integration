// const fs = require("fs");
// const anchor = require("@project-serum/anchor");
// const web3 = require("@solana/web3.js");
// /* App.js */

// const fs = require("fs");
// const anchor = require("@project-serum/anchor");
// const web3 = require("@solana/web3.js");

import "./App.css";
// import fs from "fs";
import { useEffect, useState } from "react";
import { Program, Provider, web3 } from "@project-serum/anchor";
// import anchor from "@project-serum/anchor";
import { Connection, PublicKey } from "@solana/web3.js";

import idl from "./idl.json";
import kp from "./keypair1.json";

console.log("kp", kp);
console.log("idl", idl);

// let publicKey = new PublicKey(kp);
// console.log("PUbkey", publicKey);

// const account = anchor.web3.Keypair.generate();

// fs.writeFileSync("./app/src/keypair.json", JSON.stringify(account));

// console.log("account", account);

const arr = Object.values(kp._keypair.secretKey);
// const
const secret = new Uint8Array(arr);
const pair = web3.Keypair.fromSecretKey(secret);

const opts = {
  preflightCommitment: "processed",
};

const { SystemProgram } = web3;
const programID = new PublicKey(idl.metadata.address);
function TestApp() {
  const [value, setValue] = useState(null);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    console.log("solana:", window.solana);
    if (window.solana) {
      window.solana.on("connect", () => {
        console.log("updated...");
      });
    }
    return () => {
      window.solana.disconnect();
    };
  }, []);

  async function getProvider() {
    const wallet = window.solana;
    const network = "http://api.devnet.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new Provider(connection, wallet, opts.preflightCommitment);
    return provider;
  }

  async function createCounter() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    try {
      await program.rpc.create({
        accounts: {
          baseAccount: pair.publicKey,
          user: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [pair],
      });

      const account = await program.account.baseAccount.fetch(pair.publicKey);
      console.log("account: ", account);
      setValue(account.count.toString());
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  }

  async function increment() {
    const provider = await getProvider();

    const program = new Program(idl, programID, provider);
    console.log(program.rpc);

    await program.rpc.increment({
      accounts: {
        baseAccount: pair.publicKey,
      },
    });

    const account = await program.account.baseAccount.fetch(pair.publicKey);
    console.log("acc: ", account);
    setValue(account.count.toString());
    console.log("var", program.rpc.TEST_INT);
  }

  async function getWallet() {
    await window.solana.connect();
    try {
      const wallet = typeof window !== "undefined" && window.solana;
      await wallet.connect();
      setConnected(true);
    } catch (err) {
      console.log("err: ", err);
    }
  }
  console.log("value:", value);

  //   if (!connected) {
  if (!connected) {
    return (
      <div className="App">
        <button onClick={getWallet}>Connect wallet</button>
      </div>
    );
  }
  if (connected)
    return (
      <div className="App">
        <header>
          <button onClick={createCounter}>Create counter</button>
          <button onClick={increment}>Increment counter</button>

          {value >= 0 ? <h2>{value}</h2> : <h2>Please create the counter.</h2>}
        </header>
      </div>
    );

  //   }
  //   if (!connected)
  // return (

  // );
}

export default TestApp;
