"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type UserRole = "admin" | "user" | null

export const TARGET_AUDIENCES = [
  { value: "engineering", label: "Engineering" },
  { value: "medicine", label: "Medicine & Healthcare" },
  { value: "commerce", label: "Commerce & Business" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "science", label: "Pure Sciences" },
  { value: "law", label: "Law" },
  { value: "design", label: "Design & Creative" },
  { value: "all", label: "All Students" },
] as const

export type TargetAudience = (typeof TARGET_AUDIENCES)[number]["value"]

export interface UserProfile {
  currentClass: string
  stream: string
  interests: string[]
  goals: string[]
  preferredLocation: string
  budgetRange: string
  completedOnboarding: boolean
  hasWatchedWelcomeVideo?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  profile?: UserProfile
}

export interface RoadmapAttachment {
  id: string
  name: string
  type: string
  url: string
  size: number
}

export interface Roadmap {
  id: string
  title: string
  category: string
  description: string
  steps: string[]
  attachments: RoadmapAttachment[]
  targetAudience: TargetAudience[]
  videoUrl?: string
  createdAt: Date
}

export interface CareerOption {
  id: string
  title: string
  field: string
  description: string
  avgSalary: string
  requirements: string[]
  targetAudience: TargetAudience[]
  videoUrl?: string
  createdAt: Date
}

export interface Internship {
  id: string
  company: string
  role: string
  location: string
  duration: string
  stipend: string
  description: string
  applyLink: string
  targetAudience: TargetAudience[]
  videoUrl?: string
  createdAt: Date
}

export interface Webinar {
  id: string
  title: string
  speaker: string
  speakerTitle: string
  description: string
  date: string
  time: string
  duration: string
  registrationLink: string
  targetAudience: TargetAudience[]
  videoUrl?: string
  isRecorded: boolean
  createdAt: Date
}

export interface WelcomeVideo {
  id: string
  domain: TargetAudience
  title: string
  description: string
  videoUrl: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: UserRole) => boolean
  logout: () => void
  signup: (name: string, email: string, password: string) => boolean
  updateUserProfile: (profile: UserProfile) => void
  roadmaps: Roadmap[]
  addRoadmap: (roadmap: Omit<Roadmap, "id" | "createdAt">) => void
  careerOptions: CareerOption[]
  addCareerOption: (option: Omit<CareerOption, "id" | "createdAt">) => void
  internships: Internship[]
  addInternship: (internship: Omit<Internship, "id" | "createdAt">) => void
  webinars: Webinar[]
  addWebinar: (webinar: Omit<Webinar, "id" | "createdAt">) => void
  welcomeVideos: WelcomeVideo[]
  addWelcomeVideo: (video: Omit<WelcomeVideo, "id" | "createdAt">) => void
  getWelcomeVideoForUser: () => WelcomeVideo | null
  markWelcomeVideoWatched: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_CREDENTIALS = {
  username: "admin@pathfinder.com",
  password: "admin123",
}

