import React from "react";
import ProfileIcon from "./ProfileIcon";
import Pages from "./Pages";
import '../App.css';


function LeftSide(props){
    return <div className = "Left-side">
        <ProfileIcon />
        <h2>{props.name}</h2>
        <Pages update={props.update} />
    </div>
}

export default LeftSide;