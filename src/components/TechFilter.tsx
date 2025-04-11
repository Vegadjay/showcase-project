import { motion } from "framer-motion";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

interface TechStack {
  name: string;
  logo: string;
}

// Tech stack array with logos
const techStackList: TechStack[] = [
  {
    name: "React",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
  },
  {
    name: "TypeScript",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
  },
  {
    name: "Next.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg"
  },
  {
    name: "Node.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
  },
  {
    name: "Python",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
  },
  {
    name: "JavaScript",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
  },
  {
    name: "Vue.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg"
  },
  {
    name: "Angular",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg"
  },
  {
    name: "TailwindCSS",
    logo: "/tailwind.svg"
  },
  {
    name: "Docker",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"
  }
];

interface TechFilterProps {
  activeTech: string;
  setActiveTech: (tech: string) => void;
}

const TechFilter = ({ activeTech, setActiveTech }: TechFilterProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-black dark:text-white mb-3">
        Filter by Tech Stack
      </h3>
      <div className="flex flex-wrap gap-3 pb-3 overflow-x-auto scrollbar-hide">
        {techStackList.map((tech) => (
          <motion.div
            key={tech.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HoverBorderGradient
              logo={tech.logo}
              name={tech.name}
              onClick={() => setActiveTech(tech.name)}
              containerClassName={`cursor-pointer ${
                activeTech === tech.name
                  ? "border-red-500"
                  : "border-gray-600"
              }`}
              className={`${
                activeTech === tech.name
                  ? "bg-red-500/10 hover:bg-red-500/20"
                  : "bg-black/20 hover:bg-black/30"
              }`}
              logoClassName="w-5 h-5"
              nameClassName={`text-sm font-medium ${
                activeTech === tech.name
                  ? "text-red-500"
                  : "text-gray-200"
              }`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TechFilter;

// Example usage in parent component:
/*
const [activeTech, setActiveTech] = useState<string>("");

<TechFilter 
  activeTech={activeTech} 
  setActiveTech={setActiveTech} 
/>
*/