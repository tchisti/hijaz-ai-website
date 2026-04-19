"use client"

import { MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"
import { useState } from "react"

export default function WhatsAppFAB() {
  const [showTooltip, setShowTooltip] = useState(false)
  const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20Hijaz.ai%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20services.`

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="bg-midnight text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
          Chat with us now
        </div>
      )}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <MessageCircle size={26} fill="white" strokeWidth={1.5} />
      </a>
    </div>
  )
}
