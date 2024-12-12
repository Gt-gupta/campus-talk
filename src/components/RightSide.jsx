import React from "react";
import '../App.css';
import StoryTemplate from "./StoryTemplate";


function RightSide(){
    return <div className = "Right-side">
        <h2>Top Story of the Month</h2>
        {Array.from({ length: 5 }, (_, index) => (
                <StoryTemplate />
            ))}
    </div>
}

export default RightSide;