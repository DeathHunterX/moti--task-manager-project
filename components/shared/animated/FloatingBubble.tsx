import React from "react";

interface BubbleProps {
    size: number;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    duration: string;
    delay: string;
}

const FloatingBubble: React.FC<BubbleProps> = ({
    size,
    top,
    left,
    right,
    bottom,
    duration,
    delay,
}) => {
    const style = {
        width: `${size}px`,
        height: `${size}px`,
        top,
        left,
        right,
        bottom,
        "--duration": duration,
        "--delay": delay,
    } as React.CSSProperties;

    return (
        <div
            className="float-bubble absolute bg-white/10 rounded-full"
            style={style}
        />
    );
};

export default FloatingBubble;
