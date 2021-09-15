import "./App.css";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletAdapterNetwork,
  WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
import {
  getBloctoWallet,
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
  getTorusWallet,
  getMathWallet,
  getCoin98Wallet,
  getBitpieWallet,
  getSafePalWallet,
  getSolflareWebWallet,
  getSolongWallet,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  clusterApiUrl,
  Keypair,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useMemo, useCallback } from "react";

function App() {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking --
  // Only the wallets you configure here will be compiled into your application
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getTorusWallet({
        options: { clientId: "Get a client ID @ https://developer.tor.us" },
      }),
      getLedgerWallet(),
      getBloctoWallet({ network }),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
      getMathWallet(),
      getCoin98Wallet(),
      getBitpieWallet(),
      getSafePalWallet(),
      getSolflareWebWallet(),
      getSolongWallet(),
    ],
    [network]
  );

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: Keypair.generate().publicKey,
        lamports: 1,
      })
    );

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, "processed");
  }, [publicKey, sendTransaction, connection]);
  return (
    <div className="App">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider logo="http://dev.marketplace.nightlifecoins.com/favicon/android-icon-192x192.png">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
      {/* <button onClick={onClick} disabled={!publicKey}>
        Send 1 lamport to a random address!
      </button> */}
    </div>
  );
}

export default App;
