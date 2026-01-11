import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Now at IIT Delhi",
    image: "/young-indian-female-student-smiling-professional-h.jpg",
    content:
      "PathFinder helped me realize my true calling. I was confused between medical and engineering, but their assessment showed I had a strong aptitude for technology. Now I'm pursuing Computer Science at IIT Delhi!",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "CA Intermediate Cleared",
    image: "/young-indian-male-student-smiling-professional-hea.jpg",
    content:
      "The detailed roadmap for CA was incredible. Every step was clearly laid out, and the mentorship sessions helped me stay motivated. Cleared my intermediate in first attempt!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Design Intern at Google",
    image: "/young-indian-female-creative-student-smiling-profe.jpg",
    content:
      "I always loved art but didn't know it could be a career. PathFinder introduced me to UX Design and connected me with the right colleges. Now I'm interning at Google!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Success Stories</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Students Who Found Their Path
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from students who transformed their confusion into clarity with our guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-primary">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
