const makeATipLink = require('./makeATipLink.js');
const uploadToIPFS = require('./uploadToIPFS.js');
const uploadToUnderdog = require('./uploadToUnderdog.js');

const getTipLink = async (imageBuffer,name) => {
    let ipfsLink = await uploadToIPFS(imageBuffer);
    let tipLinkObject = await makeATipLink();
    let tipLink = tipLinkObject.tipLink;
    let tipLinkPubKey = tipLinkObject.pubKey;
    let underdogLink = await uploadToUnderdog(name,ipfsLink,tipLinkPubKey);
    return tipLink;
}

module.exports = getTipLink;