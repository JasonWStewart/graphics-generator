import { useEffect, useState } from "react";
import useFetchImage from "../hooks/useFetchImage";
import { Input, Flex, Button, VStack, FormControl, FormLabel, HStack, Select, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import Title from "../components/UI/Title";
import FormSection from "../components/forms/FormSection";
import ImageSection from "../components/UI/ImageSection";
import { saveAs } from "file-saver";
import placeholder from "../assets/images/550x760.png";
import Compressor from "compressorjs";
import axios from "axios";

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

const ProfileCard = (props) => {
  const [imageRequest, setImageRequest] = useState({
    nameText: "Firstname Lastname",
    roleText: "Position/Title/Role",
    imageUploadName: "",
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data, loading, error } = useFetchImage("/generator/3", imageRequest);

  useEffect(() => {
    setImageRequest((previousRequest) => {
      return { ...previousRequest };
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      nameText: "",
      roleText: "",
    },
    onSubmit: (values) => {
      setImageRequest((previousState) => {
        return { ...values, imageUploadName: uploadedImage };
      });
    },
  });

  const downloadLatest = () => {
    saveAs(data, "download.png");
  };

  const uploadFile = (file) => {
    setIsLoading(true);
    const data = new FormData();
    data.append("file", file);
    axios.post("/upload", data).then((res) => {
      setUploadedImage(res.data);
      setIsLoading(false);
    });
  };

  const imageInputHandler = async (e) => {
    let inputFile = e.target.files[0];
    new Compressor(inputFile, {
      quality: 0.8,
      success: (result) => {
        uploadFile(result);
      },
    });
  };

  return (
    <VStack spacing="16px">
      <Title fontSize="3xl">Profile Card</Title>
      <Flex direction={{ base: "column", lg: "row" }} gap="16px">
        <FormSection>
          <VStack spacing="16px">
            <form onSubmit={formik.handleSubmit}>
              <FormLabel for="image">{isLoading ? "Uploading..." : "Upload Image"}</FormLabel>
              <Input type="file" name="image" onChange={imageInputHandler} />
              <FormControl>
                <FormLabel htmlFor="nameText">Name</FormLabel>
                <Input
                  type="text"
                  id="nameText"
                  name="nameText"
                  value={formik.values.nameText}
                  onChange={formik.handleChange}></Input>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="roleText">Role</FormLabel>
                <Input
                  type="text"
                  id="roleText"
                  name="roleText"
                  value={formik.values.roleText}
                  onChange={formik.handleChange}></Input>
              </FormControl>
              <Flex direction="row" gap="16px" w="100%">
                <Button isLoading={loading} type="submit" w="100%">
                  Update
                </Button>
                <Button onClick={downloadLatest} w="100%">
                  Download
                </Button>
              </Flex>
            </form>
          </VStack>
        </FormSection>
        <ImageSection loading={loading} data={data ? data : placeholder}></ImageSection>
      </Flex>
    </VStack>
  );
};

export default ProfileCard;
