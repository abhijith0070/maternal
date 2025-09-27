"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, User, Bell, Settings, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  if (!user) {
    router.push('/auth/login')
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  // Using the same theme style as the main page
  const themeStyle = {
    ["--background" as any]: "oklch(0.985 0 0)",
    ["--foreground" as any]: "oklch(0.24 0.02 260)",
    ["--primary" as any]: "oklch(0.78 0.09 180)",
    ["--primary-foreground" as any]: "oklch(0.18 0.03 260)",
    ["--accent" as any]: "oklch(0.93 0.05 350)",
    ["--accent-foreground" as any]: "oklch(0.22 0.03 260)",
    ["--muted" as any]: "oklch(0.96 0 0)",
    ["--muted-foreground" as any]: "oklch(0.42 0.02 260)",
    ["--border" as any]: "oklch(0.92 0 0)",
    ["--ring" as any]: "oklch(0.82 0 0)",
  } as React.CSSProperties

  return (
    <main style={themeStyle} className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <header className="w-full border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/images/little-seed-logo.jpg"
              alt="Little Seed logo"
              width={32}
              height={32}
              className="rounded-none"
              priority
            />
            <span className="font-sans font-semibold text-lg">Little Seed</span>
          </div>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Welcome back, {user.firstName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your journey today.</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Reminders */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Today's Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-accent/50 rounded">
                  <span className="text-sm">Prenatal vitamin</span>
                  <Button size="sm" variant="outline">Done</Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-accent/50 rounded">
                  <span className="text-sm">Water intake (6/8 glasses)</span>
                  <Button size="sm" variant="outline">+1</Button>
                </div>
                <div className="flex items-center justify-between p-2 bg-accent/50 rounded">
                  <span className="text-sm">Doctor appointment - 3 PM</span>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Tracking */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Health Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Weekly Weight Goal</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hydration Goal</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[75%]"></div>
                  </div>
                </div>
                <Button className="w-full" variant="outline">Update Stats</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-auto py-3 px-2 flex flex-col gap-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-xs">Log Symptoms</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 px-2 flex flex-col gap-1">
                  <Bell className="h-4 w-4" />
                  <span className="text-xs">Set Reminder</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 px-2 flex flex-col gap-1">
                  <User className="h-4 w-4" />
                  <span className="text-xs">Contact Doctor</span>
                </Button>
                <Button variant="outline" size="sm" className="h-auto py-3 px-2 flex flex-col gap-1">
                  <Settings className="h-4 w-4" />
                  <span className="text-xs">View Profile</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <div>
                  <p className="font-medium">Completed prenatal vitamin</p>
                  <p className="text-sm text-muted-foreground">Today at 9:00 AM</p>
                </div>
                <div className="text-primary">✓</div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <div>
                  <p className="font-medium">Logged weight measurement</p>
                  <p className="text-sm text-muted-foreground">Yesterday at 7:30 AM</p>
                </div>
                <div className="text-primary">✓</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Updated family medical history</p>
                  <p className="text-sm text-muted-foreground">2 days ago</p>
                </div>
                <div className="text-primary">✓</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}