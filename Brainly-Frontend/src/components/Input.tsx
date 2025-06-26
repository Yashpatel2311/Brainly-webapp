interface InputProps {
  placeholder: string;
  reference?: React.RefObject<HTMLInputElement>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  required?: boolean;
  minLength?: number;
  pattern?: string;
}

export function Input({
  placeholder,
  reference,
  value,
  onChange,
  type = "text",
  error,
  required = false,
  minLength,
  pattern,
}: InputProps) {
  return (
    <div className="w-full">
      <input
        placeholder={placeholder}
        type={type}
        className={`px-4 py-2 border rounded m-2 text-black w-full ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        ref={reference}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        pattern={pattern}
      />
      {error && <p className="text-red-500 text-sm ml-2 -mt-1">{error}</p>}
    </div>
  );
}
