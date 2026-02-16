interface ButtonInterface {

    size?: "small" | "medium" | "large";
    disabled?: boolean;
    onClick?: () => void;
    color?: "blue" | "red" | "green"
    label: string
    rounded? : "sm" | "md" | "lg"
    type?: "button" | "submit" | "reset"
    text?: string,
    className?: string


}

export default ButtonInterface;