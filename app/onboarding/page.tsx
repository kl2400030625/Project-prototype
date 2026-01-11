"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Compass, ArrowRight, ArrowLeft, GraduationCap, Target, MapPin, Wallet, Sparkles, BookOpen } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

const steps = [
  { id: 1, title: "Education", icon: GraduationCap },
  { id: 2, title: "Interests", icon: Sparkles },
  { id: 3, title: "Goals", icon: Target },
  { id: 4, title: "Preferences", icon: MapPin },
]

const classOptions = [
  { value: "10th", label: "10th Class (SSC)" },
  { value: "11th", label: "11th Class (Intermediate 1st Year)" },
  { value: "12th", label: "12th Class (Intermediate 2nd Year)" },
  { value: "graduate", label: "Undergraduate" },
  { value: "postgraduate", label: "Postgraduate" },
]

const streamOptions = [
  { value: "science-pcm", label: "Science (PCM - Physics, Chemistry, Math)" },
  { value: "science-pcb", label: "Science (PCB - Physics, Chemistry, Biology)" },
  { value: "commerce", label: "Commerce" },
  { value: "arts", label: "Arts / Humanities" },
  { value: "vocational", label: "Vocational" },
  { value: "undecided", label: "Not decided yet" },
]

const interestOptions = [
  { value: "technology", label: "Technology & Computers" },
  { value: "medicine", label: "Medicine & Healthcare" },
  { value: "engineering", label: "Engineering" },
  { value: "business", label: "Business & Entrepreneurship" },
  { value: "design", label: "Design & Creativity" },
  { value: "science", label: "Pure Sciences" },
  { value: "law", label: "Law & Legal Studies" },
  { value: "finance", label: "Finance & Banking" },
  { value: "media", label: "Media & Communication" },
  { value: "education", label: "Teaching & Education" },
  { value: "sports", label: "Sports & Fitness" },
  { value: "arts", label: "Fine Arts & Music" },
]

const goalOptions = [
  { value: "high-salary", label: "High paying job" },
  { value: "job-security", label: "Job security & stability" },
  { value: "passion", label: "Follow my passion" },
  { value: "entrepreneurship", label: "Start my own business" },
  { value: "abroad", label: "Study/Work abroad" },
  { value: "government", label: "Government job" },
  { value: "research", label: "Research & academics" },
  { value: "social-impact", label: "Make social impact" },
]

const locationOptions = [
  { value: "metro", label: "Metro cities (Delhi, Mumbai, Bangalore, etc.)" },
  { value: "tier2", label: "Tier 2 cities" },
  { value: "hometown", label: "Stay near hometown" },
  { value: "abroad", label: "Open to studying abroad" },
  { value: "flexible", label: "Flexible / No preference" },
]

const budgetOptions = [
  { value: "low", label: "Budget-friendly (Under ₹1 Lakh/year)" },
  { value: "medium", label: "Moderate (₹1-3 Lakhs/year)" },
  { value: "high", label: "Premium (₹3-10 Lakhs/year)" },
  { value: "no-constraint", label: "No budget constraints" },
  { value: "scholarship", label: "Looking for scholarships" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user, updateUserProfile } = useAuth()

  const [currentStep, setCurrentStep] = useState(1)
  const [currentClass, setCurrentClass] = useState("")
  const [stream, setStream] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [goals, setGoals] = useState<string[]>([])
  const [preferredLocation, setPreferredLocation] = useState("")
  const [budgetRange, setBudgetRange] = useState("")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.profile?.completedOnboarding) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleGoalToggle = (goal: string) => {
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return currentClass && stream
      case 2:
        return interests.length > 0
      case 3:
        return goals.length > 0
      case 4:
        return preferredLocation && budgetRange
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    } else {
      updateUserProfile({
        currentClass,
        stream,
        interests,
        goals,
        preferredLocation,
        budgetRange,
        completedOnboarding: true,
        hasWatchedWelcomeVideo: false,
      })
      router.push("/welcome-video")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Compass className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PathFinder</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    currentStep >= step.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 md:w-32 h-1 mx-2 rounded ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            {steps.map((step) => (
              <span
                key={step.id}
                className={`${currentStep >= step.id ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">Let&apos;s understand you better to recommend the perfect career path</p>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && (
                <>
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Your Educational Background
                </>
              )}
              {currentStep === 2 && (
                <>
                  <Sparkles className="w-5 h-5 text-primary" />
                  What Interests You?
                </>
              )}
              {currentStep === 3 && (
                <>
                  <Target className="w-5 h-5 text-primary" />
                  Your Career Goals
                </>
              )}
              {currentStep === 4 && (
                <>
                  <MapPin className="w-5 h-5 text-primary" />
                  Your Preferences
                </>
              )}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about your current education level and stream"}
              {currentStep === 2 && "Select all the fields that excite you (choose at least one)"}
              {currentStep === 3 && "What do you want from your career? (select all that apply)"}
              {currentStep === 4 && "Help us recommend the right colleges and opportunities"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Education */}
            {currentStep === 1 && (
              <>
                <div className="space-y-4">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Current Class / Education Level
                  </Label>
                  <RadioGroup value={currentClass} onValueChange={setCurrentClass}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {classOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Stream / Subject Combination</Label>
                  <RadioGroup value={stream} onValueChange={setStream}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {streamOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3">
                          <RadioGroupItem value={option.value} id={`stream-${option.value}`} />
                          <Label htmlFor={`stream-${option.value}`} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}

            {/* Step 2: Interests */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {interestOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleInterestToggle(option.value)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        interests.includes(option.value)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Checkbox checked={interests.includes(option.value)} className="pointer-events-none" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  ))}
                </div>
                {interests.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {interests.length} interest{interests.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            )}

            {/* Step 3: Goals */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goalOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleGoalToggle(option.value)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        goals.includes(option.value)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Checkbox checked={goals.includes(option.value)} className="pointer-events-none" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  ))}
                </div>
                {goals.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {goals.length} goal{goals.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <>
                <div className="space-y-4">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Preferred Location for Studies
                  </Label>
                  <RadioGroup value={preferredLocation} onValueChange={setPreferredLocation}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {locationOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3">
                          <RadioGroupItem value={option.value} id={`loc-${option.value}`} />
                          <Label htmlFor={`loc-${option.value}`} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Budget for Education
                  </Label>
                  <RadioGroup value={budgetRange} onValueChange={setBudgetRange}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {budgetOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3">
                          <RadioGroupItem value={option.value} id={`budget-${option.value}`} />
                          <Label htmlFor={`budget-${option.value}`} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed()}>
            {currentStep === 4 ? "Complete Setup" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  )
}
