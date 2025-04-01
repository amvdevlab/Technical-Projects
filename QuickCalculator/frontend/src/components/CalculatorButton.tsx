type ButtonType = "number" | "operation" | "function";

interface CalculatorButtonProps {
    label: string;
    type: ButtonType;
    onClick: () => void;
    className?: string;
}

export default function CalculatorButton({
    label,
    type,
    onClick,
    className = "",
}: CalculatorButtonProps) {
    const getButtonStyle = () => {
        switch (type) {
            case "number":
                return "bg-white text-gray-300 hover:bg-gray-200";
            case "operation":
                return "bg-blue-500 text-white hover:bg-blue-600";
            case "function":
                return "bg-gray-300 text-white hover:bg-gray-400";
            default:
                return "bg-white hover:bg-gray-100";
        }
    };

    return (
        <button
            onClick={onClick}
            className={`${getButtonStyle()} p-4 rounded-lg text-xl font-semibold transition-colors ${className}`}
        >
            {label}
        </button>
    );
}
