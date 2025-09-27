"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, X } from "lucide-react"

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          aria-expanded={open}
          aria-controls="chatbot-panel"
          onClick={() => setOpen((s) => !s)}
          className="rounded-full h-12 w-12 p-0 bg-primary text-primary-foreground hover:opacity-90"
        >
          <span className="sr-only">{open ? "Close chat" : "Open chat"}</span>
          {open ? <X className="h-5 w-5" aria-hidden /> : <Bot className="h-5 w-5" aria-hidden />}
        </Button>
      </div>

      {open && (
        <div
          id="chatbot-panel"
          role="dialog"
          aria-label="AI Chatbot"
          className="fixed bottom-20 right-4 z-50 w-[92vw] max-w-sm rounded-xl border border-border bg-card shadow-lg"
        >
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-accent flex items-center justify-center">
                <Bot className="h-4 w-4 text-accent-foreground" aria-hidden />
              </div>
              <span className="font-medium">AI Chatbot</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" aria-hidden />
            </Button>
          </div>
          <div className="p-3 max-h-72 overflow-auto">
            <div className="text-sm leading-relaxed">
              <p className="mb-2">
                Hello! I’m here to help with recovery, nutrition, hydration, and vaccine questions. How can I help?
              </p>
              <div className="text-xs text-muted-foreground">
                Tip: This is a demo UI. Connect an AI backend when you’re ready.
              </div>
            </div>
          </div>
          <form
            className="p-3 border-t border-border flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              // Placeholder submission – no AI backend wired here
              // console.log("[v0] Chat message submitted")
            }}
          >
            <input
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none"
              placeholder="Type a message..."
              aria-label="Message input"
            />
            <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90">
              Send
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
