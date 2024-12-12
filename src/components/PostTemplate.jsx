import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Center.css"

function PostTemplate(props){
    const imageStyle = {
        maxWidth: "100%",
        borderRadius: "10px",
        marginTop: "10px",
    };
    return(
    <div className="template">
        <Header name={props.name} />
        <p style={{ textAlign: 'left' , fontWeight:600}}>{props.text}</p>
        {props.imagePath && <img src={`http://localhost:5000${props.imagePath}`} alt="Post" style={imageStyle} />}
        <Footer />
    </div>
    );
}

export default PostTemplate;