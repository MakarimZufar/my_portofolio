import React from "react";

/**
 * Renders the vertical timeline line with markers
 */
const VerticalTimeline = ({ height }) => {
    return (
        <div
            className="absolute left-1/2 transform -translate-x-1/2 z-0"
            style={{ height: `${height}px` }}
        >
            {/* Glowing timeline line */}
            <div className="relative w-1 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-purple-600/30 rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-purple-600/50 rounded-full animate-pulse"></div>
            </div>

            {/* Top marker */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>

            {/* Bottom marker */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-purple-600 shadow-lg shadow-purple-600/50"></div>
        </div>
    );
};

export default VerticalTimeline;
