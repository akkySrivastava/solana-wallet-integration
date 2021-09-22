import "./App.css";
import // ConnectionProvider,
// WalletProvider,
// useConnection,
// useWallet,
"@solana/wallet-adapter-react";
// import {
//   WalletAdapterNetwork,
//   WalletNotConnectedError,
// } from "@solana/wallet-adapter-base";
// import {
//   WalletModalProvider,
//   WalletDisconnectButton,
//   WalletMultiButton,
// } from "@solana/wallet-adapter-react-ui";
// import {
//   clusterApiUrl,
//   Keypair,
//   SystemProgram,
//   Transaction,
// } from "@solana/web3.js";
import React, { useMemo, useCallback } from "react";
import TestApp from "./TestApp";
import { BrowserRouter, Router, Switch, Route } from "react-router-dom";
import WalletConnect from "./component/WalletConnect";
import SolanaProgram from "./component/SolanaProgram";

function App() {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  // const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application

  // const { connection } = useConnection();
  // const { publicKey, sendTransaction } = useWallet();

  // const onClick = useCallback(async () => {
  //   if (!publicKey) throw new WalletNotConnectedError();

  //   const transaction = new Transaction().add(
  //     SystemProgram.transfer({
  //       fromPubkey: publicKey,
  //       toPubkey: Keypair.generate().publicKey,
  //       lamports: 1,
  //     })
  //   );

  //   const signature = await sendTransaction(transaction, connection);

  //   await connection.confirmTransaction(signature, "processed");
  // }, [publicKey, sendTransaction, connection]);
  return (
    <BrowserRouter>
      <Switch>
        <div className="App">
          <Route exact path="/walletconnect" component={WalletConnect} />
          <Route exact path="/" component={SolanaProgram} />
          {/* <button onClick={onClick} disabled={!publicKey}>
        Send 1 lamport to a random address!
      </button> */}
          {/* <TestApp /> */}
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
