interface TextFieldProps {
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  type?: "text" | "number" | "textarea";
  placeholder?: string;
  required?: boolean;
  min?: number;
  step?: number;
}

export default function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  min,
  step,
}: TextFieldProps) {
  const inputStyle: React.CSSProperties = {
    padding: "0.5rem 0.75rem",
    border: "1px solid #ccc",
    borderRadius: 6,
    fontSize: "1rem",
    width: "100%",
  };

  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.3rem",
        fontSize: "0.9rem",
        fontWeight: 500,
      }}
    >
      {label} {required && <span style={{ color: "red" }}>*</span>}
      {type === "textarea" ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
        />
      ) : (
        <input
          type={type}
          value={
            value === undefined || value === null || Number.isNaN(value)
              ? ""
              : value
          }
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          min={min}
          step={step}
          style={inputStyle}
        />
      )}
    </label>
  );
}
