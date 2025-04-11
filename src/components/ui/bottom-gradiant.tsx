"use client"
import React from "react"

interface BottomGradientProps {
  primaryColor?: string
  secondaryColor?: string
  duration?: number
}

export const BottomGradient: React.FC<BottomGradientProps> = ({
  primaryColor = "cyan-500",
  secondaryColor = "indigo-500",
  duration = 500,
}) => {
  return (
    <>
      <span 
        className={`absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-${primaryColor} to-transparent opacity-0 transition duration-${duration} group-hover/btn:opacity-100`} 
      />
      <span 
        className={`absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-${secondaryColor} to-transparent opacity-0 blur-sm transition duration-${duration} group-hover/btn:opacity-100`} 
      />
    </>
  )
}

// Example usage:
export const ButtonWithGradient: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`group/btn relative ${className || "block h-10 w-full rounded-md bg-black font-medium text-white"}`}
      {...props}
    >
      {children}
      <BottomGradient />
    </button>
  )
}

export default BottomGradient;