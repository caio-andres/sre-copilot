import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={[
        "bg-surface border border-border rounded-lg shadow-sm",
        "transition-shadow hover:shadow-md",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["px-5 py-4 border-b border-border", className].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={["text-lg font-semibold text-foreground", className].join(" ")}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["px-5 py-4 text-foreground", className].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
