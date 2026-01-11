"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Compass,
  LogOut,
  Map,
  Briefcase,
  Building2,
  Plus,
  X,
  ChevronRight,
  Upload,
  FileText,
  File,
  Trash2,
  Video,
  Users,
  PlayCircle,
} from "lucide-react"
import { useAuth, TARGET_AUDIENCES, type RoadmapAttachment, type TargetAudience } from "@/lib/auth-context"

export default function AdminDashboard() {
  const router = useRouter()
  const {
    user,
    logout,
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
  } = useAuth()

  const [showRoadmapForm, setShowRoadmapForm] = useState(false)
  const [showCareerForm, setShowCareerForm] = useState(false)
  const [showInternshipForm, setShowInternshipForm] = useState(false)
  const [showWebinarForm, setShowWebinarForm] = useState(false)
  const [showWelcomeVideoForm, setShowWelcomeVideoForm] = useState(false)

  // Roadmap form state
  const [roadmapTitle, setRoadmapTitle] = useState("")
  const [roadmapCategory, setRoadmapCategory] = useState("")
  const [roadmapDescription, setRoadmapDescription] = useState("")
  const [roadmapSteps, setRoadmapSteps] = useState("")
  const [roadmapAttachments, setRoadmapAttachments] = useState<RoadmapAttachment[]>([])
  const [roadmapTargetAudience, setRoadmapTargetAudience] = useState<TargetAudience[]>([])
  const [roadmapVideoUrl, setRoadmapVideoUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Career form state
  const [careerTitle, setCareerTitle] = useState("")
  const [careerField, setCareerField] = useState("")
  const [careerDescription, setCareerDescription] = useState("")
  const [careerSalary, setCareerSalary] = useState("")
  const [careerRequirements, setCareerRequirements] = useState("")
  const [careerTargetAudience, setCareerTargetAudience] = useState<TargetAudience[]>([])
  const [careerVideoUrl, setCareerVideoUrl] = useState("")

  // Internship form state
  const [internCompany, setInternCompany] = useState("")
  const [internRole, setInternRole] = useState("")
  const [internLocation, setInternLocation] = useState("")
  const [internDuration, setInternDuration] = useState("")
  const [internStipend, setInternStipend] = useState("")
  const [internDescription, setInternDescription] = useState("")
  const [internApplyLink, setInternApplyLink] = useState("")
  const [internTargetAudience, setInternTargetAudience] = useState<TargetAudience[]>([])
  const [internVideoUrl, setInternVideoUrl] = useState("")

  // Webinar form state
  const [webinarTitle, setWebinarTitle] = useState("")
  const [webinarSpeaker, setWebinarSpeaker] = useState("")
  const [webinarSpeakerTitle, setWebinarSpeakerTitle] = useState("")
  const [webinarDescription, setWebinarDescription] = useState("")
  const [webinarDate, setWebinarDate] = useState("")
  const [webinarTime, setWebinarTime] = useState("")
  const [webinarDuration, setWebinarDuration] = useState("")
  const [webinarRegLink, setWebinarRegLink] = useState("")
  const [webinarTargetAudience, setWebinarTargetAudience] = useState<TargetAudience[]>([])
  const [webinarVideoUrl, setWebinarVideoUrl] = useState("")
  const [webinarIsRecorded, setWebinarIsRecorded] = useState(false)

  // Welcome video form state
  const [welcomeVideoDomain, setWelcomeVideoDomain] = useState<TargetAudience>("all")
  const [welcomeVideoTitle, setWelcomeVideoTitle] = useState("")
  const [welcomeVideoDescription, setWelcomeVideoDescription] = useState("")
  const [welcomeVideoUrl, setWelcomeVideoUrl] = useState("")

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/login")
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Target audience toggle helper
  const toggleTargetAudience = (
    audience: TargetAudience,
    currentAudiences: TargetAudience[],
    setAudiences: React.Dispatch<React.SetStateAction<TargetAudience[]>>,
  ) => {
    setAudiences((prev) => (prev.includes(audience) ? prev.filter((a) => a !== audience) : [...prev, audience]))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const fakeUrl = URL.createObjectURL(file)
      const attachment: RoadmapAttachment = {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        url: fakeUrl,
        size: file.size,
      }
      setRoadmapAttachments((prev) => [...prev, attachment])
    })

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeAttachment = (id: string) => {
    setRoadmapAttachments((prev) => prev.filter((att) => att.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="w-4 h-4 text-red-500" />
    return <File className="w-4 h-4 text-blue-500" />
  }

  const handleAddRoadmap = (e: React.FormEvent) => {
    e.preventDefault()
    addRoadmap({
      title: roadmapTitle,
      category: roadmapCategory,
      description: roadmapDescription,
      steps: roadmapSteps.split("\n").filter((s) => s.trim()),
      attachments: roadmapAttachments,
      targetAudience: roadmapTargetAudience.length > 0 ? roadmapTargetAudience : ["all"],
      videoUrl: roadmapVideoUrl || undefined,
    })
    setRoadmapTitle("")
    setRoadmapCategory("")
    setRoadmapDescription("")
    setRoadmapSteps("")
    setRoadmapAttachments([])
    setRoadmapTargetAudience([])
    setRoadmapVideoUrl("")
    setShowRoadmapForm(false)
  }

  const handleAddCareer = (e: React.FormEvent) => {
    e.preventDefault()
    addCareerOption({
      title: careerTitle,
      field: careerField,
      description: careerDescription,
      avgSalary: careerSalary,
      requirements: careerRequirements.split("\n").filter((s) => s.trim()),
      targetAudience: careerTargetAudience.length > 0 ? careerTargetAudience : ["all"],
      videoUrl: careerVideoUrl || undefined,
    })
    setCareerTitle("")
    setCareerField("")
    setCareerDescription("")
    setCareerSalary("")
    setCareerRequirements("")
    setCareerTargetAudience([])
    setCareerVideoUrl("")
    setShowCareerForm(false)
  }

  const handleAddInternship = (e: React.FormEvent) => {
    e.preventDefault()
    addInternship({
      company: internCompany,
      role: internRole,
      location: internLocation,
      duration: internDuration,
      stipend: internStipend,
      description: internDescription,
      applyLink: internApplyLink,
      targetAudience: internTargetAudience.length > 0 ? internTargetAudience : ["all"],
      videoUrl: internVideoUrl || undefined,
    })
    setInternCompany("")
    setInternRole("")
    setInternLocation("")
    setInternDuration("")
    setInternStipend("")
    setInternDescription("")
    setInternApplyLink("")
    setInternTargetAudience([])
    setInternVideoUrl("")
    setShowInternshipForm(false)
  }

  const handleAddWebinar = (e: React.FormEvent) => {
    e.preventDefault()
    addWebinar({
      title: webinarTitle,
      speaker: webinarSpeaker,
      speakerTitle: webinarSpeakerTitle,
      description: webinarDescription,
      date: webinarDate,
      time: webinarTime,
      duration: webinarDuration,
      registrationLink: webinarRegLink,
      targetAudience: webinarTargetAudience.length > 0 ? webinarTargetAudience : ["all"],
      videoUrl: webinarVideoUrl || undefined,
      isRecorded: webinarIsRecorded,
    })
    setWebinarTitle("")
    setWebinarSpeaker("")
    setWebinarSpeakerTitle("")
    setWebinarDescription("")
    setWebinarDate("")
    setWebinarTime("")
    setWebinarDuration("")
    setWebinarRegLink("")
    setWebinarTargetAudience([])
    setWebinarVideoUrl("")
    setWebinarIsRecorded(false)
    setShowWebinarForm(false)
  }

  const handleAddWelcomeVideo = (e: React.FormEvent) => {
    e.preventDefault()
    addWelcomeVideo({
      domain: welcomeVideoDomain,
      title: welcomeVideoTitle,
      description: welcomeVideoDescription,
      videoUrl: welcomeVideoUrl,
    })
    setWelcomeVideoDomain("all")
    setWelcomeVideoTitle("")
    setWelcomeVideoDescription("")
    setWelcomeVideoUrl("")
    setShowWelcomeVideoForm(false)
  }

  const TargetAudienceSelector = ({
    selected,
    onChange,
  }: {
    selected: TargetAudience[]
    onChange: (audience: TargetAudience) => void
  }) => (
    <div className="space-y-3">
      <Label className="flex items-center gap-2">
        <Users className="w-4 h-4" />
        Target Audience (select all that apply)
      </Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {TARGET_AUDIENCES.map((audience) => (
          <div
            key={audience.value}
            onClick={() => onChange(audience.value)}
            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
              selected.includes(audience.value)
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Checkbox checked={selected.includes(audience.value)} className="pointer-events-none" />
            <span className="text-sm">{audience.label}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const VideoUrlInput = ({
    value,
    onChange,
    label = "Video URL (Optional)",
  }: {
    value: string
    onChange: (value: string) => void
    label?: string
  }) => (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Video className="w-4 h-4" />
        {label}
      </Label>
      <Input
        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-muted-foreground">Supports YouTube, Vimeo, or direct video links</p>
    </div>
  )

  if (!user || user.role !== "admin") {
    return null
  }

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
              <span className="ml-2 px-2 py-1 bg-amber-500/10 text-amber-600 text-xs font-medium rounded-full">
                Admin
              </span>
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
        {/* Stats - Updated to include webinars and welcome videos */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Map className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{roadmaps.length}</p>
                <p className="text-sm text-muted-foreground">Roadmaps</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{careerOptions.length}</p>
                <p className="text-sm text-muted-foreground">Careers</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{internships.length}</p>
                <p className="text-sm text-muted-foreground">Internships</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{webinars.length}</p>
                <p className="text-sm text-muted-foreground">Webinars</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <PlayCircle className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{welcomeVideos.length}</p>
                <p className="text-sm text-muted-foreground">Welcome Videos</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs - Updated to include webinars and welcome videos */}
        <Tabs defaultValue="roadmaps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl">
            <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="webinars">Webinars</TabsTrigger>
            <TabsTrigger value="welcome">Welcome Videos</TabsTrigger>
          </TabsList>

          {/* Roadmaps Tab */}
          <TabsContent value="roadmaps" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Career Roadmaps</h2>
              <Button onClick={() => setShowRoadmapForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Roadmap
              </Button>
            </div>

            {showRoadmapForm && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Add New Roadmap</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowRoadmapForm(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddRoadmap} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="roadmapTitle">Title</Label>
                        <Input
                          id="roadmapTitle"
                          placeholder="e.g., Software Engineering Path"
                          value={roadmapTitle}
                          onChange={(e) => setRoadmapTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="roadmapCategory">Category</Label>
                        <Input
                          id="roadmapCategory"
                          placeholder="e.g., Science, Commerce, Arts"
                          value={roadmapCategory}
                          onChange={(e) => setRoadmapCategory(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roadmapDescription">Description</Label>
                      <Textarea
                        id="roadmapDescription"
                        placeholder="Brief description of this career path..."
                        value={roadmapDescription}
                        onChange={(e) => setRoadmapDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roadmapSteps">Steps (one per line)</Label>
                      <Textarea
                        id="roadmapSteps"
                        placeholder="Step 1: Complete 12th with PCM&#10;Step 2: Prepare for JEE/entrance exams&#10;Step 3: Join B.Tech/B.E program"
                        className="min-h-[120px]"
                        value={roadmapSteps}
                        onChange={(e) => setRoadmapSteps(e.target.value)}
                        required
                      />
                    </div>

                    <TargetAudienceSelector
                      selected={roadmapTargetAudience}
                      onChange={(audience) =>
                        toggleTargetAudience(audience, roadmapTargetAudience, setRoadmapTargetAudience)
                      }
                    />

                    <VideoUrlInput value={roadmapVideoUrl} onChange={setRoadmapVideoUrl} />

                    <div className="space-y-3">
                      <Label>Attachments (PDFs, Documents)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            PDF, DOC, DOCX, PPT, XLS, TXT (Max 10MB each)
                          </p>
                        </label>
                      </div>

                      {roadmapAttachments.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">
                            Uploaded Files ({roadmapAttachments.length})
                          </p>
                          <div className="space-y-2">
                            {roadmapAttachments.map((file) => (
                              <div
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  {getFileIcon(file.type)}
                                  <div>
                                    <p className="text-sm font-medium text-foreground truncate max-w-[200px] sm:max-w-[300px]">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeAttachment(file.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button type="submit">Add Roadmap</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {roadmaps.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Map className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-1">No roadmaps yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Click &quot;Add Roadmap&quot; to create your first career roadmap
                    </p>
                  </CardContent>
                </Card>
              ) : (
                roadmaps.map((roadmap) => (
                  <Card key={roadmap.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
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
                                {roadmap.attachments.length} file{roadmap.attachments.length > 1 ? "s" : ""}
                              </span>
                            )}
                            {roadmap.videoUrl && (
                              <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
                                <Video className="w-3 h-3" /> Video
                              </span>
                            )}
                          </div>
                          <h3 className="font-semibold text-foreground mb-1">{roadmap.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{roadmap.description}</p>
                          <div className="space-y-2">
                            {roadmap.steps.slice(0, 3).map((step, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <ChevronRight className="w-4 h-4 text-primary" />
                                <span className="text-muted-foreground">{step}</span>
                              </div>
                            ))}
                            {roadmap.steps.length > 3 && (
                              <p className="text-xs text-muted-foreground ml-6">
                                +{roadmap.steps.length - 3} more steps
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Careers Tab */}
          <TabsContent value="careers" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Career Options</h2>
              <Button onClick={() => setShowCareerForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Career
              </Button>
            </div>

            {showCareerForm && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Add New Career Option</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowCareerForm(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddCareer} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="careerTitle">Job Title</Label>
                        <Input
                          id="careerTitle"
                          placeholder="e.g., Software Developer"
                          value={careerTitle}
                          onChange={(e) => setCareerTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="careerField">Field</Label>
                        <Input
                          id="careerField"
                          placeholder="e.g., Technology, Healthcare"
                          value={careerField}
                          onChange={(e) => setCareerField(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="careerDescription">Description</Label>
                      <Textarea
                        id="careerDescription"
                        placeholder="What does this job involve..."
                        value={careerDescription}
                        onChange={(e) => setCareerDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="careerSalary">Average Salary</Label>
                      <Input
                        id="careerSalary"
                        placeholder="e.g., ₹6-15 LPA"
                        value={careerSalary}
                        onChange={(e) => setCareerSalary(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="careerRequirements">Requirements (one per line)</Label>
                      <Textarea
                        id="careerRequirements"
                        placeholder="B.Tech in CS/IT&#10;Problem solving skills&#10;Knowledge of programming"
                        value={careerRequirements}
                        onChange={(e) => setCareerRequirements(e.target.value)}
                        required
                      />
                    </div>

                    <TargetAudienceSelector
                      selected={careerTargetAudience}
                      onChange={(audience) =>
                        toggleTargetAudience(audience, careerTargetAudience, setCareerTargetAudience)
                      }
                    />
                    <VideoUrlInput value={careerVideoUrl} onChange={setCareerVideoUrl} />

                    <Button type="submit">Add Career</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {careerOptions.length === 0 ? (
                <Card className="border-dashed md:col-span-2">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Briefcase className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-1">No career options yet</h3>
                    <p className="text-sm text-muted-foreground">Add career options for students to explore</p>
                  </CardContent>
                </Card>
              ) : (
                careerOptions.map((career) => (
                  <Card key={career.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 text-xs font-medium rounded-full">
                          {career.field}
                        </span>
                        {career.targetAudience?.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 bg-purple-500/10 text-purple-600 text-xs font-medium rounded-full"
                          >
                            {TARGET_AUDIENCES.find((a) => a.value === t)?.label}
                          </span>
                        ))}
                        {career.videoUrl && (
                          <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-medium rounded-full flex items-center gap-1">
                            <Video className="w-3 h-3" /> Video
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground">{career.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{career.description}</p>
                      <p className="text-sm font-medium text-primary mt-2">{career.avgSalary}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Internships Tab */}
          <TabsContent value="internships" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Internship Opportunities</h2>
              <Button onClick={() => setShowInternshipForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Internship
              </Button>
            </div>

            {showInternshipForm && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Add New Internship</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowInternshipForm(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddInternship} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="internCompany">Company Name</Label>
                        <Input
                          id="internCompany"
                          placeholder="e.g., Google, TCS"
                          value={internCompany}
                          onChange={(e) => setInternCompany(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="internRole">Role</Label>
                        <Input
                          id="internRole"
                          placeholder="e.g., Software Intern"
                          value={internRole}
                          onChange={(e) => setInternRole(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="internLocation">Location</Label>
                        <Input
                          id="internLocation"
                          placeholder="e.g., Bangalore, Remote"
                          value={internLocation}
                          onChange={(e) => setInternLocation(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="internDuration">Duration</Label>
                        <Input
                          id="internDuration"
                          placeholder="e.g., 3 months"
                          value={internDuration}
                          onChange={(e) => setInternDuration(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="internStipend">Stipend</Label>
                        <Input
                          id="internStipend"
                          placeholder="e.g., ₹25,000/month"
                          value={internStipend}
                          onChange={(e) => setInternStipend(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="internDescription">Description</Label>
                      <Textarea
                        id="internDescription"
                        placeholder="Job responsibilities and requirements..."
                        value={internDescription}
                        onChange={(e) => setInternDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="internApplyLink">Apply Link</Label>
                      <Input
                        id="internApplyLink"
                        placeholder="https://..."
                        value={internApplyLink}
                        onChange={(e) => setInternApplyLink(e.target.value)}
                        required
                      />
                    </div>

                    <TargetAudienceSelector
                      selected={internTargetAudience}
                      onChange={(audience) =>
                        toggleTargetAudience(audience, internTargetAudience, setInternTargetAudience)
                      }
                    />
                    <VideoUrlInput value={internVideoUrl} onChange={setInternVideoUrl} />

                    <Button type="submit">Add Internship</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {internships.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Building2 className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-1">No internships yet</h3>
                    <p className="text-sm text-muted-foreground">Add internship opportunities for students</p>
                  </CardContent>
                </Card>
              ) : (
                internships.map((internship) => (
                  <Card key={internship.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-600 text-xs font-medium rounded-full">
                          {internship.location}
                        </span>
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
                      <h3 className="font-semibold text-foreground">{internship.role}</h3>
                      <p className="text-primary font-medium">{internship.company}</p>
                      <p className="text-sm text-muted-foreground mt-1">{internship.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-muted px-2 py-1 rounded">{internship.duration}</span>
                        <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-1 rounded">
                          {internship.stipend}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="webinars" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Webinars</h2>
              <Button onClick={() => setShowWebinarForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Webinar
              </Button>
            </div>

            {showWebinarForm && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Add New Webinar</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowWebinarForm(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddWebinar} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="webinarTitle">Webinar Title</Label>
                      <Input
                        id="webinarTitle"
                        placeholder="e.g., How to Crack IIT-JEE in First Attempt"
                        value={webinarTitle}
                        onChange={(e) => setWebinarTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="webinarSpeaker">Speaker Name</Label>
                        <Input
                          id="webinarSpeaker"
                          placeholder="e.g., Dr. Rajesh Kumar"
                          value={webinarSpeaker}
                          onChange={(e) => setWebinarSpeaker(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="webinarSpeakerTitle">Speaker Title/Designation</Label>
                        <Input
                          id="webinarSpeakerTitle"
                          placeholder="e.g., IIT Delhi Professor"
                          value={webinarSpeakerTitle}
                          onChange={(e) => setWebinarSpeakerTitle(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webinarDescription">Description</Label>
                      <Textarea
                        id="webinarDescription"
                        placeholder="What will be covered in this webinar..."
                        value={webinarDescription}
                        onChange={(e) => setWebinarDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="webinarDate">Date</Label>
                        <Input
                          id="webinarDate"
                          type="date"
                          value={webinarDate}
                          onChange={(e) => setWebinarDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="webinarTime">Time</Label>
                        <Input
                          id="webinarTime"
                          type="time"
                          value={webinarTime}
                          onChange={(e) => setWebinarTime(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="webinarDuration">Duration</Label>
                        <Input
                          id="webinarDuration"
                          placeholder="e.g., 1 hour"
                          value={webinarDuration}
                          onChange={(e) => setWebinarDuration(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="webinarRegLink">Registration Link</Label>
                      <Input
                        id="webinarRegLink"
                        placeholder="https://zoom.us/..."
                        value={webinarRegLink}
                        onChange={(e) => setWebinarRegLink(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                      <Checkbox
                        id="webinarIsRecorded"
                        checked={webinarIsRecorded}
                        onCheckedChange={(checked) => setWebinarIsRecorded(checked as boolean)}
                      />
                      <Label htmlFor="webinarIsRecorded" className="cursor-pointer">
                        This is a recorded webinar (not live)
                      </Label>
                    </div>

                    <TargetAudienceSelector
                      selected={webinarTargetAudience}
                      onChange={(audience) =>
                        toggleTargetAudience(audience, webinarTargetAudience, setWebinarTargetAudience)
                      }
                    />
                    <VideoUrlInput
                      value={webinarVideoUrl}
                      onChange={setWebinarVideoUrl}
                      label="Webinar Recording URL (for recorded webinars)"
                    />

                    <Button type="submit">Add Webinar</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {webinars.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Video className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-1">No webinars yet</h3>
                    <p className="text-sm text-muted-foreground">Add webinars to help students learn from experts</p>
                  </CardContent>
                </Card>
              ) : (
                webinars.map((webinar) => (
                  <Card key={webinar.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {webinar.isRecorded ? (
                          <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs font-medium rounded-full">
                            Recorded
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-red-500/10 text-red-600 text-xs font-medium rounded-full">
                            Live
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
                      <h3 className="font-semibold text-foreground">{webinar.title}</h3>
                      <p className="text-primary font-medium">
                        {webinar.speaker} - {webinar.speakerTitle}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{webinar.description}</p>
                      <div className="flex gap-2 mt-3">
                        <span className="text-xs bg-muted px-2 py-1 rounded">{webinar.date}</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded">{webinar.time}</span>
                        <span className="text-xs bg-muted px-2 py-1 rounded">{webinar.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="welcome" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Welcome Videos</h2>
                <p className="text-sm text-muted-foreground">Domain-specific videos shown to new users after signup</p>
              </div>
              <Button onClick={() => setShowWelcomeVideoForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Welcome Video
              </Button>
            </div>

            {showWelcomeVideoForm && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Add Welcome Video</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setShowWelcomeVideoForm(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddWelcomeVideo} className="space-y-4">
                    <div className="space-y-3">
                      <Label>Target Domain</Label>
                      <p className="text-xs text-muted-foreground">
                        This video will be shown to students who selected this domain in their interests
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {TARGET_AUDIENCES.map((audience) => (
                          <div
                            key={audience.value}
                            onClick={() => setWelcomeVideoDomain(audience.value)}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                              welcomeVideoDomain === audience.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50"
                            }`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${welcomeVideoDomain === audience.value ? "bg-primary" : "bg-muted"}`}
                            />
                            <span className="text-sm">{audience.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="welcomeVideoTitle">Video Title</Label>
                      <Input
                        id="welcomeVideoTitle"
                        placeholder="e.g., Welcome to Engineering Career Path"
                        value={welcomeVideoTitle}
                        onChange={(e) => setWelcomeVideoTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="welcomeVideoDescription">Description</Label>
                      <Textarea
                        id="welcomeVideoDescription"
                        placeholder="Brief overview of what this video covers..."
                        value={welcomeVideoDescription}
                        onChange={(e) => setWelcomeVideoDescription(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="welcomeVideoUrl" className="flex items-center gap-2">
                        <Video className="w-4 h-4" />
                        Video URL (Required)
                      </Label>
                      <Input
                        id="welcomeVideoUrl"
                        placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                        value={welcomeVideoUrl}
                        onChange={(e) => setWelcomeVideoUrl(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit">Add Welcome Video</Button>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {welcomeVideos.length === 0 ? (
                <Card className="border-dashed md:col-span-2">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <PlayCircle className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-1">No welcome videos yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Add welcome videos for each domain to greet new users
                    </p>
                  </CardContent>
                </Card>
              ) : (
                welcomeVideos.map((video) => (
                  <Card key={video.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-orange-500/10 text-orange-600 text-xs font-medium rounded-full">
                          {TARGET_AUDIENCES.find((a) => a.value === video.domain)?.label}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                      <a
                        href={video.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline mt-2 flex items-center gap-1"
                      >
                        <PlayCircle className="w-4 h-4" /> Watch Video
                      </a>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
