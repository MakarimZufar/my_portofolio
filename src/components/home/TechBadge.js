// src/components/home/TechBadge.js
export default function TechBadge({ name }) {
    const getBadgeColor = (tech) => {
        const colors = {
            React: "bg-blue-500/30 text-blue-200 border-blue-500/50",
            NextJS: "bg-black/30 text-gray-200 border-gray-500/50",
            Tailwind: "bg-cyan-500/30 text-cyan-200 border-cyan-500/50",
            JavaScript: "bg-yellow-500/30 text-yellow-200 border-yellow-500/50",
            Firebase: "bg-amber-500/30 text-amber-200 border-amber-500/50",
            "Node.js": "bg-green-500/30 text-green-200 border-green-500/50",
        };

        return (
            colors[tech] ||
            "bg-violet-500/30 text-violet-200 border-violet-500/50"
        );
    };

    return (
        <span
            className={`text-xs px-2 py-1 rounded-full border ${getBadgeColor(
                name
            )}`}
        >
            {name}
        </span>
    );
}
