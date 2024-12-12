import React, { useState, useEffect } from "react";
import Center from './Center';
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import Post from './Post';
import Friends from './Friends';
import { useSearchParams } from 'react-router-dom';
import "../App.css";

function Home() {
    const [searchParams] = useSearchParams();
    const indexFromParams = parseInt(searchParams.get('index')) || 0; // Ensure index is a number
    const [chosenIndex, setIndex] = useState(indexFromParams); // Set initial state based on query parameter

    useEffect(() => {
        // Update chosenIndex when the query parameter changes (e.g., after navigating)
        setIndex(indexFromParams);
    }, [indexFromParams]); // Trigger re-render when the indexFromParams changes

    function update(no) {
        setIndex(no);
    }

    return (
        <div className="App">
            <LeftSide update={update} name="Vikrant Dahiya" />
            {chosenIndex === 0 && <Center />}
            {chosenIndex === 1 && <Post />}
            {chosenIndex === 2 && <Friends />}
            <RightSide />
        </div>
    );
}

export default Home;
