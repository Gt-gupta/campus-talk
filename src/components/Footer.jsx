import React from "react";
import "./Center.css"
function Footer(){
    return (
        <div className="footer">
            <div style={{marginRight:20}}>
                <p style={{color:"red"}}>Likes</p>
            </div>
            <div>
                <p>Comments</p>
            </div>
        </div>
    );
}

export default Footer;