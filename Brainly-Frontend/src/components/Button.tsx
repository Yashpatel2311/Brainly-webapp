import { ReactElement } from "react";

interface Buttonprops {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-500",
  secondary: "bg-purple-200 text-purple-600 hover:bg-purple-100",
};

const defaultStyle =
  "px-4 py-2 rounded-md font-light flex items-center transition duration-300";

export function Button({
  variant,
  text,
  startIcon,
  fullWidth,
  onClick,
  type = "button",
  disabled = false,
}: Buttonprops) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={
        variantClasses[variant] +
        " " +
        defaultStyle +
        `${fullWidth ? " w-full flex justify-center items-center" : ""} ${
          disabled ? "disabled:bg-gray-400 disabled:cursor-not-allowed" : ""
        }`
      }
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
}
