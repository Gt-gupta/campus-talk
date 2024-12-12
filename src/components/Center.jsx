import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import PostTemplate from "./PostTemplate";

function Center() {
    const [posts, setPosts] = useState([]); // State to store posts
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    // Fetch posts from the API
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token"); // Get the token from localStorage
                if (!token) {
                    throw new Error("User is not authenticated");
                }

                // Make API call
                const response = await axios.get("http://localhost:5000/get/getPosts", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update state with fetched posts
                setPosts(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    // Handle loading and error states
    if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
    if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;

    return (
        <div className="Center">
            <h2 style={{ textAlign: "left" }}>Feeds</h2>
            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostTemplate key={post.id} name={`User ${post.userId}`} text={post.description} imagePath={post.image_path} />
                    ))
                ) : (
                    <p style={{ textAlign: "center" }}>No posts available.</p>
                )}
            </div>
        </div>
    );
}

export default Center;
