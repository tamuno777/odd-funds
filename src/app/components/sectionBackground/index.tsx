import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionBackground({ children, className }: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden mx-auto max-w-7xl ${className ?? ""}`}
      style={{
        // minHeight: "calc(100vh - 65px)",
        height:"fit-content",
        background:
          "linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 60%, #fff 100%)",
      }}
    >

      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, #dce9ff 0%, transparent 70%)",
          top: -150,
          right: -100,
          opacity: 0.6,
        }}
      />

      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 300,
          height: 300,
          background: "radial-gradient(circle, #e0f0ff 0%, transparent 70%)",
          bottom: -80,
          left: "30%",
          opacity: 0.5,
        }}
      />

      {children}
    </div>
  );
}