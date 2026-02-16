import InputProps from "@/interface/InputInterface"

const InputComponent: React.FC<InputProps>= ({
    type,
    placeholder = "",
    value,
    onChange,
    name = "",
    
}) => {
    return (
        <div className="w-full max-w-md mx-auto mb-4 mt-4">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    ) 
}

export default InputComponent;