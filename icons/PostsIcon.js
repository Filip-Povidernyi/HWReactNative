import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PostsIcon = ({ strokeColor, ...props }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={40}
        height={40}
        fill="none"
        {...props}
    >
        <Path fill="none" d="M8 8h24v24H8z" />
        <Path
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.8}
            d="M11 11h7v7h-7v-7ZM22 11h7v7h-7v-7ZM22 22h7v7h-7v-7ZM11 22h7v7h-7v-7Z"
            clipRule="evenodd"
        />
    </Svg>
)
export default PostsIcon