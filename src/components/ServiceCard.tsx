import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/lib/sanity"
import { cn } from "@/lib/utils"
import { getCurrentDay, formatTime } from "@/lib/timeUtils"

interface ServiceCardProps {
  service: {
    _id: string
    title: string
    slug: {
      current: string
    } | string
    category: string
    mainImage?: any
    schedule?: string
    scheduleStructured?: Array<{
      dayOfWeek: string
      startTime: string
      endTime: string
    }>
    featured?: boolean
  }
  context?: 'running-now' | 'later-today' | 'tomorrow'
  colorClass?: 'blue' | 'teal' | 'purple' | 'orange' | 'green' | 'pink'
}

// Category display names
const categoryLabels: Record<string, string> = {
  advice: 'Advice & Support',
  health: 'Health & Wellbeing',
  youth: 'Youth Programs',
  education: 'Education & Learning',
}

// Fallback placeholder image from Unsplash (community vibe)
const placeholderImage = 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800'

export default function ServiceCard({ service, context, colorClass }: ServiceCardProps) {
  // Get the slug value (handle both object and string formats)
  const slugValue = typeof service.slug === 'string' ? service.slug : service.slug.current
  const serviceUrl = `/services/${slugValue}`

  // Get image URL - use Sanity image if available, otherwise use placeholder
  let imageUrl = placeholderImage
  if (service.mainImage) {
    try {
      imageUrl = urlFor(service.mainImage).width(800).height(450).fit('crop').auto('format').url()
    } catch (error) {
      console.error('Error generating image URL:', error)
      imageUrl = placeholderImage
    }
  }

  // Get time badge info based on context
  let timeBadge: { text: string; bgColor: string; textColor: string } | null = null
  if (context && service.scheduleStructured) {
    const currentDay = getCurrentDay()
    const relevantSchedule = service.scheduleStructured.find(s =>
      context === 'running-now' ? s.dayOfWeek === currentDay :
      context === 'later-today' ? s.dayOfWeek === currentDay :
      true // tomorrow
    )

    if (relevantSchedule) {
      if (context === 'running-now') {
        timeBadge = {
          text: 'Running Now',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800'
        }
      } else if (context === 'later-today') {
        timeBadge = {
          text: `Starts at ${formatTime(relevantSchedule.startTime)}`,
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800'
        }
      } else if (context === 'tomorrow') {
        timeBadge = {
          text: `Tomorrow at ${formatTime(relevantSchedule.startTime)}`,
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800'
        }
      }
    }
  }

  return (
    <Card className={cn(
      "overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 rounded-3xl bg-white",
      colorClass ? `service-card-${colorClass}` : 'border-t-4 border-[#26a1ab]'
    )}>
      {/* Image Container - Fixed aspect ratio for grid alignment */}
      <div className="aspect-video w-full overflow-hidden bg-slate-200">
        <img 
          src={imageUrl}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <CardContent className="space-y-4 pt-6">
        {/* Icon with color-matched background */}
        {colorClass && (
          <div className="service-icon-bg w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <svg className="service-icon w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}

        <h3 className="text-slate-900 font-bold text-2xl leading-tight">
          <a
            href={serviceUrl}
            className="hover:text-[#26a1ab] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded min-h-[44px] min-w-[44px] inline-flex items-center"
          >
            {service.title}
          </a>
        </h3>

        <p className="text-slate-600 text-lg leading-relaxed line-clamp-2">
          {categoryLabels[service.category] || service.category}
        </p>

        <a
          href={serviceUrl}
          className="inline-flex items-center text-[#26a1ab] font-semibold text-lg hover:text-[#1b7a82] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded min-h-[44px]"
        >
          Learn more →
        </a>
      </CardContent>
    </Card>
  )
}

