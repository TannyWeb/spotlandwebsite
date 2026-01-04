import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { urlFor } from "@/lib/sanity"
import { cn } from "@/lib/utils"

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
    featured?: boolean
  }
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

export default function ServiceCard({ service }: ServiceCardProps) {
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

  return (
    <Card className="overflow-hidden border-t-4 border-[#26a1ab] transition-transform hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      {/* Image Container - Fixed aspect ratio for grid alignment */}
      <div className="aspect-video w-full overflow-hidden bg-slate-200">
        <img 
          src={imageUrl}
          alt={service.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <CardHeader className="pb-3">
        <Badge 
          variant="secondary" 
          className="w-fit bg-teal-100 text-[#1b7a82] border-0 mb-2 text-base px-4 py-2 min-h-[44px]"
        >
          {categoryLabels[service.category] || service.category}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <h3 className="text-slate-900 font-bold text-xl leading-tight">
          <a 
            href={serviceUrl}
            className="hover:text-[#26a1ab] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded min-h-[44px] min-w-[44px] inline-flex items-center"
          >
            {service.title}
          </a>
        </h3>

        {service.schedule && (
          <p className="text-slate-600 text-base flex items-start gap-2">
            <span className="text-lg flex-shrink-0" aria-hidden="true">🕐</span>
            <span>{service.schedule}</span>
          </p>
        )}

        <a
          href={serviceUrl}
          className="inline-block bg-[#26a1ab] text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-[#1b7a82] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[48px] min-w-[120px] flex items-center justify-center"
        >
          Learn more
        </a>
      </CardContent>
    </Card>
  )
}

