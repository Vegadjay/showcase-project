"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

export function GlowSearchInput({ 
  searchQuery, 
  setSearchQuery 
}: { 
  searchQuery: string; 
  setSearchQuery: (value: string) => void 
}) {
  const radius = 120;   
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: { 
    currentTarget: HTMLElement;
    clientX: number;
    clientY: number;
  }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="w-full lg:w-auto">
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              rgba(239, 68, 68, 0.6), /* Increased opacity from 0.5 to 0.6 */
              transparent 85% /* Increased from 80% to 85% for smoother fade */
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input relative rounded-lg p-[2px] transition duration-300 hover:shadow-[0_0_15px_-3px_rgba(239,68,68,0.4)] dark:hover:shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]" // Added hover shadow effect
      >
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full lg:w-80 rounded-md border-none bg-gray-50 pl-10 pr-4 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2.5px] focus-visible:ring-red-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-red-600 hover:bg-gray-100 dark:hover:bg-zinc-700/90" // Added hover background effect and increased ring width
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500 dark:text-red-400 h-5 w-5" />
      </motion.div>
    </div>
  );
}