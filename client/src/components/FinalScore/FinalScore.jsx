import { useEffect, useState } from "react";
import useFetchImage from "../../hooks/useFetchImage";
import { Input, Flex, Button, VStack, FormControl, FormLabel, HStack, Spinner } from "@chakra-ui/react";
import { useFormik } from "formik";
import WorkArea from "../UI/WorkArea";
import Title from "../UI/Title";
import FormSection from "../forms/FormSection";
import ImageSection from "../UI/ImageSection";
import { saveAs } from "file-saver";

const FinalScore = (props) => {
  const [imageRequest, setImageRequest] = useState({
    homeScore: 0,
    awayScore: 0,
    homeTeam: "Hanworth-Villa",
    awayTeam: "Leatherhead",
  });

  const { data, loading, error } = useFetchImage("http://localhost:3000/generator/1", imageRequest);

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
