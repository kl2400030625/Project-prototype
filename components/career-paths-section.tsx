"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const careerPaths = [
  {
    category: "Science Stream",
    paths: [
      { name: "Engineering", icon: "⚙️", students: "15K+ students" },
      { name: "Medical", icon: "🏥", students: "12K+ students" },
      { name: "Research", icon: "🔬", students: "3K+ students" },
      { name: "Architecture", icon: "🏛️", students: "2K+ students" },
    ],
  },
  {
    category: "Commerce Stream",
    paths: [
      { name: "CA/CPA", icon: "📊", students: "8K+ students" },
      { name: "Business", icon: "💼", students: "6K+ students" },
      { name: "Banking", icon: "🏦", students: "4K+ students" },
      { name: "Economics", icon: "📈", students: "3K+ students" },
    ],
  },
  {
    category: "Arts & Humanities",
    paths: [
      { name: "Law", icon: "⚖️", students: "5K+ students" },
      { name: "Journalism", icon: "📰", students: "3K+ students" },
      { name: "Design", icon: "🎨", students: "4K+ students" },
      { name: "Psychology", icon: "🧠", students: "2K+ students" },
    ],
  },
  {
    category: "Emerging Fields",
    paths: [
      { name: "AI/ML", icon: "🤖", students: "6K+ students" },
      { name: "Data Science", icon: "📱", students: "5K+ students" },
      { name: "Cybersecurity", icon: "🔒", students: "3K+ students" },
      { name: "Digital Marketing", icon: "📣", students: "4K+ students" },
    ],
  },
]

export function CareerPathsSection() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section id="paths" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Explore Careers</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Find the Path That Excites You
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you love science, numbers, creativity, or technology — we have detailed roadmaps for every career
            path.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {careerPaths.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary border border-border"
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        {/* Career Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerPaths[activeCategory].paths.map((path, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{path.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{path.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{path.students}</p>
                <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  View Roadmap
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary bg-transparent"
          >
            Explore All 100+ Career Paths
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
