import { Center, Text } from "@chakra-ui/react";

const Title = (props) => {
  return (
    <Center
      maxW="1280px"
      p="16px"
      border="1px"
      borderColor="gray.200"
      borderRadius="5px"
      marginBottom="16px"
      bg="gray.50">
      <Text fontSize="4xl">{props.children}</Text>
    </Center>
  );
};

export default Title;
