import { useState } from "react";
import axios from "axios";
import useDebounce from "./useDebounce";

const useFetchImage = (url, inputBody) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useDebounce(
    () => {
      setLoading(true);
      axios
        .post(url, inputBody, {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        })
        .then((response) => {
          let blob = new Blob([response.data], { type: "image/png" });
          setData(URL.createObjectURL(blob));
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    500,
    [inputBody]
  );

  return { data, loading, error };
};

export default useFetchImage;
