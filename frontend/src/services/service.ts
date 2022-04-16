import axios from "axios";
export interface RequestItem {
  name: string;
  desc?: string; // Optional
  currLocation: string;
  totalItems: number;
}
export interface ResponseItem extends RequestItem {
  id: string;
}
let endpoint = "http://localhost:8000";
if (process.env.NODE_ENV === "production") {
  endpoint = "???"; // TODO
}

export const getItems = async () => {
  const res = await axios.get(endpoint);
  return res.data as ResponseItem[];
};
export const postItem = async (item: RequestItem) => {
  const res = await axios.post(endpoint, item);
  return res.data as ResponseItem;
};
export const putItem = async (
  item: {
    name?: string;
    desc?: string;
    currLocation?: string;
    totalItems?: number;
  },
  id: string
) => {
  const res = await axios.put(`${endpoint}/${id}`, item);
  return res.data as ResponseItem[];
};

export const deleteItem = async (id: string) => {
  const res = await axios.delete(`${endpoint}/${id}`);
  return res.data as ResponseItem[];
};
