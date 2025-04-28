import { v4 as uuidv4 } from "uuid";

// Raw timeline data without manual order, colors, icons
const experienceData = [
    // Newest at top - automatic ordering
    {
        id: uuidv4(),
        title: "University of Indonesia",
        category: "education",
        startDate: "2023-07",
        endDate: "2027-06",
        isOngoing: true,
        tag: "Computer Science",
        description:
            "Currently pursuing a degree with a focus on Software Engineering and Cybersecurity. Actively involved in campus organizations and contributing to open-source projects."
    },
    {
        id: uuidv4(),
        title: "State High School 2 Depok",
        category: "education",
        startDate: "2020-07",
        endDate: "2023-06",
        isOngoing: false,
        tag: "Science",
        description:
            "Led BASIS, the Olympiad extracurricular club at SMAN 2 Depok, and won the city-level Informatics Olympiad (OSN Informatics) during my tenure.",
    },
];

export default experienceData;
