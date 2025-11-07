import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Tag, Clock } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string;
  deadline: string;
  createdAt: string;
}

const Projects = () => {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    deadline: "",
  });

  // Load projects from localStorage on mount
  useEffect(() => {
    const storedProjects = localStorage.getItem("watson-projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  // Save projects to localStorage whenever they change
  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem("watson-projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.skills.trim() || !formData.deadline) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      const newProject: Project = {
        id: crypto.randomUUID(),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      const updatedProjects = [newProject, ...projects];
      saveProjects(updatedProjects);

      toast({
        title: "Success!",
        description: "Project submitted successfully",
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        skills: "",
        deadline: "",
      });
      setIsSubmitting(false);
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Submit a Project</h1>
          <p className="text-muted-foreground">
            Share your micro-internship opportunity with talented students
          </p>
        </div>

        {/* Submission Form */}
        <Card className="mb-12 shadow-lg border-primary/10">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Fill out the form below to post a new project</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Build a Student Portal Dashboard"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the project goals, requirements, and deliverables..."
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills *</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., React, TypeScript, Tailwind CSS"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline *</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Submitting..." : "Submit Project"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Projects List */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Available Projects ({projects.length})
          </h2>

          {projects.length === 0 ? (
            <Card className="shadow-md">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No projects yet. Be the first to submit one!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <Card key={project.id} className="shadow-md hover:shadow-xl transition-shadow border-primary/10">
                  <CardHeader>
                    <CardTitle className="text-primary">{project.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs">
                      <Clock className="w-3 h-3" />
                      Posted {new Date(project.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-foreground">{project.description}</p>
                    
                    <div className="flex items-start gap-2">
                      <Tag className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Skills:</p>
                        <p className="text-sm text-foreground">{project.skills}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 mt-1 text-accent flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Deadline:</p>
                        <p className="text-sm text-foreground">
                          {new Date(project.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
