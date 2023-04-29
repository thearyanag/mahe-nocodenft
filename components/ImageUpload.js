import React, { useState } from 'react';
import { Box, Button, Heading, Image, Input, Text, VStack } from '@chakra-ui/react';
import uploadToIPFS from '@/functions/uploadToIPFS';
import uploadToUnderdog from '@/functions/uploadToUnderdog';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState(null);
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
    const ipfsHashe = await uploadToIPFS(imageBuffer);
    setIsLoading(false);
    setIpfsHash(ipfsHashe)
    const underURL = await uploadToUnderdog();
    setUnderdogURL(underURL)
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
      {image && ipfsHash && <Text>
        Your can see the NFT at <a href={ipfsHash}>{underURL}</a>
      </Text>}

      {image && !isLoading && !ipfsHash && (
        <VStack>
          <Input maxLength={25} textColor={'black'} placeholder="NFT Name" onChange={(e) => setNftName(e.target.value)} />
          <Button onClick={handleUpload}>Upload to IPFS</Button>
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