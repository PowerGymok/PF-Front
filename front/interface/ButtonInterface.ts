interface ButtonInterface {

    size?: "small" | "medium" | "large";
    disabled?: boolean;
    onClick?: () => void;
    color?: "blue" | "red" | "green"
    label: string
    rounded? : "sm" | "md" | "lg"

}

export default ButtonInterface;