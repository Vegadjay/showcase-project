"use client";
import React from "react";
import { motion } from "motion/react";

export function ColourfulText({ text }: { text: string }) {
  const lightModeColors = [
    "rgb(131, 179, 32)",  // green
    "rgb(47, 195, 106)",  // teal
    "rgb(42, 169, 210)",  // light blue
    "rgb(4, 112, 202)",   // blue
    "rgb(107, 10, 255)",  // purple
    "rgb(183, 0, 218)",   // magenta
    "rgb(218, 0, 171)",   // pink
    "rgb(230, 64, 92)",   // rose
    "rgb(232, 98, 63)",   // orange
    "rgb(249, 129, 47)",  // amber
  ];

  const darkModeColors = [
    "rgb(156, 214, 38)",  // lighter green
    "rgb(56, 235, 127)",  // lighter teal
    "rgb(51, 204, 255)",  // lighter blue
    "rgb(5, 134, 242)",   // lighter bright blue
    "rgb(128, 12, 255)",  // lighter purple
    "rgb(219, 0, 255)",   // lighter magenta
    "rgb(255, 0, 200)",   // lighter pink
    "rgb(255, 71, 102)",  // lighter rose
    "rgb(255, 107, 69)",  // lighter orange
    "rgb(255, 140, 50)",  // lighter amber
  ];

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [currentColors, setCurrentColors] = React.useState(lightModeColors);
  const [count, setCount] = React.useState(0);

  // Check for dark mode
  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    setCurrentColors(isDark ? darkModeColors : lightModeColors);

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
          setCurrentColors(isDark ? darkModeColors : lightModeColors);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Color shuffle effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      const colors = isDarkMode ? darkModeColors : lightModeColors;
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isDarkMode]);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{ y: 0 }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="inline-block whitespace-pre font-sans tracking-tight text-black dark:text-white"
    >
      {char}
    </motion.span>
  ));
}
