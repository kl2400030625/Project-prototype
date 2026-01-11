"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Compass,
  LogOut,
  Map,
  Briefcase,
  Building2,
  ExternalLink,
  Sparkles,
  Clock,
  FileText,
  File,
  Download,
  User,
  Video,
  PlayCircle,
  Star,
  Calendar,
} from "lucide-react"
import { useAuth, filterByUserProfile, TARGET_AUDIENCES } from "@/lib/auth-context"

export default function UserDashboard() {
  const router = useRouter()
  const { user, logout, roadmaps, careerOptions, internships, webinars } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else if (user.role === "admin") {
      router.push("/admin")
    } else if (!user.profile?.completedOnboarding) {
      router.push("/onboarding")
    } else if (!user.profile?.hasWatchedWelcomeVideo) {
      router.push("/welcome-video")
    }
  }, [user, router])

  const filteredRoadmaps = useMemo(() => filterByUserProfile(roadmaps, user?.profile), [roadmaps, user?.profile])

  const filteredCareers = useMemo(
    () => filterByUserProfile(careerOptions, user?.profile),
    [careerOptions, user?.profile],
  )

  const filteredInternships = useMemo(
    () => filterByUserProfile(internships, user?.profile),
    [internships, user?.profile],
  )

  const filteredWebinars = useMemo(() => filterByUserProfile(webinars, user?.profile), [webinars, user?.profile])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-4 h-4 text-red-500" />
    return <File className="w-4 h-4 text-blue-500" />
  }

  const getEmbedUrl = (url: string) => {
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/)
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`
    }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }
    return url
  }

  if (!user || user.role !== "user" || !user.profile?.completedOnboarding) {
    return null
  }

  const recentItems = [
    ...filteredRoadmaps.recommended.slice(0, 2).map((r) => ({ ...r, type: "roadmap" as const })),
    ...filteredCareers.recommended.slice(0, 2).map((c) => ({ ...c, type: "career" as const })),
    ...filteredInternships.recommended.slice(0, 2).map((i) => ({ ...i, type: "internship" as const })),
  ].slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Compass className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PathFinder</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {user.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Hello, {user.name}!</h1>
          <p className="text-muted-foreground">Explore career paths, find opportunities, and shape your future.</p>
        </div>

        {user.profile && (
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Education</p>
                  <p className="font-medium text-foreground capitalize">
                    {user.profile.currentClass.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Stream</p>
                  <p className="font-medium text-foreground capitalize">{user.profile.stream.replace(/-/g, " ")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Interests</p>
                  <p className="font-medium text-foreground">{user.profile.interests.length} selected</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Goals</p>
                  <p className="font-medium text-foreground">{user.profile.goals.length} selected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats - Updated to include webinars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Map className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredRoadmaps.recommended.length}</p>
                <p className="text-sm text-muted-foreground">Roadmaps For You</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-emerald-500/5 border-emerald-500/20">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredCareers.recommended.length}</p>
                <p className="text-sm text-muted-foreground">Careers For You</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/5 border-blue-500/20">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredInternships.recommended.length}</p>
                <p className="text-sm text-muted-foreground">Internships For You</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-purple-500/5 border-purple-500/20">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{filteredWebinars.recommended.length}</p>
                <p className="text-sm text-muted-foreground">Webinars For You</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Added - Recommended for you */}
        {recentItems.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-lg">Recommended For You</CardTitle>
              </div>
              <CardDescription>Personalized suggestions based on your interests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        item.type === "roadmap"
                          ? "bg-primary/10"
                          : item.type === "career"
                            ? "bg-emerald-500/10"
                            : "bg-blue-500/10"
                      }`}
                    >
                      {item.type === "roadmap" ? (
                        <Map className="w-4 h-4 text-primary" />
                      ) : item.type === "career" ? (
                        <Briefcase className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Building2 className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">
                        {item.type === "internship" ? (item as (typeof internships)[0]).role : item.title}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs - Updated to include webinars */}
        <Tabs defaultValue="roadmaps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-lg">
            <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="webinars">Webinars</TabsTrigger>
          </TabsList>

          {/* Roadmaps Tab */}
          <TabsContent value="roadmaps" className="space-y-6">
            {/* Recommended Roadmaps */}
            {filteredRoadmaps.recommended.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">Recommended For You</h3>
                </div>
                <div className="grid gap-4">
                  {filteredRoadmaps.recommended.map((roadmap) => (
                    <Card key={roadmap.id} className="hover:border-primary/50 transition-colors border-amber-500/30">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            {roadmap.category}
                          </span>
                          {roadmap.targetAudience?.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 bg-purple-500/10 text-purple-600 text-xs font-medium rounded-full"
                            >
                              {TARGET_AUDIENCES.find((a) => a.value === t)?.label}
                            </span>
                          ))}
                          {roadmap.attachments && roadmap.attachments.length > 0 && (
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-medium rounded-full">
                              {roadmap.attachments.length} resource{roadmap.attachments.length > 1 ? "s" : ""}
                            </span>
                          )}
                          {roadmap.videoUrl && (
                            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
                              <Video className="w-3 h-3" /> Video
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">{roadmap.title}</h3>
                        <p className="text-muted-foreground mb-4">{roadmap.description}</p>

                        {/* Video Embed */}
                        {roadmap.videoUrl && (
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                            <iframe
                              src={getEmbedUrl(roadmap.videoUrl)}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}

                        <div className="space-y-2 mb-4">
                          {roadmap.steps.map((step, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-primary">{i + 1}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">{step}</span>
                            </div>
                          ))}
                        </div>
                        {roadmap.attachments && roadmap.attachments.length > 0 && (
                          <div className="pt-4 border-t border-border">
                            <p className="text-sm font-medium text-foreground mb-3">Resources & Downloads:</p>
                            <div className="flex flex-wrap gap-2">
                              {roadmap.attachments.map((file) => (
                                <a
                                  key={file.id}
                                  href={file.url}
                                  download={file.name}
                                  className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg text-sm hover:bg-muted/80 transition-colors group"
                                >
                                  {getFileIcon(file.type)}
                                  <span className="truncate max-w-[150px]">{file.name}</span>
                                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other Roadmaps */}
            {filteredRoadmaps.other.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Other Roadmaps</h3>
                <div className="grid gap-4">
                  {filteredRoadmaps.other.map((roadmap) => (
                    <Card key={roadmap.id} className="hover:border-primary/50 transition-colors opacity-75">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            {roadmap.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">{roadmap.title}</h3>
                        <p className="text-muted-foreground">{roadmap.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {roadmaps.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Map className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-1">No roadmaps available yet</h3>
                  <p className="text-sm text-muted-foreground">Check back soon for career roadmaps</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers" className="space-y-6">
            {filteredCareers.recommended.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">Recommended For You</h3>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredCareers.recommended.map((career) => (
                    <Card key={career.id} className="hover:border-emerald-500/50 transition-colors border-amber-500/30">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-medium rounded-full">
                            {career.field}
                          </span>
                          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                            {career.avgSalary}
                          </span>
                          {career.videoUrl && (
                            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
                              <Video className="w-3 h-3" /> Video
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">{career.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{career.description}</p>

                        {career.videoUrl && (
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                            <iframe
                              src={getEmbedUrl(career.videoUrl)}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}

                        <div>
                          <p className="text-xs font-medium text-foreground mb-2">Requirements:</p>
                          <div className="flex flex-wrap gap-1">
                            {career.requirements.map((req, i) => (
                              <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                {req}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {filteredCareers.other.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Other Careers</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredCareers.other.map((career) => (
                    <Card key={career.id} className="hover:border-emerald-500/50 transition-colors opacity-75">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-medium rounded-full">
                            {career.field}
                          </span>
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-2">{career.title}</h3>
                        <p className="text-sm text-muted-foreground">{career.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {careerOptions.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Briefcase className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-1">No career options available yet</h3>
                  <p className="text-sm text-muted-foreground">Check back soon for career information</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Internships Tab */}
          <TabsContent value="internships" className="space-y-6">
            {filteredInternships.recommended.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">Recommended For You</h3>
                </div>
                <div className="grid gap-4">
                  {filteredInternships.recommended.map((internship) => (
                    <Card
                      key={internship.id}
                      className="hover:border-blue-500/50 transition-colors border-amber-500/30"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {internship.targetAudience?.map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-1 bg-purple-500/10 text-purple-600 text-xs font-medium rounded-full"
                                >
                                  {TARGET_AUDIENCES.find((a) => a.value === t)?.label}
                                </span>
                              ))}
                              {internship.videoUrl && (
                                <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
                                  <Video className="w-3 h-3" /> Video
                                </span>
                              )}
                            </div>
                            <h3 className="font-semibold text-foreground text-lg">{internship.role}</h3>
                            <p className="text-primary font-medium">{internship.company}</p>
                            <p className="text-sm text-muted-foreground mt-2">{internship.description}</p>

                            {internship.videoUrl && (
                              <div className="aspect-video bg-muted rounded-lg overflow-hidden my-4">
                                <iframe
                                  src={getEmbedUrl(internship.videoUrl)}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-4">
                              <span className="text-xs bg-muted px-3 py-1.5 rounded-full">{internship.location}</span>
                              <span className="text-xs bg-muted px-3 py-1.5 rounded-full">{internship.duration}</span>
                              <span className="text-xs bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-full font-medium">
                                {internship.stipend}
                              </span>
                            </div>
                          </div>
                          <a href={internship.applyLink} target="_blank" rel="noopener noreferrer">
                            <Button className="gap-2">
                              Apply Now
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {filteredInternships.other.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Other Internships</h3>
                <div className="grid gap-4">
                  {filteredInternships.other.map((internship) => (
                    <Card key={internship.id} className="hover:border-blue-500/50 transition-colors opacity-75">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-foreground text-lg">{internship.role}</h3>
                        <p className="text-primary font-medium">{internship.company}</p>
                        <p className="text-sm text-muted-foreground mt-2">{internship.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {internships.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Building2 className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-1">No internships available yet</h3>
                  <p className="text-sm text-muted-foreground">Check back soon for internship opportunities</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="webinars" className="space-y-6">
            {filteredWebinars.recommended.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold text-foreground">Recommended For You</h3>
                </div>
                <div className="grid gap-4">
                  {filteredWebinars.recommended.map((webinar) => (
                    <Card key={webinar.id} className="hover:border-purple-500/50 transition-colors border-amber-500/30">
                      <CardContent className="p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {webinar.isRecorded ? (
                            <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                              Recorded - Watch Anytime
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
                              <PlayCircle className="w-3 h-3" /> Live
                            </span>
                          )}
                          {webinar.targetAudience?.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 bg-purple-500/10 text-purple-600 text-xs font-medium rounded-full"
                            >
                              {TARGET_AUDIENCES.find((a) => a.value === t)?.label}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">{webinar.title}</h3>
                        <p className="text-primary font-medium">
                          {webinar.speaker} - {webinar.speakerTitle}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">{webinar.description}</p>

                        {webinar.videoUrl && webinar.isRecorded && (
                          <div className="aspect-video bg-muted rounded-lg overflow-hidden my-4">
                            <iframe
                              src={getEmbedUrl(webinar.videoUrl)}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mt-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {webinar.date} at {webinar.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {webinar.duration}
                          </div>
                        </div>

                        <div className="mt-4">
                          <a href={webinar.registrationLink} target="_blank" rel="noopener noreferrer">
                            <Button className="gap-2">
                              {webinar.isRecorded ? "Watch Recording" : "Register Now"}
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {filteredWebinars.other.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Other Webinars</h3>
                <div className="grid gap-4">
                  {filteredWebinars.other.map((webinar) => (
                    <Card key={webinar.id} className="hover:border-purple-500/50 transition-colors opacity-75">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-foreground text-lg">{webinar.title}</h3>
                        <p className="text-primary font-medium">{webinar.speaker}</p>
                        <p className="text-sm text-muted-foreground mt-2">{webinar.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {webinars.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Video className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium text-foreground mb-1">No webinars available yet</h3>
                  <p className="text-sm text-muted-foreground">Check back soon for upcoming webinars</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
