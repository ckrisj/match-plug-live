import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  href,
  disabled = false,
  className = "",
}) => {
  // Base classes
  const baseClasses = `
    font-semibold rounded-full transition-all duration-300 transform 
    hover:scale-105 inline-flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  // Size variants
  const sizeClasses = {
    sm: "pt-2 pb-2.5 px-4 text-sm min-w-[160px]",
    md: "pt-2 pb-2.5 px-5 sm:text-lg min-w-[220px]",
    lg: "pt-4 pb-4.5 px-12 text-xl min-w-[240px]",
  };

  // Style variants
  const variantClasses = {
    primary: `
      bg-green-400 hover:bg-green-500 text-black hover:shadow-2xl
      focus:ring-gray-500
    `,
    secondary: `
      border-2 bg-blue-500 border-blue-400/60 hover:border-white text-white 
      hover:text-white hover:bg-blue-500 backdrop-blur-sm
      focus:ring-white/50
    `,
  };

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "w-full sm:w-auto";

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${widthClasses}
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  // If href is provided, render as Link (Next.js)
  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  // Regular button
  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
