"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, PlayCircle, SkipForward, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function WelcomeVideoPage() {
  const router = useRouter()
  const { user, getWelcomeVideoForUser, markWelcomeVideoWatched } = useAuth()
  const [welcomeVideo, setWelcomeVideo] = useState<ReturnType<typeof getWelcomeVideoForUser>>(null)
  const [videoWatched, setVideoWatched] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role === "admin") {
      router.push("/admin")
      return
    }

    if (!user.profile?.completedOnboarding) {
      router.push("/onboarding")
      return
    }

    // If already watched, go to dashboard
    if (user.profile?.hasWatchedWelcomeVideo) {
      router.push("/dashboard")
      return
    }

    const video = getWelcomeVideoForUser()
    setWelcomeVideo(video)

    // If no welcome video available, skip to dashboard
    if (!video) {
      markWelcomeVideoWatched()
      router.push("/dashboard")
    }
  }, [user, router, getWelcomeVideoForUser, markWelcomeVideoWatched])

  const handleContinue = () => {
    markWelcomeVideoWatched()
    router.push("/dashboard")
  }

  const handleSkip = () => {
    markWelcomeVideoWatched()
    router.push("/dashboard")
  }

  // Extract video ID for embedding
  const getEmbedUrl = (url: string) => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }
    // Return original URL for direct video links
    return url
  }

  if (!user || !welcomeVideo) return null

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
        {/* Welcome Message */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <PlayCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Your Career Journey!</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Watch this quick video to understand how PathFinder can help you achieve your career goals.
          </p>
        </div>

        {/* Video Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{welcomeVideo.title}</CardTitle>
            <CardDescription>{welcomeVideo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Video Embed */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
              {welcomeVideo.videoUrl.includes("youtube") || welcomeVideo.videoUrl.includes("vimeo") ? (
                <iframe
                  src={getEmbedUrl(welcomeVideo.videoUrl)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setVideoWatched(true)}
                />
              ) : (
                <video
                  src={welcomeVideo.videoUrl}
                  controls
                  className="w-full h-full"
                  onPlay={() => setVideoWatched(true)}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {videoWatched && (
              <div className="flex items-center gap-2 text-emerald-600 mb-4">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Video started! You can continue whenever you&apos;re ready.</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={handleContinue}>
            Continue to Dashboard
          </Button>
          <Button variant="ghost" size="lg" onClick={handleSkip}>
            <SkipForward className="w-4 h-4 mr-2" />
            Skip for now
          </Button>
        </div>
      </main>
    </div>
  )
}
