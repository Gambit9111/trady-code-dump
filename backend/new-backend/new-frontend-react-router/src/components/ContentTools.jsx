import tools from '../api/tools';

import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";

import Select from 'react-select';

export default function ContentTools() {
    const [indicators, setIndicators] = useState([]);
    const [loadingIndicators, setLoadingIndicators] = useState(false);
    const [timeframeValue, setTimeframeValue] = useState("");
    const [indicatorValue, setIndicatorValue] = useState("");

    const indicators_list = [
    { label: "bb_high_price_%", value: "bb_high_price_%" },
    { label: "rsi", value: "rsi" },
    { label: "roc", value: "roc" },
    { label: "donchian_channel_wband", value: "donchian_channel_wband" },
    { label: "sma200_price_%", value: "sma200_price_%" },
    { label: "sma50_price_%", value: "sma50_price_%" },
    { label: "sma200_sma50_%", value: "sma200_sma50_%" },
    { label: "ema9_price_%", value: "ema9_price_%" },
    { label: "ema9_sma50_%", value: "ema9_sma50_%" },
    { label: "cumulative_return", value: "cumulative_return" },
    ];   

    const timeframes_list = [
    { label: "daily", value: "daily" },
    { label: "4h", value: "4h" },
    { label: "30min", value: "30min" },
    ];   

    const handleIndicatorChange = async (selectedOption) => {
        console.log("handleIndicatorChange", selectedOption);
        setIndicatorValue(selectedOption.value);
        }

    const handleTimeframeChange = async (selectedOption) => {
        console.log("handleIndicatorChange", selectedOption);
        setTimeframeValue(selectedOption.value);
        }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit", indicatorValue, timeframeValue);
    }

    
    return (
        <div className="flex flex-col justify-center items-center gap-3 px-10">
            <h1 className="text-3xl text-white">Tools</h1>
            {loadingIndicators ? <div>Loading indicators...</div> : (   
                <>
                <div className='w-full' ><Select onChange={handleIndicatorChange} options={indicators_list} /></div>
                <div className='w-full' ><Select onChange={handleTimeframeChange} options={timeframes_list} /></div>
                <button className="bg-blue-750 hover:bg-blue-850 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
                </>
            )}
        </div>
    );
}
