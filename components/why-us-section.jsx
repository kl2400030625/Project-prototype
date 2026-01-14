import { Check, Award, Heart, Zap } from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Proven Track Record",
    description: "95% of our students successfully get into their dream colleges and career paths.",
  },
  {
    icon: Heart,
    title: "Student-First Approach",
    description: "We listen to your dreams and concerns. Your success is our only priority.",
  },
  {
    icon: Zap,
    title: "Latest Industry Insights",
    description: "Our roadmaps are updated regularly with the latest industry trends and opportunities.",
  },
]

const benefits = [
  "Personalized career assessment",
  "Expert counselor support",
  "24/7 access to resources",
  "Regular progress tracking",
  "Parent involvement sessions",
  "Scholarship guidance",
]

export function WhyUsSection() {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground text-balance">
              We Don&apos;t Just Guide, We Transform Futures
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              At PathFinder, we understand the pressure students face while choosing their career. That&apos;s why
              we&apos;ve built a platform that combines technology with human expertise to give you the best guidance
              possible.
            </p>

            <div className="mt-8 space-y-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Benefits Card */}
          <div className="relative">
            <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">What You Get With Us</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Motivational Quote */}
              <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <p className="text-foreground italic text-lg">
                  &ldquo;The future belongs to those who believe in the beauty of their dreams.&rdquo;
                </p>
                <p className="mt-2 text-muted-foreground text-sm">— Eleanor Roosevelt</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-4 -right-4 w-full h-full rounded-3xl bg-primary/10" />
          </div>
        </div>
      </div>
    </section>
  )
}
