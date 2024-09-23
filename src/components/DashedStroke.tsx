"use client";

import { cn } from "@/lib/utils";

export default function DashedStroke() {
  return (
    <div className="flex flex-col justify-center items-center col-start-1 col-end-2 bg-background opacity-80 rounded-lg w-full h-full overflow-hidden">
      <GridPattern
        width={250}
        height={250}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(1100px_circle_at_center,white,white)]"
        )}
      />
    </div>
  );
}
