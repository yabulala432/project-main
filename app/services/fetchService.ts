import axios from "axios";
import { endpoint } from "../env/urls";

export interface data {
  _id: string;
  amharicImage: any;
  geezImage: any;
  geezAudio?: any;
  ezlAudio?: any;
  description: string;
  title: string;
  zema?: string;
}

const url = endpoint;

export const fetchAll = async (zemaName: string): Promise<data[]> => {
  // console.log(`${url}/${zemaName}/getAll`);

  const res = await axios
    .get<Array<data>>(`${url}/${zemaName}/getAll`)
    .then((res) => {
      return res.data;
    });
  return res;
};
