const makeATipLink = require('./makeATipLink.js');
const uploadToIPFS = require('./uploadToIPFS.js');
const uploadToUnderdog = require('./uploadToUnderdog.js');

const getTipLink = async (imageBuffer,name) => {
    let ipfsLink = await uploadToIPFS(imageBuffer,name);
    let tipLinkObject = await makeATipLink();
    let tipLink = tipLinkObject.tiplink;
    let tipLinkPubKey = tipLinkObject.pubKey;
    let underdogLink = await uploadToUnderdog(name,ipfsLink,tipLinkPubKey);
    console.log(underdogLink)

    return tipLink;
}

module.exports = getTipLink;