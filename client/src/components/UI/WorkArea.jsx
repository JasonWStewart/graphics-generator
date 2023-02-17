import { Flex, Box } from "@chakra-ui/react";

const WorkArea = (props) => {
  return (
    <Box bg="gray.50" maxW="1280px" p="16px" border="1px" borderColor="gray.200" borderRadius="5px">
      <Flex direction={{ base: "column", lg: "row" }}>{props.children}</Flex>
    </Box>
  );
};

export default WorkArea;
