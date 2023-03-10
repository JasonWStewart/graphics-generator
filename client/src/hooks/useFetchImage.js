import { useState } from "react";
import axios from "axios";
import useEffectUpdate from "./useEffectUpdate";

const useFetchImage = (url, inputBody) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffectUpdate(() => {
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
  }, [inputBody]);

  return { data, loading, error };
};

export default useFetchImage;
