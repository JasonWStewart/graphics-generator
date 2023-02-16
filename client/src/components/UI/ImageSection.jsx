import { Box, Image } from "@chakra-ui/react";

const ImageSection = ({ loading, data }) => {
  return (
    <Box bg="white" padding="16px" border="1px" borderColor="gray.200" borderRadius="5px" margin="8px">
      <Image htmlHeight="400px" htmlWidth="500px" src={data} alt="" filter={loading ? "grayscale(80%)" : ""} />
    </Box>
  );
};

export default ImageSection;
