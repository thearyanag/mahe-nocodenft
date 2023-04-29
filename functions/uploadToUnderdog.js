const axios = require('axios');

const token = process.env.UNDERDOG_PROTOCOL_API_KEY;

const uploadToUnderdog = async () => {
    let config = {
        method: 'get',
        url: 'https://dev.underdogprotocol.com/v2/projects/c/1/nfts/0/claim',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};      

export default uploadToUnderdog;