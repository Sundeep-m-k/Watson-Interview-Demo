import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users, Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-accent">
      {/* Demo Banner */}
      <div className="bg-accent text-primary-foreground py-2 px-4 text-center">
        <p className="text-sm font-medium">
          🎓 Demo Live Website for Interview | Created by Sundeep Muthukrishnan Kumaraswamy
        </p>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground">
              Watson Tech Talent
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground/90">
              Micro-Internship Portal
            </h2>
          </div>

          {/* Description */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Connecting university sponsors with talented students for meaningful,
            short-term projects that build real-world experience
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Link to="/projects">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <Briefcase className="h-12 w-12 text-primary-foreground mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                Real Projects
              </h3>
              <p className="text-primary-foreground/70">
                Work on actual industry challenges
              </p>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <Users className="h-12 w-12 text-primary-foreground mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                Build Network
              </h3>
              <p className="text-primary-foreground/70">
                Connect with sponsors and peers
              </p>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <Target className="h-12 w-12 text-primary-foreground mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-primary-foreground mb-2">
                Gain Experience
              </h3>
              <p className="text-primary-foreground/70">
                Develop skills in short sprints
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
