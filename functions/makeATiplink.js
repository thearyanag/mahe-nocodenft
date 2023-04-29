const { TipLink } = require('@tiplink/api');

// Create A New TipLink

const makeATipLink = async () => {
    const link_string = await TipLink.create();

    console.log(link_string);

    const tiplink = link_string.url.toString()

    const pubKey = link_string.keypair.publicKey.toBase58()


    return {
        tiplink,
        pubKey
    }

}

makeATipLink().then((result) => {
    console.log(result);
});
// export default makeATipLink;