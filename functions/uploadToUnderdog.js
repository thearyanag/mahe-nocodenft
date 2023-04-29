const axios = require('axios');

const token = process.env.UNDERDOG_PROTOCOL_API_KEY;

const uploadToUnderdog = async (receiverAddress) => {
    let responseData = null;

    let data = JSON.stringify({
        "name": "LeGoat",
        "image": "ipfs://bafybeibkguce3zooxu22kkdveytkzb2lnxjdrp7kh6ksfracx3mmrdp23e/blob",
        "attributes": {
            "points": "38390"
        },
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


export default uploadToUnderdog;