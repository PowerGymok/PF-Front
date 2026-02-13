import ButtonInterface from "@/interface/ButtonInterface"

const ButtonComponent: React.FC<ButtonInterface> = ({
    size = "medium",
    disabled = false,
    onClick,
    color = "blue",
    label,
    rounded = "md"

}) => {

    const sizes = {
        small: "text-sm px-3 py-1",
        medium: "text-base px-4 py-2",
        large: "text-lg px-6 py-3",
    }

    const colors = {
        blue: "bg-blue-500 hover:bg-blue-700 text-white",
        red: "bg-red-500 hover:bg-red-700 text-white",
        green: "bg-green-500 hover:bg-green-700 text-white",
    }

    const roundedClasses = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
    }



    return (
        <div>
                <button disabled={disabled} onClick={onClick} type="button" className={`${sizes[size]} ${colors[color]} ${roundedClasses[rounded]} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-105 transition`}>
                    {label}
                </button>
        </div>
    )
}

export default ButtonComponent;