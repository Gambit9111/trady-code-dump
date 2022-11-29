import Sidebar from "./Sidebar";
import Content from "./Content";
import { useState, useEffect } from "react";


function Page ({user}) {
    const [dashboard, setDashboard] = useState(true);
    const [trades, setTrades] = useState(false);
    const [ideas, setIdeas] = useState(false);
    const [tools, setTools] = useState(false);

    const openDashboard = () => {
        console.log("openDashboard");
        setDashboard(true);
        setTrades(false);
        setIdeas(false);
        setTools(false);
    };

    const openTrades = () => {
        console.log("openTrades");
        setDashboard(false);
        setTrades(true);
        setIdeas(false);
        setTools(false);
    };

    const openIdeas = () => {
        console.log("openIdeas");
        setDashboard(false);
        setTrades(false);
        setIdeas(true);
        setTools(false);
    };

    const openTools = () => {
        console.log("openTools");
        setDashboard(false);
        setTrades(false);
        setIdeas(false);
        setTools(true);
    };

    return (
        <div className="flex flex-col gap-2 sm:flex-row w-full h-[90vh]  bg-blue-400">
            <Sidebar openDashboard={openDashboard} openTrades={openTrades} openIdeas={openIdeas} openTools={openTools}/>
            <Content dashboard={dashboard} trades={trades} ideas={ideas} tools={tools} user={user}/>
        </div>
    )
}

export default Page