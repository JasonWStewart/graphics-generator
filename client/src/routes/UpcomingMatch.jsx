import { useEffect, useState } from "react";
import useFetchImage from "../hooks/useFetchImage";
import { Flex, Button, VStack, FormControl, FormLabel, Select, Input, HStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import Title from "../components/UI/Title";
import FormSection from "../components/forms/FormSection";
import ImageSection from "../components/UI/ImageSection";
import { saveAs } from "file-saver";
import placeholder from "../assets/images/800x1000.png";

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

const findFriendlyName = (team) => {
  return options.find((element) => element.value == team)["label"];
};

const UpcomingMatch = (props) => {
  const [imageRequest, setImageRequest] = useState({
    homeTeam: "Hanworth-Villa",
    awayTeam: "Leatherhead",
    homeName: "Hanworth Villa",
    awayName: "Leatherhead",
    matchDate: "2023-04-03T15:00:00",
    matchLocation: "Rectory Meadows",
    homeColor: "#ee3355",
    awayColor: "#33aa55",
  });

  const { data, loading, error } = useFetchImage("/generator/2", imageRequest);

  useEffect(() => {
    setImageRequest((previousRequest) => {
      return { ...previousRequest };
    });
  }, []);

  const formik = useFormik({
    initialValues: imageRequest,
    onSubmit: (values) => {
      values.homeName = findFriendlyName(values.homeTeam);
      values.awayName = findFriendlyName(values.awayTeam);
      console.log(values);
      setImageRequest(values);
    },
  });

  const downloadLatest = () => {
    saveAs(data, "download.png");
  };

  return (
    <VStack spacing="16px">
      <Title fontSize="3xl">Upcoming Match</Title>
      <Flex direction={{ base: "column", lg: "row" }} gap="16px">
        <FormSection>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing="16px">
              <FormControl>
                <FormLabel htmlFor="homeTeam">Home Team</FormLabel>
                <Select id="homeTeam" name="homeTeam" value={formik.values.homeTeam} onChange={formik.handleChange}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="awayTeam">Away Team</FormLabel>
                <Select id="awayTeam" name="awayTeam" value={formik.values.awayTeam} onChange={formik.handleChange}>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="matchDate">Match Date</FormLabel>
                <Input
                  type="datetime-local"
                  id="matchDate"
                  name="matchDate"
                  value={formik.values.matchDate}
                  onChange={formik.handleChange}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  id="matchLocation"
                  name="matchLocation"
                  value={formik.values.matchLocation}
                  onChange={formik.handleChange}></Input>
              </FormControl>
              <HStack w="100%">
                <FormControl>
                  <FormLabel>Color (H)</FormLabel>
                  <Input
                    type="color"
                    id="homeColor"
                    name="homeColor"
                    value={formik.values.homeColor}
                    onChange={formik.handleChange}></Input>
                </FormControl>
                <FormControl>
                  <FormLabel>Color (A)</FormLabel>
                  <Input
                    type="color"
                    id="awayColor"
                    name="awayColor"
                    value={formik.values.awayColor}
                    onChange={formik.handleChange}></Input>
                </FormControl>
              </HStack>

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

export default UpcomingMatch;
