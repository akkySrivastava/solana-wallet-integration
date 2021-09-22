// import * as web3 from "@solana/web3.js";
const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
// import * as splToken from "@solana/spl-token";

// Address: 9vpsmXhZYMpvhCKiVoX5U8b1iKpfwJaFpPEEXF7hRm9N
const DEMO_WALLET_SECRET_KEY = new Uint8Array([
  46, 85, 249, 239, 92, 27, 197, 240, 204, 210, 232, 193, 208, 41, 45, 212, 125,
  202, 243, 240, 143, 112, 31, 50, 62, 136, 189, 219, 95, 66, 49, 23, 198, 184,
  206, 128, 186, 50, 208, 93, 41, 157, 199, 235, 33, 119, 193, 253, 179, 230,
  143, 147, 4, 62, 22, 3, 107, 92, 87, 39, 249, 123, 176, 13,
]);
(async () => {
  // Connect to cluster
  var connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  // Construct wallet keypairs
  var fromWallet = web3.Keypair.fromSecretKey(DEMO_WALLET_SECRET_KEY);
  //   var toWallet = web3.Keypair.generate();
  var toWallet = new web3.PublicKey(
    "2pm7xracyNW3kLxBX3tSGNHcKLBBpGnY8g7yicsmZjs9"
  );
  // Construct my token class
  var myMint = new web3.PublicKey(
    "A221nzMDLmPLqd89mHEoPM3evBZSvnkMDVwccYd1sjUJ"
  );
  var myToken = new splToken.Token(
    connection,
    myMint,
    splToken.TOKEN_PROGRAM_ID,
    fromWallet
  );

  //   console.log("MyToken", myToken);
  // Create associated token accounts for my token if they don't exist yet
  var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  );
  var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(toWallet);

  //   console.log("FromTokenAddress", fromTokenAccount);

  //   const testMemo = new splToken.Token(
  //     "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
  //   );

  //   console.log("TowalletKeypair", toTokenAccount);
  // Add token transfer instructions to transaction
  var transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      toTokenAccount.address,
      fromWallet.publicKey,
      [],
      1000000000000
    )
  );

  //   console.log("Trx", transaction);
  // Sign transaction, broadcast, and confirm
  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [fromWallet]
  );
  console.log("SIGNATURE", signature);
  console.log("SUCCESS");
})();
