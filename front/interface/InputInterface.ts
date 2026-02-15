

interface InputProps {
    type: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    
}

export default InputProps;