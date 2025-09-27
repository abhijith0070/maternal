"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, File as Family, Utensils, Syringe, Droplets, Bot, Car, User, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import ChatbotWidget from "@/components/chatbot-widget"
import FeatureCard from "@/components/feature-card"

export default function HomePage() {
  const { user, logout } = useAuth()
  
  // Local, page-scoped semantic token overrides for a warm, caring palette:
  // Colors: primary (soft teal), accent (pastel pink), background (off-white), foreground (charcoal)
  // Keeping to 4 total colors + muted neutral derived from foreground.
  const themeStyle = {
    // background and text
    ["--background" as any]: "oklch(0.985 0 0)", // off-white
    ["--foreground" as any]: "oklch(0.24 0.02 260)", // charcoal gray
    // primary teal and readable foreground on it
    ["--primary" as any]: "oklch(0.78 0.09 180)", // soft teal
    ["--primary-foreground" as any]: "oklch(0.18 0.03 260)", // deep charcoal for contrast
    // accent pastel pink and its foreground
    ["--accent" as any]: "oklch(0.93 0.05 350)", // pastel pink
    ["--accent-foreground" as any]: "oklch(0.22 0.03 260)",
    // neutrals (derived, keep within palette discipline)
    ["--muted" as any]: "oklch(0.96 0 0)", // light gray neutral
    ["--muted-foreground" as any]: "oklch(0.42 0.02 260)",
    // borders/rings mapped to neutrals to stay under 5 colors
    ["--border" as any]: "oklch(0.92 0 0)",
    ["--ring" as any]: "oklch(0.82 0 0)",
  } as React.CSSProperties

  return (
    <main style={themeStyle} className="bg-background text-foreground">
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
            <span className="font-sans font-semibold text-lg text-pretty">Little Seed</span>
          </div>
          <nav className="hidden sm:flex items-center gap-3">
            <Link href="#features" className="text-sm hover:underline">
              Features
            </Link>
            <Link href="#rides" className="text-sm hover:underline">
              Safe Rides
            </Link>
            <Link href="#reminders" className="text-sm hover:underline">
              Reminders
            </Link>
            {user ? (
              // Show user name and logout when logged in
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-sm">
                    <User className="h-4 w-4 mr-1" />
                    Hi, {user.firstName}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="text-sm"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              // Show sign in and get started when not logged in
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-primary text-primary-foreground hover:opacity-90">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </nav>
          <div className="flex sm:hidden items-center gap-2">
            {user ? (
              // Show user name and logout for mobile when logged in
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    Hi, {user.firstName}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              // Show sign in and sign up for mobile when not logged in
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-10 md:py-16">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-pretty">
              {user ? `Welcome back, ${user.firstName}!` : 'Your Pregnancy & Postpartum Companion'}
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-pretty">
              {user 
                ? `Continue your journey with personalized care. Track recovery, nutrition, hydration, vaccines, and family history—all in one caring place designed just for you.`
                : 'Track recovery, nutrition, hydration, vaccines, and family history—all in one caring, easy-to-use place. Get gentle reminders and 24/7 guidance whenever you need it.'
              }
            </p>
            <div className="flex gap-3">
              {user ? (
                // Show dashboard link when logged in
                <>
                  <Link href="/dashboard">
                    <Button className="bg-primary text-primary-foreground hover:opacity-90">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-border bg-transparent">
                    View Features
                  </Button>
                </>
              ) : (
                // Show registration link when not logged in
                <>
                  <Link href="/auth/register">
                    <Button className="bg-primary text-primary-foreground hover:opacity-90">
                      Start Free
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-border bg-transparent">
                    Learn More
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border">
            <Image
              src="/img.png"
              alt="Nurture & Grow - Your journey into parenthood, supported every step"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <h2 className="sr-only">Core Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <FeatureCard
            title="Post Care"
            description="Track recovery, rest, and gentle exercise with supportive guidance."
            icon={<Heart className="h-5 w-5" aria-hidden />}
            ctaLabel="Open Post Care"
            href="#"
          />
          <FeatureCard
            title="Pedigree"
            description="Collect a 3-generation family history to assess hereditary risks."
            icon={<Family className="h-5 w-5" aria-hidden />}
            ctaLabel="Build Pedigree"
            href="#"
          />
          <FeatureCard
            title="Meal of the Day"
            description="Personalized meal suggestions based on your stage and needs."
            icon={<Utensils className="h-5 w-5" aria-hidden />}
            ctaLabel="See Today’s Meal"
            href="#"
          />
          <FeatureCard
            title="Vaccine Schedule"
            description="Track appointments and get gentle reminders to stay on schedule."
            icon={<Syringe className="h-5 w-5" aria-hidden />}
            ctaLabel="View Schedule"
            href="#"
          />
          <FeatureCard
            title="Water Reminder"
            description="Keep hydrated with timely reminders throughout your day."
            icon={<Droplets className="h-5 w-5" aria-hidden />}
            ctaLabel="Set Reminders"
            href="#"
          />
          <FeatureCard
            title="AI Chatbot"
            description="24/7 answers, symptom guidance, and friendly check-ins."
            icon={<Bot className="h-5 w-5" aria-hidden />}
            ctaLabel="Ask a Question"
            href="#"
          />
        </div>
      </section>

      {/* Safe Rides for Women */}
      <section id="rides" className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
                <Car className="h-5 w-5 text-accent-foreground" aria-hidden />
              </div>
              <CardTitle className="text-balance">Safe Rides for Women</CardTitle>
            </div>
            <Button className="bg-primary text-primary-foreground hover:opacity-90">Request a Ride</Button>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed">
            Need a safe, reliable ride for a checkup or hospital visit? Access women-safe transport with simple, clear
            options—anytime you need it.
          </CardContent>
        </Card>
      </section>

      {/* Reminders / Alerts */}
      <section id="reminders" className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="text-xl font-semibold mb-4">Today’s Reminders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border bg-muted">
            <CardContent className="py-4">
              <div className="text-sm">
                <strong className="font-medium">Hydration</strong>: Don’t forget to drink a glass of water now.
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-muted">
            <CardContent className="py-4">
              <div className="text-sm">
                <strong className="font-medium">Vaccine</strong>: Pediatric appointment tomorrow at 10:30 AM.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating Chatbot */}
      <ChatbotWidget />
    </main>
  )
}
