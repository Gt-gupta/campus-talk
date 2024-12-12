import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Avatar from "./Avatar";
import axios from "axios";
import "./Center.css";

function Friends() {
    const [friends, setFriends] = useState([]); // State to store friends
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    const navigate = useNavigate();

    // Fetch friends from the API
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token from localStorage
                if (!token) {
                    throw new Error("User is not authenticated");
                }

                // Make API call
                const response = await axios.get("http://localhost:5000/get/getFriends", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update state with fetched friends
                setFriends(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching friends:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFriends();
    }, []);

    // Handle loading and error states
    if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
    if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

    function routeProfile() {
        navigate("/profile");
    }

    function routeMessage() {
        navigate("/message");
    }

    const handleDelete = async (userId) => {
        const token = localStorage.getItem("token"); // Get the token from localStorage
    
        if (!token) {
            throw new Error("User is not authenticated");
        }
    
        try {
            const response = await axios.delete("http://localhost:5000/delete/deleteFriend", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    id2: parseInt(userId),  // Adding the userId in headers
                },
            });
    
            console.log("Friend deleted successfully", response);
            // Optionally remove the deleted friend from the state
            setFriends(prevFriends => prevFriends.filter(friend => friend.id2 !== userId));
        } catch (error) {
            console.error("Error deleting friend:", error);
        }
    };

    function FriendBox(props) {
        const styling = {
            display: "flex",
            backgroundColor: "pink",
            borderRadius: 25,
            alignItems: "center",
            padding: "10px 10px 20px",
            height: 60,
            marginTop: 20,
            position: "relative",
            justifyContent: "space-between",
        };

        const remove = {
            backgroundColor: "red",
            height: 40,
            width: 100,
            borderRadius: 20,
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        };

        const message = {
            backgroundColor: "grey",
            height: 40,
            width: 100,
            borderRadius: 20,
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 30,
        };

        const profile = {
            backgroundColor: "blue",
            height: 40,
            width: 100,
            borderRadius: 20,
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 30,
        };

        return (
            <div style={styling}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar img="/male_avatar.jpg" size={60} />
                    <p style={{ marginLeft: 20, fontSize: 22 }}>{props.name}</p>
                    <p onClick={routeMessage} style={message}>Message</p>
                    <p onClick={routeProfile} style={profile}>Profile</p>
                </div>
                <p style={remove} onClick={() => handleDelete(props.userId)}>Remove</p>
            </div>
        );
    }

    return (
        <div className="Friends">
            {friends.map(x => (
                <FriendBox key={x.id2} name={x.id2} userId={x.id2} />
            ))}
        </div>
    );
}

export default Friends;
