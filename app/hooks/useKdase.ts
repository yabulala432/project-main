import { useEffect, useState } from "react";
import axios from "axios";

import { endpoint } from "../env/urls";

const url = endpoint;

export const useZemaTitle = (zema: string) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const fetchTitleOfKdase = async () => {
    await axios
      .get(`${url}/${zema}/titles`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchTitleOfKdase();
  }, []);

  return { data, loading, error };
};

/**
export const useZemaAmharicImage = (zema: string, title: string) => {
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);

  const fetchKdaseByTitle = async () => {
    console.log(`${url}/${zema}/amharic/image/${title}`, "line 38");
    await axios
      .get(`${url}/amharic/image/${title}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchKdaseByTitle();
  }, []);

  return { data, loading, error };
};
*/
