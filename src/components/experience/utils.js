export const getCategoryAttributes = (category) => {
    switch (category) {
        case "education":
            return { color: "#00c6ff", icon: "🎓" };
        case "work":
            return { color: "#7928ca", icon: "💼" };
        case "project":
            return { color: "#ff4757", icon: "🚀" };
        default:
            return { color: "#2ed573", icon: "⭐" };
    }
};

/**
 * Calculates duration between two dates
 * @param {string} startDate - Start date in YYYY-MM format
 * @param {string} endDate - End date in YYYY-MM format
 * @param {boolean} isOngoing - Whether the activity is ongoing
 * @returns {string} Formatted duration string
 */
export const calculateDuration = (startDate, endDate, isOngoing = false) => {
    const start = new Date(startDate);
    const end = isOngoing ? new Date() : new Date(endDate);

    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();

    let years = yearDiff;
    let months = monthDiff;

    if (monthDiff < 0) {
        years--;
        months += 12;
    }

    let durationText = "";
    if (years > 0) {
        durationText += years === 1 ? "1 year" : `${years} years`;
        if (months > 0) durationText += " ";
    }
    if (months > 0 || (years === 0 && months === 0)) {
        durationText += months === 1 ? "1 month" : `${months} months`;
    }

    return durationText;
};

/**
 * Processes raw timeline data to add derived properties
 * @param {Array} data - Raw timeline data
 * @returns {Array} Processed timeline data with additional properties
 */
export const processTimelineData = (data) => {
    return data.map((item, index) => {
        const { color, icon } = getCategoryAttributes(item.category);
        const duration = calculateDuration(
            item.startDate,
            item.endDate,
            item.isOngoing
        );
        const years = `${new Date(item.startDate).getFullYear()} - ${
            item.isOngoing ? "Present" : new Date(item.endDate).getFullYear()
        }`;

        return {
            ...item,
            color,
            icon,
            years,
            duration,
            order: index, // Automatically ordered based on array position
        };
    });
};
