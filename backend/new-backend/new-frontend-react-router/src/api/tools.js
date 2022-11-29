import localforage from "localforage";
import axios from "axios";

const indicatorsUrl = "http://localhost:8000/tools/sort/indicators";
const candlesticksUrl = "http://localhost:8000/tools/sort/candlesticks";

const getIndicators = async (timeframe, indicator) => {
    console.log("getIndicators");
    const user = await localforage.getItem("user");
    const jsonUser = JSON.parse(user);
    const token = jsonUser.access;
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    };
    const response = await axios.get(
        indicatorsUrl + "/" + timeframe + "/" + indicator,
        config
    );
    return response.data;
    };

export default { getIndicators };