import { Box, Image } from "@chakra-ui/react";

const ImageSection = ({ loading, data }) => {
  return (
    <Box bg="white" padding="16px" border="1px" borderColor="gray.200" borderRadius="4px">
      <Image src={data} alt="" filter={loading ? "brightness(20%)" : ""} maxH="800px" />
    </Box>
  );
};

export default ImageSection;
