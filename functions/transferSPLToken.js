const {
    Connection,
    PublicKey,
    Keypair,
} = require("@solana/web3.js");
const splToken = require("@solana/spl-token");

const base58 = require("bs58");

let connection = new Connection("https://api.mainnet-beta.solana.com");

let privateKeyString = process.env.SOLANA_PRIVATE_KEY;

let secret = new Uint8Array(base58.decode(privateKeyString));
let senderWallet = Keypair.fromSecretKey(secret);

/**
 * To transfer a token from one wallet to another
 * @returns {Promise<{signature: string}>}
 */
async function transfer(recipientWalletAddress,tokenAddress) {

    let recipientWallet = new PublicKey(recipientWalletAddress);
    let tokenMintAddress = new PublicKey(tokenAddress);

    let my_token_account = await splToken.getOrCreateAssociatedTokenAccount(
        connection,
        senderWallet,
        tokenMintAddress,
        senderWallet.publicKey,
        false,
        'finalized',
        null,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    )
    let reciver_token_account = await splToken.getOrCreateAssociatedTokenAccount(
        connection,
        senderWallet,
        tokenMintAddress,
        recipientWallet,
        false,
        'finalized',
        null,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
    );

    console.log('My token account public address: ' + my_token_account.address.toBase58());
    console.log('Reciver token account public address: ' + reciver_token_account.address.toBase58());
    try {
        let tx_hash = await transfer_tokens(
            senderWallet,
            connection,
            1,
            reciver_token_account,
            my_token_account,
        )
        return tx_hash
    } catch (error) {
        console.log(error)
    }

    console.log('Done!');

}

async function transfer_tokens(wallet, connection, amount, reciver_token_account, from_token_account) {
    //if trx takes more when 60 sec to complete you will receive error here
    const transfer_trx = await splToken.transfer(
        connection,
        wallet,
        from_token_account.address,
        reciver_token_account.address,
        wallet,
        amount,
        [wallet],
        false,
        splToken.TOKEN_PROGRAM_ID,
    )

    console.log(transfer_trx)
    return {
        signature: transfer_trx,
    }

}

module.exports = transfer