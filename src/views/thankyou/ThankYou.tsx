import {useEffect, useState} from "react";


export const ThankYou = () => {
    const [data, setData] = useState("React")
    useEffect(() => {
        console.log("hello,React");
    }, []);
    return (
        <>
            <h1>学习{data}</h1>
            <button onClick={() => {
                setData("Vue")
            }}>
                点击我学习Vue;
            </button>
        </>
    )
}