import React, { useState } from 'react';
import { Box, Button, Image, Input , Text, VStack} from '@chakra-ui/react';
import uploadToIPFS from '@/functions/uploadToIPFS';
import uploadToUnderdog from '@/functions/uploadToUnderdog';

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [underdogURL, setUnderdogURL] = useState(null);

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
    <VStack m={30} gap={60}>
       <Text fontSize="6xl">create your own NFTs for FREE</Text>
      {image && <Image src={image} height={300} width={300} alt="uploaded image" />}
      {!image && (
        <Box
          height={300}
          width={300}
          border="1px dashed gray"
          borderRadius="md"
        ></Box>
      )}
      {image && ipfsHash && <Text>
        Your NFT Metadata is available at: <a href={ipfsHash}>Click here</a>
        </Text>}
      
      {image && !isLoading && !ipfsHash && (
        <Button onClick={handleUpload}>Upload to IPFS</Button>
      )}
      {image && isLoading && <Button isLoading disabled>Uploading to IPFS...</Button>}
      {image && <Button onClick={() => setImage(null)}>Remove Image</Button>}
      <Input type="file" onChange={handleImageChange} />
    </VStack>   
  );
}

export default ImageUpload;