import React, { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletAdapterNetwork,
  //   WalletNotConnectedError,
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
  //   Keypair,
  //   SystemProgram,
  //   Transaction,
} from "@solana/web3.js";

function WalletConnect() {
  const network = WalletAdapterNetwork.Devnet;
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getTorusWallet({
        options: {
          clientId:
            "BFtJ4A7RZJ-S7wOPqtmMXxqv3c7bwauL7K4xyRhy6_T8sjGbW5vzjvAtWFt1SAyD2ivdMquSH4ulD0BkJrHKYYc",
        },
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
  console.log(wallets);
  console.log(publicKey);
  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider logo="http://dev.marketplace.nightlifecoins.com/favicon/android-icon-192x192.png">
            <WalletMultiButton />
            <WalletDisconnectButton />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default WalletConnect;
