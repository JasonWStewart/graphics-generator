import React from "react";
import { Center } from "@chakra-ui/react";

const MainDisplay = (props) => {
  return (
    <Center bg="blue.50" w="100%" h="100%">
      {props.children}
    </Center>
  );
};

export default MainDisplay;
