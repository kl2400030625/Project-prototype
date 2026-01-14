import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
          <Rocket className="w-8 h-8 text-primary-foreground" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground text-balance">
          Your Dream Career is Closer Than You Think
        </h2>

        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Don&apos;t let confusion hold you back. Join thousands of students who have already discovered their perfect
          career path with PathFinder.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8">
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            Talk to a Counselor
          </Button>
        </div>

        <p className="mt-6 text-sm text-primary-foreground/60">
          No credit card required • Free career assessment included
        </p>
      </div>
    </section>
  )
}
