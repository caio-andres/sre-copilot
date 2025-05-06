// src/components/ui/container.tsx
import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={["max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", className].join(
        " "
      )}
      {...props}
    >
      {children}
    </div>
  );
}
