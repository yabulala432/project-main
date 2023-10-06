import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const res = await axios.get(url);
    const data = await res.data;
    setData(data);
    setLoading(false);
  };
  fetchData();

  return { data, loading };
};
