import { Box } from "@chakra-ui/react";

const FormSection = (props) => {
  return (
    <Box bg="white" padding="16px" border="1px" borderColor="gray.200" borderRadius="4px" height="100%">
      {props.children}
    </Box>
  );
};

export default FormSection;
