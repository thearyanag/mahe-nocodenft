const axios = require('axios');

/**
 * A function to upload the NFT to Underdog Protocol
 * @param {*} name Name of the NFT 
 * @param {*} ipfsLink IPFS Link of the NFT 
 * @param {*} receiverAddress The TipLink pubKey
 */
const uploadToUnderdog = async (name,ipfsLink,receiverAddress) => {
    let data = JSON.stringify({
        "name": name,
        "image": ipfsLink,
        "receiverAddress" : receiverAddress
    });

    console.log(data)

    const token = process.env.UNDERDOG_PROTOCOL_API_KEY;

    let config = {
        method: 'post',
        url: 'https://api.underdogprotocol.com/v2/projects/t/1/nfts',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });

    const result = await axios(config);
    return result.data.mintAddress
};

module.exports = uploadToUnderdog;

