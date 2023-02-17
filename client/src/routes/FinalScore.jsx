import { useEffect, useState } from "react";
import useFetchImage from "../hooks/useFetchImage";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Flex,
  Button,
  VStack,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Title from "../components/UI/Title";
import FormSection from "../components/forms/FormSection";
import ImageSection from "../components/UI/ImageSection";
import { saveAs } from "file-saver";
import placeholder from "../assets/images/1000x800.png";

const options = [
  { value: "Ashford-Town-(Middx)", label: "Ashford Town (Middlesex)" },
  { value: "Basingstoke-Town", label: "Basingstoke Town" },
  { value: "Bedfont-Sports", label: "Bedfont Sports" },
  { value: "Binfield", label: "Binfield" },
  { value: "Chertsey-Town", label: "Chertsey Town" },
  { value: "Chipstead", label: "Chipstead" },
  { value: "Guernsey", label: "Guernsey" },
  { value: "Hanworth-Villa", label: "Hanworth Villa" },
  { value: "Leatherhead", label: "Leatherhead" },
  { value: "Marlow", label: "Marlow" },
  { value: "Merstham", label: "Merstham" },
  { value: "Northwood-FC", label: "Northwood FC" },
  { value: "Southall", label: "Southall" },
  { value: "South-Park-(Reigate)", label: "South Park (Reigate)" },
  { value: "Sutton-Common-Rovers", label: "Sutton Common Rovers" },
  { value: "Thatcham-Town", label: "Thatcham Town" },
  {
    value: "Tooting-&-Mitcham-United",
    label: "Tooting & Mitcham United",
  },
  { value: "Uxbridge", label: "Uxbridge" },
  { value: "Walton-&-Hersham", label: "Walton & Hersham" },
  { value: "Westfield", label: "Westfield" },
];

const FinalScore = (props) => {
  const [imageRequest, setImageRequest] = useState({
    homeScore: 0,
    awayScore: 0,
    homeTeam: "Hanworth-Villa",
    awayTeam: "Leatherhead",
  });

  const { data, loading, error } = useFetchImage("/generator/1", imageRequest);

  useEffect(() => {
    setImageRequest((previousRequest) => {
      return { ...previousRequest };
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      homeScore: 0,
      awayScore: 0,
      homeTeam: "Hanworth-Villa",
      awayTeam: "Leatherhead",
    },
    onSubmit: (values) => {
      setImageRequest(values);
    },
  });

  const downloadLatest = () => {
    saveAs(data, "download.png");
  };

  return (
    <VStack spacing="16px">
      <Title fontSize="3xl">Final Score Graphic</Title>
      <Flex direction={{ base: "column", lg: "row" }} gap="16px">
        <FormSection>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing="16px">
              <Flex direction="row" gap="16px">
                <FormControl>
                  <InputGroup>
                    <InputLeftAddon children="Home" />
                    <Input
                      type="number"
                      name="homeScore"
                      id="homeScore"
                      min="0"
                      step="1"
                      value={formik.values.homeScore}
                      onChange={formik.handleChange}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      textAlign="right"
                      type="number"
                      name="awayScore"
                      id="awayScore"
                      min="0"
                      step="1"
                      value={formik.values.awayScore}
                      onChange={formik.handleChange}
                    />
                    <InputRightAddon children="Away" />
                  </InputGroup>
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel htmlFor="homeTeam">Home Badge</FormLabel>
                <Select id="homeTeam" name="homeTeam" value={formik.values.homeTeam} onChange={formik.handleChange}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="awayTeam">Away Badge</FormLabel>
                <Select id="awayTeam" name="awayTeam" value={formik.values.awayTeam} onChange={formik.handleChange}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Flex direction="row" gap="16px" w="100%">
                <Button isLoading={loading} type="submit" w="100%">
                  Update
                </Button>
                <Button onClick={downloadLatest} w="100%">
                  Download
                </Button>
              </Flex>
            </VStack>
          </form>
        </FormSection>
        <ImageSection loading={loading} data={data ? data : placeholder}></ImageSection>
      </Flex>
    </VStack>
  );
};

export default FinalScore;
