"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, User, Shield, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { useAuth, type UserRole } from "@/lib/auth-context"

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = login(email, password, selectedRole)

    if (success) {
      if (selectedRole === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    } else {
      setError(selectedRole === "admin" ? "Invalid admin credentials" : "Invalid email or password")
    }

    setIsLoading(false)
  }

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Choose how you want to sign in</p>
          </div>

          <div className="grid gap-4">
            <Card
              className="cursor-pointer hover:border-primary transition-colors group"
              onClick={() => setSelectedRole("user")}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Student Login</h3>
                  <p className="text-sm text-muted-foreground">Access your dashboard and explore career paths</p>
                </div>
              </CardContent>
            </Card>

            <Card
              className="cursor-pointer hover:border-primary transition-colors group"
              onClick={() => setSelectedRole("admin")}
            >
              <CardContent className="flex items-center gap-4 p-6">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Admin Login</h3>
                  <p className="text-sm text-muted-foreground">Manage roadmaps, careers, and internships</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <p className="text-center mt-8 text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => setSelectedRole(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to role selection
        </button>

        <Card>
          <CardHeader className="text-center">
            <div
              className={`w-12 h-12 rounded-xl ${selectedRole === "admin" ? "bg-amber-500/10" : "bg-primary/10"} flex items-center justify-center mx-auto mb-2`}
            >
              {selectedRole === "admin" ? (
                <Shield className="w-6 h-6 text-amber-500" />
              ) : (
                <User className="w-6 h-6 text-primary" />
              )}
            </div>
            <CardTitle>{selectedRole === "admin" ? "Admin Login" : "Student Login"}</CardTitle>
            <CardDescription>
              {selectedRole === "admin"
                ? "Enter your admin credentials to continue"
                : "Enter your email and password to access your dashboard"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={selectedRole === "admin" ? "admin@pathfinder.com" : "you@example.com"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              {selectedRole === "admin" && (
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Demo credentials: admin@pathfinder.com / admin123
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
