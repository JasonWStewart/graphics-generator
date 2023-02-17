import { useEffect, useState } from "react";
import useFetchImage from "../../hooks/useFetchImage";
import { Input, Flex, Button, VStack, FormControl, FormLabel, HStack, Select } from "@chakra-ui/react";
import { useFormik } from "formik";
import WorkArea from "../UI/WorkArea";
import Title from "../UI/Title";
import FormSection from "../forms/FormSection";
import ImageSection from "../UI/ImageSection";
import { saveAs } from "file-saver";

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

  const { data, loading, error } = useFetchImage("http://localhost:3000/generator/1", imageRequest);

  // useEffect(() => {
  //   setImageRequest((previousRequest) => {
  //     return { ...previousRequest };
  //   });
  // }, []);

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
    <Flex direction="column">
      <Title fontSize="3xl">Final Score Graphic</Title>
      <WorkArea>
        <FormSection>
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing="16px">
              <FormControl>
                <FormLabel htmlFor="homeScore">Home Score</FormLabel>
                <Input
                  type="number"
                  name="homeScore"
                  id="homeScore"
                  min="0"
                  step="1"
                  value={formik.values.homeScore}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="awayScore">Away Score</FormLabel>
                <Input
                  type="number"
                  name="awayScore"
                  id="awayScore"
                  min="0"
                  step="1"
                  value={formik.values.awayScore}
                  onChange={formik.handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="homeTeam">Home Badge</FormLabel>{" "}
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

              <HStack>
                <Button isLoading={loading} type="submit">
                  Update
                </Button>
                <Button onClick={downloadLatest}>Download</Button>
              </HStack>
            </VStack>
          </form>
        </FormSection>
        <ImageSection loading={loading} data={data}></ImageSection>
      </WorkArea>
    </Flex>
  );
};

export default FinalScore;
