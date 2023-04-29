const { TipLink } = require('@tiplink/api');


/**
 * A function to create a TipLink
 * @returns A TipLink and the pubKey
 */
const makeATipLink = async () => {
    const link_string = await TipLink.create();

    // console.log(link_string);

    const tiplink = link_string.url.toString()

    const pubKey = link_string.keypair.publicKey.toBase58()


    return {
        tiplink,
        pubKey
    }

}

module.exports = makeATipLink;