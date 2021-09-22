var web3 = require("@solana/web3.js");
// Address: 9vpsmXhZYMpvhCKiVoX5U8b1iKpfwJaFpPEEXF7hRm9N
const DEMO_FROM_SECRET_KEY = new Uint8Array([
  131, 194, 244, 129, 169, 29, 32, 244, 165, 180, 234, 223, 243, 159, 88, 242,
  248, 99, 24, 167, 144, 122, 37, 187, 227, 243, 168, 105, 33, 174, 36, 11, 15,
  128, 220, 104, 173, 10, 30, 57, 104, 160, 30, 29, 39, 76, 43, 161, 13, 152,
  67, 133, 117, 77, 108, 4, 191, 76, 23, 2, 146, 178, 65, 142,
]);

// const DEMO_TO_SECRET_KEY = new Uint8Array([])
(async () => {
  // Connect to cluster
  var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  // Construct a `Keypair` from secret key
  var from = web3.Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
  console.log(from);
  //   Generate a new random public key
  var to = web3.Keypair.generate();
  let toAddress = new web3.PublicKey(
    "r5L9FfnyzEDheGTkpJBE7FGffg3FRmz719rHcC2M9tp"
  );
  let _toSeedAddress = new web3.Keypair.fromSeed(
    "r5L9FfnyzEDheGTkpJBE7FGffg3FRmz719rHcC2M9tp"
  );
  console.log("To address", toAddress.toBytes());
  console.log("To SEED address", _toSeedAddress);

  //   // Add transfer instruction to transaction
  //   var transaction = new web3.Transaction().add(
  //     web3.SystemProgram.transfer({
  //       fromPubkey: from.publicKey,
  //       toPubkey: to.publicKey,
  //       lamports: web3.LAMPORTS_PER_SOL / 100,
  //     })
  //   );
  //   // Sign transaction, broadcast, and confirm
  //   var signature = await web3.sendAndConfirmTransaction(
  //     connection,
  //     transaction,
  //     [from]
  //   );
  //   console.log("SIGNATURE", signature);
  //   console.log("SUCCESS");
})();

// const fs = require("fs");
// const anchor = require("@project-serum/anchor");
// const web3 = require("@solana/web3.js");
// // const account = anchor.web3.Keypair.generate();
// const account = web3.Keypair.fromSecretKey(
//   "ENjAkUcrjUYaUrGpmy71sW2eG12PHzhw2MxZjknyPsFA"
// );

// console.log(account);

// console.log(fs.writeFileSync("./keypair1.json", JSON.stringify(account)));
