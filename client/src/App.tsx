import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { AppThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import ProjectPage from "@/pages/ProjectPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Insights from "@/pages/Insights";
import InsightArticle from "@/pages/InsightArticle";
import NotFound from "@/pages/not-found";
import { Review } from "./pages/Review";


function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/projects/:id" component={ProjectPage} />
      <Route path="/projects" component={Projects} />
      <Route path="/about" component={About} />
      <Route path="/insights/:slug" component={InsightArticle} />
      <Route path="/insights" component={Insights} />
      <Route path="/contact" component={Contact} />
      <Route path="/review/create_review/:projectId" component={Review} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <TooltipProvider>
          <LocalBusinessJsonLd />
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Navbar />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
