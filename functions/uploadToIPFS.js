import { NFTStorage } from 'nft.storage';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const uploadToIPFS = async (imageBuffer) => {

    const name = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        length: 3,
        separator: '_',
    });

    console.log("api key: ", process.env.NFT_STORAGE_API_KEY)
    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

    const metadata = await client.store({
        name: name,
        description: `${name} is a unique NFT generated and stored on IPFS.`,
        image: new Blob([imageBuffer], { type: 'image/png' }),
    });


    return metadata.url;
};

export default uploadToIPFS;
