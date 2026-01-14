import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, GraduationCap, Briefcase, Users, Target, BookOpen } from "lucide-react"

const services = [
  {
    icon: MapPin,
    title: "Career Roadmaps",
    description:
      "Get personalized step-by-step roadmaps tailored to your chosen career path. Know exactly what courses, skills, and milestones you need to achieve.",
    highlight: "100+ Detailed Paths",
  },
  {
    icon: GraduationCap,
    title: "College References",
    description:
      "Access our curated database of top colleges and universities. Get recommendations based on your scores, location, and career goals.",
    highlight: "200+ Partner Institutions",
  },
  {
    icon: Briefcase,
    title: "Internship Connect",
    description:
      "Gain real-world experience with internships at leading companies. Build your resume while still in school.",
    highlight: "500+ Opportunities",
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description:
      "Connect with industry professionals and successful alumni who guide you through your career decisions.",
    highlight: "Expert Guidance",
  },
  {
    icon: Target,
    title: "Aptitude Assessment",
    description: "Discover your true strengths and interests through our scientifically designed assessment tests.",
    highlight: "AI-Powered Analysis",
  },
  {
    icon: BookOpen,
    title: "Skill Development",
    description: "Access courses and resources to build the skills that matter for your dream career.",
    highlight: "Free Resources",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Everything You Need to Build Your Future
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive career guidance services to help you make informed decisions about your future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-foreground">{service.title}</CardTitle>
                <div className="inline-flex px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium w-fit">
                  {service.highlight}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
