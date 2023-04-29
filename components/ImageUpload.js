import React, { useState } from 'react';
import { Box, Button, Heading, Image, Input, Text, VStack } from '@chakra-ui/react';
const getTipLink = require('../functions/getTipLink.js');

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [underdogURL, setUnderdogURL] = useState(null);
  const [nftName, setNftName] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
    setIsLoading(true);
    console.log(imageBuffer);
    console.log(nftName);
    const underURL = await getTipLink(imageBuffer, nftName);
    setIsLoading(false);
    setUnderdogURL(underURL);
  };

  return (
    <VStack m={30} gap={30}>
      <Heading>Create your own NFTs for FREE</Heading>
      {image && <Image border="2px solid white"
        borderRadius="md"
        src={image} height={300} width={300} alt="uploaded image" />}
      {!image && (
        <Box
          height={300}
          width={300}
          border="2px dashed white"
          borderRadius="md"
        ></Box>
      )}
      {image && underdogURL && <Text>
        Your can see the NFT at <a href={underdogURL}>{underdogURL}</a>
      </Text>}

      {image && !isLoading && !underdogURL && (
        <VStack>
          <Input maxLength={25} textColor={'black'} placeholder="NFT Name" onChange={(e) => setNftName(e.target.value)} />
          <Button onClick={handleUpload}>Mint my NFT !!</Button>
        </VStack>
      )}
      <VStack>
        {image && isLoading && <Button isLoading disabled>Uploading to IPFS...</Button>}
        {image && <Button onClick={() => setImage(null)}>Remove Image</Button>}
        <Input type="file" onChange={handleImageChange} />
      </VStack>
    </VStack>
  );
}

export default ImageUpload;