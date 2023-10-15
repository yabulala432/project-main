import axios from "axios";
import { endpoint } from "../env/urls";

const url = endpoint;

const fetchAll = async (zemaName: string) => {
  const res = await axios.get(`${url}/${zemaName}/getAll`);
  return res.data;
};
