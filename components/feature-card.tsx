import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
  title: string
  description: string
  icon: React.ReactNode
  ctaLabel: string
  href: string
}

export default function FeatureCard({ title, description, icon, ctaLabel, href }: Props) {
  return (
    <Card className="border-border h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
            <span className="text-accent-foreground" aria-hidden>
              {icon}
            </span>
          </div>
          <CardTitle className="text-pretty">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-pretty">{description}</p>
        <div>
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
            <Link href={href} aria-label={`${ctaLabel} – ${title}`}>
              {ctaLabel}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
