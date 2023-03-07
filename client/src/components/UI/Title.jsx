import { Center, Text } from "@chakra-ui/react";

const Title = (props) => {
  return (
    <Center width="100%" p="16px" border="1px" borderColor="gray.200" borderRadius="4px" bg="white">
      <Text fontSize={{ base: "3xl", lg: "4xl" }}>{props.children}</Text>
    </Center>
  );
};

export default Title;