function mapInterestsToAudiences(interests: string[]): TargetAudience[] {
  const mapping: Record<string, TargetAudience> = {
    technology: "engineering",
    engineering: "engineering",
    medicine: "medicine",
    business: "commerce",
    finance: "commerce",
    design: "design",
    science: "science",
    law: "law",
    arts: "arts",
    media: "arts",
    education: "arts",
  }

  const audiences = new Set<TargetAudience>()
  interests.forEach((interest) => {
    if (mapping[interest]) {
      audiences.add(mapping[interest])
    }
  })
  return Array.from(audiences)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [careerOptions, setCareerOptions] = useState<CareerOption[]>([])
  const [internships, setInternships] = useState<Internship[]>([])
  const [webinars, setWebinars] = useState<Webinar[]>([])
  const [welcomeVideos, setWelcomeVideos] = useState<WelcomeVideo[]>([])

  useEffect(() => {
    const savedUser = localStorage.getItem("pathfinder_user")
    const savedRoadmaps = localStorage.getItem("pathfinder_roadmaps")
    const savedCareers = localStorage.getItem("pathfinder_careers")
    const savedInternships = localStorage.getItem("pathfinder_internships")
    const savedWebinars = localStorage.getItem("pathfinder_webinars")
    const savedWelcomeVideos = localStorage.getItem("pathfinder_welcome_videos")

    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedRoadmaps) setRoadmaps(JSON.parse(savedRoadmaps))
    if (savedCareers) setCareerOptions(JSON.parse(savedCareers))
    if (savedInternships) setInternships(JSON.parse(savedInternships))
    if (savedWebinars) setWebinars(JSON.parse(savedWebinars))
    if (savedWelcomeVideos) setWelcomeVideos(JSON.parse(savedWelcomeVideos))
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem("pathfinder_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("pathfinder_user")
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem("pathfinder_roadmaps", JSON.stringify(roadmaps))
  }, [roadmaps])

  useEffect(() => {
    localStorage.setItem("pathfinder_careers", JSON.stringify(careerOptions))
  }, [careerOptions])

  useEffect(() => {
    localStorage.setItem("pathfinder_internships", JSON.stringify(internships))
  }, [internships])

  useEffect(() => {
    localStorage.setItem("pathfinder_webinars", JSON.stringify(webinars))
  }, [webinars])

  useEffect(() => {
    localStorage.setItem("pathfinder_welcome_videos", JSON.stringify(welcomeVideos))
  }, [welcomeVideos])

  const login = (email: string, password: string, role: UserRole): boolean => {
    if (role === "admin") {
      if (email === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        setUser({
          id: "admin-1",
          name: "Admin",
          email: ADMIN_CREDENTIALS.username,
          role: "admin",
        })
        return true
      }
      return false
    }

    const savedUsers = JSON.parse(localStorage.getItem("pathfinder_users") || "[]")
    const foundUser = savedUsers.find(
      (u: { email: string; password: string }) => u.email === email && u.password === password,
    )

    if (foundUser) {
      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: "user",
        profile: foundUser.profile,
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
  }

  const signup = (name: string, email: string, password: string): boolean => {
    const savedUsers = JSON.parse(localStorage.getItem("pathfinder_users") || "[]")
    const exists = savedUsers.some((u: { email: string }) => u.email === email)

    if (exists) return false

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      profile: undefined,
    }

    savedUsers.push(newUser)
    localStorage.setItem("pathfinder_users", JSON.stringify(savedUsers))

    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: "user",
      profile: undefined,
    })
    return true
  }

  const updateUserProfile = (profile: UserProfile) => {
    if (!user) return

    const updatedUser = { ...user, profile }
    setUser(updatedUser)

    const savedUsers = JSON.parse(localStorage.getItem("pathfinder_users") || "[]")
    const userIndex = savedUsers.findIndex((u: { id: string }) => u.id === user.id)
    if (userIndex !== -1) {
      savedUsers[userIndex].profile = profile
      localStorage.setItem("pathfinder_users", JSON.stringify(savedUsers))
    }
  }

  const addRoadmap = (roadmap: Omit<Roadmap, "id" | "createdAt">) => {
    const newRoadmap: Roadmap = {
      ...roadmap,
      id: `roadmap-${Date.now()}`,
      createdAt: new Date(),
    }
    setRoadmaps((prev) => [newRoadmap, ...prev])
  }

  const addCareerOption = (option: Omit<CareerOption, "id" | "createdAt">) => {
    const newOption: CareerOption = {
      ...option,
      id: `career-${Date.now()}`,
      createdAt: new Date(),
    }
    setCareerOptions((prev) => [newOption, ...prev])
  }

  const addInternship = (internship: Omit<Internship, "id" | "createdAt">) => {
    const newInternship: Internship = {
      ...internship,
      id: `internship-${Date.now()}`,
      createdAt: new Date(),
    }
    setInternships((prev) => [newInternship, ...prev])
  }

  const addWebinar = (webinar: Omit<Webinar, "id" | "createdAt">) => {
    const newWebinar: Webinar = {
      ...webinar,
      id: `webinar-${Date.now()}`,
      createdAt: new Date(),
    }
    setWebinars((prev) => [newWebinar, ...prev])
  }

  const addWelcomeVideo = (video: Omit<WelcomeVideo, "id" | "createdAt">) => {
    // Replace existing video for the same domain
    setWelcomeVideos((prev) => {
      const filtered = prev.filter((v) => v.domain !== video.domain)
      return [...filtered, { ...video, id: `welcome-${Date.now()}`, createdAt: new Date() }]
    })
  }

  const getWelcomeVideoForUser = (): WelcomeVideo | null => {
    if (!user?.profile?.interests) return null

    const userAudiences = mapInterestsToAudiences(user.profile.interests)

    // Find a welcome video matching user's interests
    for (const audience of userAudiences) {
      const video = welcomeVideos.find((v) => v.domain === audience)
      if (video) return video
    }

    // Fallback to "all" video
    return welcomeVideos.find((v) => v.domain === "all") || null
  }

  const markWelcomeVideoWatched = () => {
    if (!user?.profile) return
    updateUserProfile({ ...user.profile, hasWatchedWelcomeVideo: true })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        updateUserProfile,
        roadmaps,
        addRoadmap,
        careerOptions,
        addCareerOption,
        internships,
        addInternship,
        webinars,
        addWebinar,
        welcomeVideos,
        addWelcomeVideo,
        getWelcomeVideoForUser,
        markWelcomeVideoWatched,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function filterByUserProfile<T extends { targetAudience?: TargetAudience[] }>(
  items: T[],
  userProfile?: UserProfile,
): { recommended: T[]; other: T[] } {
  if (!userProfile) return { recommended: items, other: [] }

  const userAudiences = mapInterestsToAudiences(userProfile.interests || [])

  const recommended: T[] = []
  const other: T[] = []

  items.forEach((item) => {
    const targetAudience = item.targetAudience || []

    // If no target audience specified, show to everyone (recommended)
    if (targetAudience.length === 0) {
      recommended.push(item)
      return
    }

    const isRecommended = targetAudience.includes("all") || targetAudience.some((t) => userAudiences.includes(t))

    if (isRecommended) {
      recommended.push(item)
    } else {
      other.push(item)
    }
  })

  return { recommended, other }
}
