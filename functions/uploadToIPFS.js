const { NFTStorage, File } = require('nft.storage');

/**
 * A function to upload the NFT to IPFS
 * @param {*} imageBuffer Image Buffer obtained from FE 
 * @returns 
 */
const uploadToIPFS = async (imageBuffer,name) => {

    const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY });

    name = name.replace(" ", "_");

    const metadata = await client.store({
        name: name,
        description: `${name} is a unique NFT generated and stored on IPFS.`,
        image: new File([imageBuffer], `${name}.png` ,{ type: 'image/png' }),
    });
    console.log(metadata.data.image.href);
    let url = metadata.data.image.href
    let cid = url.split("/")[2]
    let fileName = url.split("/")[3]
    let httpURL = `https://${cid}.ipfs.dweb.link/${fileName}`
    return httpURL
};

module.exports = uploadToIPFS;