const {
    Connection,
    PublicKey,
    Keypair,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction
} = require("@solana/web3.js");
const base58 = require("bs58");

let connection = new Connection("https://rpc.helius.xyz/?api-key=f5eb971e-fdec-4683-abf6-9eabee2df6b4");

let privateKeyString = process.env.SOLANA_PRIVATE_KEY;

let secret = new Uint8Array(base58.decode(privateKeyString));
let senderWallet = Keypair.fromSecretKey(secret);

/**
 * To transfer a token from one wallet to another
 * @returns {Promise<{signature: string}>}
 */
async function transferSol(recipientWalletAddress) {


    let to = new PublicKey(recipientWalletAddress);
    let amount = 0.005;

    let transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderWallet.publicKey,
            toPubkey: to,
            lamports: LAMPORTS_PER_SOL * amount,
        })
    );

    let signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderWallet]
    );

    let transfer_trx = signature;
    console.log(transfer_trx)
    return {
        signature: transfer_trx,
    }

}

module.exports = transferSol;