import React from "react";
import "./profile.css";
import Avatar from "./Avatar";
import PostTemplate from "./PostTemplate";

function ProfileScreen(props){
    const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    const List = [1,2,3,4,5,6,7,8,9,10];
    return (
        <div style={{display:"flex"}}>
            <div className="about">
                <Avatar img='/male_avatar.jpg' size={250}/>
                <p style={{fontSize:25, fontWeight:"bold"}}>{props.name}</p>
                <p style={{fontSize:22, fontWeight:"500"}}>23 Friends</p>
                <p style={{fontSize:22, fontWeight:"500"}}>10 Posts</p>
            </div>
            <div className="posts" style={{marginLeft:20 , marginRight:20}}>
            {List.map(x=>{
            return <PostTemplate name="Vikrant Dahiya" text={text} /> ;
        })}
            </div>
        </div>
    );
}

export default ProfileScreen;