import React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";

const AddIcon = () => {
    return (
        <Svg width="132" height="120" fill="none" >
            <Rect width="120" height="120" rx="16" fill="#F6F6F6" />
            <Circle cx="119.5" cy="93.5" r="12" fill="white" stroke="#FF6C00" />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M120 87H119V93H113V94H119V100H120V94H126V93H120V87Z"
                fill="#FF6C00"
            />
        </Svg>
    );
};

export default AddIcon;