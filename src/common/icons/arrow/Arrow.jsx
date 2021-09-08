import React from "react";

const Arrow = ({ width = 20, height = 20, color = "#000", direction = "left" }) => {
    const dir = () => {
        switch (direction) {
            case "right":
                return "180";
            case "left":
                return "0";
            case "top":
                return "90";
            case "bottom":
                return "270";
            default:
                return "0";
        }
    };
    const active = dir();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 459 459"
            fill={color}
            style={{ transform: `rotate(${active}deg)` }}
        >
            <g>
                <g id="reply">
                    <path d="M178.5,140.25v-102L0,216.75l178.5,178.5V290.7c127.5,0,216.75,40.8,280.5,130.05C433.5,293.25,357,165.75,178.5,140.25z" />
                </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
        </svg>
    );
};

export default Arrow;
