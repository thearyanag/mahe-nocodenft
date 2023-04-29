const { TipLink } = require('@tiplink/api');

// Create A New TipLink

const makeATipLink = async () => {
    const link_string = await TipLink.create().then(tiplink => {
        console.log("link: ", tiplink.url.toString());
        console.log("publicKey: ", tiplink.keypair.publicKey.toBase58());
        return tiplink.url.toString();
    });

    console.log("link_string: ", link_string);

    // Get Public Key from TipLink
    const getPublicKeyString = async (link_string) => {
        const tiplink = await TipLink.fromLink(link_string);

        return tiplink.keypair.publicKey.toBase58();
    };

    getPublicKeyString(link_string).then((publicKeyString) => {
        console.log("publicKey (which can be used to fund the TipLink): ", publicKeyString);
    });

}

export default makeATipLink;