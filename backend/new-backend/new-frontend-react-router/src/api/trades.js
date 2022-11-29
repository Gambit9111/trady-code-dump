import localforage from "localforage";
import axios from "axios";
const tradesUrl = "http://localhost:8000/trades/";

const getTrades = async () => {
  console.log("getTrades");
  const user = await localforage.getItem("user");
  const jsonUser = JSON.parse(user);
  const token = jsonUser.access;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
    const response = await axios.get(tradesUrl, config);
    return response.data;
};

const getTradeSingle = async (id) => {
  console.log("getTradeSingle");
  const user = await localforage.getItem("user");
  const jsonUser = JSON.parse(user);
  const token = jsonUser.access;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(tradesUrl + id, config);
  return response.data;
};

const closeTrade = async (id, exit_price) => {
  console.log("closeTrade");
  const user = await localforage.getItem("user");
  const jsonUser = JSON.parse(user);
  const token = jsonUser.access;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(
    tradesUrl + id + "/",
    { exit_price: exit_price },
    config
  );
  return response.data;
};

const createTrade = async (trade) => {
  console.log("createTrade");
  const user = await localforage.getItem("user");
  const jsonUser = JSON.parse(user);
  const token = jsonUser.access;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.post(tradesUrl, trade, config);
  return response.data;
};

export default { getTrades, getTradeSingle, closeTrade, createTrade };
