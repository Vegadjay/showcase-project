import { Switch, Route, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import Projects from "./pages/projects";
import ProjectDetail from "./pages/project-detail";
import PostProject from "./pages/post-project";
import DiscussionDetail from "./pages/discussion-detail";
import Discussions from "./pages/discussions";
import Hire from "./pages/hire";
import JobDetail from "./pages/job-detail";
import About from "./pages/about";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [location] = useLocation();

  // Add scroll restoration
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MainLayout>
          <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <Switch location={location} key={location}>
              <Route path="/" component={Home} />
              <Route path="/projects" component={Projects} />
              <Route path="/project/:id" component={ProjectDetail} />
              <Route path="/post-project" component={PostProject} />
              <Route path="/discussions" component={Discussions} />
              <Route path="/discussion/:id" component={DiscussionDetail} />
              <Route path="/hire" component={Hire} />
              <Route path="/job-detail" component={JobDetail} />
              <Route path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        </MainLayout>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;