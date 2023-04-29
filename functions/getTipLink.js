const makeATipLink = require('./makeATipLink.js');
const uploadToIPFS = require('./uploadToIPFS.js');
const uploadToUnderdog = require('./uploadToUnderdog.js');
const transferSol = require('./transferSol.js');

const getTipLink = async (imageBuffer,name) => {
    let ipfsLink = await uploadToIPFS(imageBuffer,name);
    let tipLinkObject = await makeATipLink();
    let tipLink = tipLinkObject.tiplink;
    let tipLinkPubKey = tipLinkObject.pubKey;
    let underdogLink = await uploadToUnderdog(name,ipfsLink,tipLinkPubKey);
    let transferTrx = await transferSol(tipLinkPubKey);
    console.log(transferTrx)
    console.log(underdogLink)

    return tipLink;
}

module.exports = getTipLink;