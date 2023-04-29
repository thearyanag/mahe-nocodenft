const axios = require('axios');

const token = process.env.UNDERDOG_PROTOCOL_API_KEY;

/**
 * A function to upload the NFT to Underdog Protocol
 * @param {*} name Name of the NFT 
 * @param {*} ipfsLink IPFS Link of the NFT 
 * @param {*} receiverAddress The TipLink pubKey
 */
const uploadToUnderdog = async (name,ipfsLink,receiverAddress) => {
    let responseData = null;

    let data = JSON.stringify({
        "name": name,
        "image": ipfsLink,
        "receiverAddress" : receiverAddress

    });


    let config = {
        method: 'get',
        url: 'https://api.underdogprotocol.com/v2/projects/t/2/nfts',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then((response) => {
            responseData = response.data;
            let imageURL = responseData.results[0].image
            return imageURL;
        })
        .catch((error) => {
            console.log(error);
        });

};


module.exports = uploadToUnderdog;