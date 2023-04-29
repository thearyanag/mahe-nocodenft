import React, { useState } from 'react';
import { Box, Button, Image, Input , VStack} from '@chakra-ui/react';

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <VStack m={30} gap={60}>
      {image && <Image src={image} height={300} width={300} alt="uploaded image" />}
      {!image && (
        <Box
          height={300}
          width={300}
          border="1px dashed gray"
          borderRadius="md"
        ></Box>
      )}
      {image && <Button>Upload Image</Button>}
      {image && <Button onClick={() => setImage(null)}>Remove Image</Button>}
      <Input type="file" onChange={handleImageChange} />
    </VStack>
  );
}

export default ImageUpload;