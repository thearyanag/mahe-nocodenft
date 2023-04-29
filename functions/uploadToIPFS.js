const { NFTStorage, File } = require('nft.storage');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

/**
 * A function to upload the NFT to IPFS
 * @param {*} imageBuffer Image Buffer obtained from FE 
 * @returns 
 */
const uploadToIPFS = async (imageBuffer) => {

    const name = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        length: 3,
        separator: '_',
    });

    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

    const metadata = await client.store({
        name: name,
        description: `${name} is a unique NFT generated and stored on IPFS.`,
        image: new Blob([imageBuffer], { type: 'image/png' }),
    });
    console.log(metadata.data.image.href);

    return metadata.data.image.href;
};

module.exports = uploadToIPFS;