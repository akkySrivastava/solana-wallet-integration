import React, { useEffect, useMemo, useState } from "react";
import "./css/SolanaProgram.css";
import WalletConnect from "./WalletConnect";
import {
  ConnectionProvider,
  useWallet,
  //   WalletProvider,
  //   useConnection,
  //   useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletAdapterNetwork,
  //   WalletNotConnectedError,
} from "@solana/wallet-adapter-base";
// import { clusterApiUrl } from "@solana/web3.js";
import {
  // getBloctoWallet,
  // getLedgerWallet,
  getPhantomWallet,
  // getSlopeWallet,
  // getSolflareWallet,
  // getSolletExtensionWallet,
  // getSolletWallet,
  // getTorusWallet,
  // getMathWallet,
  // getCoin98Wallet,
  // getBitpieWallet,
  // getSafePalWallet,
  // getSolflareWebWallet,
  // getSolongWallet,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  Keypair,
  Ed25519Program,
  SystemProgram,
} from "@solana/web3.js";

import * as splToken from "@solana/spl-token";
import keypair from "../keypair1.json";
import { fs } from "fs";
import string from "./img";

function SolanaProgram() {
  const [show, setShow] = useState(false);
  const [cluster, setCluster] = useState("Devnet");
  const [connect, setConnect] = useState();
  const [programId, setProgramId] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  // const network = ;

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  // console.log(endpoint);

  // const { publicKey, sendTransaction } = useWallet();
  // console.log(publicKey);

  console.log(connect);
  const clusters = [
    {
      name: "Devnet",
      id: 1,
    },
    {
      name: "Testnet",
      id: 2,
    },
    {
      name: "Mainnet",
      id: 3,
    },
  ];

  const [pubKey, setPubkey] = useState();
  const [response, setResponse] = useState();
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    if (programId !== "") {
      setPubkey(new PublicKey(programId));
    }
  }, [programId]);

  const [data, setData] = useState({});
  const [balance, setBalance] = useState("");

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [_provider, setProvider] = useState();
  const [loading, setLoading] = useState(false);
  const [sig, setSig] = useState("");
  const [endPoint, setEndpoint] = useState("");

  useEffect(() => {
    setConnect(new Connection(clusterApiUrl("devnet"), "confirmed"));
    setEndpoint("https://api.devnet.solana.com");
  }, []);

  const handleClick = (e) => {
    // console.log(_c);
    console.log(e.target.value);
    //   setNetwork(WalletAdapterNetwork._c)
    // alert("clicked");
    switch (e.target.value) {
      case "Devnet":
        // setNetwork(WalletAdapterNetwork.Devnet);
        setConnect(
          new Connection("https://api.devnet.solana.com", "confirmed")
        );
        setEndpoint("https://api.devnet.solana.com");
        console.log("Devnet", connect);
        break;
      case "Mainnet":
        // setNetwork(WalletAdapterNetwork.Mainnet);
        setConnect(
          new Connection("https://api.mainnet-beta.solana.com", "confirmed")
        );
        setEndpoint("https://api.mainnet-beta.solana.com");
        console.log("Mainnet", connect);
        break;
      case "Testnet":
        // setNetwork(WalletAdapterNetwork.Testnet);
        setConnect(
          new Connection("https://api.testnet.solana.com", "confirmed")
        );
        setEndpoint("https://api.testnet.solana.com");
        console.log("Testnet", connect);
        break;
      default:
        // setNetwork(WalletAdapterNetwork.Devnet);
        setConnect(
          new Connection("https://api.devnet.solana.com", "confirmed")
        );
        setEndpoint("https://api.devnet.solana.com");
        console.log("Devnet", connect);
      // console.log("Devnet", network);
    }
  };

  useEffect(() => {
    // const getProvider = async () => {
    if ("solana" in window) {
      if (window.solana.isPhantom) {
        // console.log("Is Phantom installed?  ", provider.isPhantom);
        window.solana.connect();
        window.solana.on("connect", (_data) =>
          console.log("connected!", _data.toBase58())
        );
        // let body = window.solana.publicKey;
        // console.log(body);
        // if (window.solana.isConnected) {

        // }
        const provider = window.solana;
        setProvider(provider);
        console.log(provider);
        return provider;
      }
    }
    // else {
    //   window.open("https://www.phantom.app/", "_blank");
    // }
    // };
  }, []);

  const handleSubmit = async (e) => {
    // await web3;
    e.preventDefault();
    console.log("ProgramId", programId);
    console.log("Pubkey", pubKey);
    await connect
      .getTokenSupply(pubKey)
      .then((_data) => {
        setResponse("Success");
        setData(_data.value);
        console.log(_data);
        setShowData(true);
      })
      .catch((err) => {
        console.log(err);
        setShowData(false);
        setResponse("Failed to get token supply");
      });

    await connect.getAccountInfo(pubKey).then((res) => {
      setBalance(res.lamports / LAMPORTS_PER_SOL);
      console.log(res);
    });
  };
  console.log(response);

  //   let _pubKey = new PublicKey("r5L9FfnyzEDheGTkpJBE7FGffg3FRmz719rHcC2M9tp");
  //   let keyPair = new Keypair(_pubKey);
  //   console.log(keyPair);

  const DEMO_WALLET_SECRET_KEY = new Uint8Array([
    46, 85, 249, 239, 92, 27, 197, 240, 204, 210, 232, 193, 208, 41, 45, 212,
    125, 202, 243, 240, 143, 112, 31, 50, 62, 136, 189, 219, 95, 66, 49, 23,
    198, 184, 206, 128, 186, 50, 208, 93, 41, 157, 199, 235, 33, 119, 193, 253,
    179, 230, 143, 147, 4, 62, 22, 3, 107, 92, 87, 39, 249, 123, 176, 13,
  ]);
  // const networks = WalletAdapterNetwork.Devnet;

  // const wallet = useMemo(() => getPhantomWallet(), []);
  let signature;

  const handleTransfer = async (e) => {
    e.preventDefault();
    // var fromWallet = Keypair.fromSecretKey(DEMO_WALLET_SECRET_KEY);
    //   var toWallet = web3.Keypair.generate();
    var toWallet = new PublicKey(toAddress);
    // Construct my token class
    // var myMint = new PublicKey("A221nzMDLmPLqd89mHEoPM3evBZSvnkMDVwccYd1sjUJ");
    var myMint = new PublicKey(mintAddress);
    var myToken = new splToken.Token(
      connect,
      myMint,
      splToken.TOKEN_PROGRAM_ID,
      _provider
    );

    //   console.log("MyToken", myToken);
    // Create associated token accounts for my token if they don't exist yet
    var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      _provider.publicKey
    );
    var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      toWallet
    );

    //   console.log("FromTokenAddress", fromTokenAccount);

    //   const testMemo = new splToken.Token(
    //     "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
    //   );

    //   console.log("TowalletKeypair", toTokenAccount);
    // Add token transfer instructions to transaction
    var transaction = new Transaction().add(
      splToken.Token.createTransferInstruction(
        splToken.TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        _provider.publicKey,
        [],
        amount * 1000000000
      )
    );

    // Setting the variables for the transaction
    transaction.feePayer = await _provider.publicKey;
    let blockhashObj = await connect.getRecentBlockhash();
    transaction.recentBlockhash = await blockhashObj.blockhash;

    // Transaction constructor initialized successfully
    if (transaction) {
      console.log("Txn created successfully");
      setLoading(true);
    }

    // Request creator to sign the transaction (allow the transaction)
    let signed = await _provider.signTransaction(transaction);
    // The signature is generated
    signature = await connect.sendRawTransaction(signed.serialize());
    // Confirm whether the transaction went through or not
    let _signature = await connect.confirmTransaction(signature);

    if (_signature) {
      setLoading(false);
      setSig(signature);
    }
    //Signature
    console.log("Signature: ", signature);

    //   console.log("Trx", transaction);
    // Sign transaction, broadcast, and confirm
    // var signature = await sendAndConfirmTransaction(connect, transaction, [
    //   _provider,
    // ]);
    // console.log("SIGNATURE", signature);
    // console.log("SUCCESS");
  };

  const handleSignature = () => {
    window.open(`https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    // window.location.href = ;
  };
  return (
    // <ConnectionProvider endpoint={endPoint}>
    <div className="program">
      <div className="program-header">
        <div className="container">
          {/* <img
            // width={80}
            src={string}
            alt=""
          /> */}
          <select onChange={handleClick}>
            <option value="Devnet">Devnet</option>
            <option value="Testnet">Testnet</option>
            <option value="Mainnet">Mainnet</option>
            {/* {clusters.map((_c) => (
                <>
                  <option
                    onClick={() => handleClick(_c)}
                    key={_c.id}
                    value={_c.name}
                  >
                    {_c.name}
                  </option>
                </>
              ))} */}
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            data-toggle="tooltip"
            data-original-title="not connected"
            style={{
              cursor: "pointer",
            }}
            // onClick={() => setShow(!show)}
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              d="M22 7h1v10h-1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3zm-2 10h-6a5 5 0 0 1 0-10h6V5H4v14h16v-2zm1-2V9h-7a3 3 0 0 0 0 6h7zm-7-4h3v2h-3v-2z"
              fill="#777"
            ></path>
          </svg>
        </div>
      </div>
      <div className="program-body">
        <div className="container-body">
          {show && (
            <div className="wallet-popup">
              <WalletConnect />
            </div>
          )}
        </div>
        <div className="wrapper">
          <div className="container-data">
            <form>
              <h3>Deployed program details</h3>
              <input
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                type="text"
                placeholder="Enter program id"
              />

              {showData && (
                <>
                  <span>
                    <pre>{response}</pre>
                  </span>
                  <br />
                  {data !== null && data !== undefined && (
                    <>
                      <div className="info-details">
                        <div className="info">
                          <pre>
                            <p>Current Supply: </p>
                          </pre>
                          <span>
                            <pre>{data?.uiAmount}</pre>
                          </span>
                        </div>
                        <div className="info">
                          <pre>
                            <p>Decimals: </p>
                          </pre>
                          <span>
                            <pre>{data?.decimals}</pre>
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {balance !== "" && (
                <div className="info">
                  <pre>
                    <p>Balance(in SOL): </p>
                  </pre>
                  <span>
                    <pre>{balance}</pre>
                  </span>
                </div>
              )}

              <button onClick={handleSubmit}>Submit</button>
            </form>
          </div>
          <div className="container-data">
            <form>
              <h3>Transfer</h3>
              <input
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                type="text"
                placeholder="To address wallet"
              />
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                placeholder="Enter amount"
              />
              <input
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                type="text"
                placeholder="Enter token mint address"
              />
              {/* {showData && (
                  <>
                    <span>
                      <pre>{response}</pre>
                    </span>
                    <br />
                    {data !== null && data !== undefined && (
                      <>
                        {<pre>Current Supply: {data?.uiAmount}</pre>}

                        {<pre>Decimal: {data?.decimals}</pre>}
                      </>
                    )}
                  </>
                )} */}

              {/* {balance !== "" && <pre>Balance(SOL): {balance}</pre>} */}

              <button onClick={handleTransfer}>
                {loading ? "Please Wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
        <div className="sig">
          {sig !== "" && (
            <>
              <div className="infoSig">
                <p>Sig: </p>

                <div onClick={handleSignature}>
                  <small>{sig}</small>
                  {/* <small>
                      5r6JCoXv3nAUPgfwWvhvsHKBvPJB59t2jHuALV65U1n53RXJnPY9B9YQUgzt4otedpUXRyhsFVxnQAsjM3T9LwdC
                    </small> */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    // </ConnectionProvider>
  );
}

export default SolanaProgram;
