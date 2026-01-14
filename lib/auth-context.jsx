"use client"

import { createContext, useContext, useState, useEffect } from "react"

export const TARGET_AUDIENCES = [
  { value: "engineering", label: "Engineering" },
  { value: "medicine", label: "Medicine & Healthcare" },
  { value: "commerce", label: "Commerce & Business" },
  { value: "arts", label: "Arts & Humanities" },
  { value: "science", label: "Pure Sciences" },
  { value: "law", label: "Law" },
  { value: "design", label: "Design & Creative" },
  { value: "all", label: "All Students" },
]

const AuthContext = createContext(undefined)

const ADMIN_CREDENTIALS = {
  username: "admin@pathfinder.com",
  password: "admin123",
}

function mapInterestsToAudiences(interests) {
  const mapping = {
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

  const audiences = new Set()
  interests.forEach((interest) => {
    if (mapping[interest]) {
      audiences.add(mapping[interest])
    }
  })
  return Array.from(audiences)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [roadmaps, setRoadmaps] = useState([])
  const [careerOptions, setCareerOptions] = useState([])
  const [internships, setInternships] = useState([])
  const [webinars, setWebinars] = useState([])
  const [welcomeVideos, setWelcomeVideos] = useState([])

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

  const login = (email, password, role) => {
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
      (u) => u.email === email && u.password === password,
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

  const signup = (name, email, password) => {
    const savedUsers = JSON.parse(localStorage.getItem("pathfinder_users") || "[]")
    const exists = savedUsers.some((u) => u.email === email)

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

  const updateUserProfile = (profile) => {
    if (!user) return

    const updatedUser = { ...user, profile }
    setUser(updatedUser)

    const savedUsers = JSON.parse(localStorage.getItem("pathfinder_users") || "[]")
    const userIndex = savedUsers.findIndex((u) => u.id === user.id)
    if (userIndex !== -1) {
      savedUsers[userIndex].profile = profile
      localStorage.setItem("pathfinder_users", JSON.stringify(savedUsers))
    }
  }

  const addRoadmap = (roadmap) => {
    const newRoadmap = {
      ...roadmap,
      id: `roadmap-${Date.now()}`,
      createdAt: new Date(),
    }
    setRoadmaps((prev) => [newRoadmap, ...prev])
  }

  const addCareerOption = (option) => {
    const newOption = {
      ...option,
      id: `career-${Date.now()}`,
      createdAt: new Date(),
    }
    setCareerOptions((prev) => [newOption, ...prev])
  }

  const addInternship = (internship) => {
    const newInternship = {
      ...internship,
      id: `internship-${Date.now()}`,
      createdAt: new Date(),
    }
    setInternships((prev) => [newInternship, ...prev])
  }

  const addWebinar = (webinar) => {
    const newWebinar = {
      ...webinar,
      id: `webinar-${Date.now()}`,
      createdAt: new Date(),
    }
    setWebinars((prev) => [newWebinar, ...prev])
  }

  const addWelcomeVideo = (video) => {
    // Replace existing video for the same domain
    setWelcomeVideos((prev) => {
      const filtered = prev.filter((v) => v.domain !== video.domain)
      return [...filtered, { ...video, id: `welcome-${Date.now()}`, createdAt: new Date() }]
    })
  }

  const getWelcomeVideoForUser = () => {
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

export function filterByUserProfile(items, userProfile) {
  if (!userProfile) return { recommended: items, other: [] }

  const userAudiences = mapInterestsToAudiences(userProfile.interests || [])

  const recommended = []
  const other = []

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
