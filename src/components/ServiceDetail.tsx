import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Clock, ArrowLeft, CheckCircle, User, Phone, Mail, Coffee, Building2, Calendar, MapPin } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import PortableText from "./PortableText"
import AccreditationBadge from "./AccreditationBadge"

interface ServiceDetailProps {
  service: {
    _id: string
    title: string
    slug: {
      current: string
    } | string
    category: string
    mainImage?: any
    schedule?: string
    description?: any[]
    benefits?: string[]
    targetAudience?: string[]
    stats?: Array<{
      label: string
      value: string
    }>
    callToAction?: {
      phoneNumbers?: Array<{
        label?: string
        number: string
      }>
      emails?: Array<{
        label?: string
        address: string
      }>
      buttonText?: string
    }
  }
  featuredPostSlug?: string | null
}

// Category display names
const categoryLabels: Record<string, string> = {
  advice: 'Advice & Support',
  health: 'Health & Wellbeing',
  youth: 'Youth Programs',
  education: 'Education & Learning',
}

// Fallback placeholder image from Unsplash (community vibe)
const placeholderImage = 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200'

export default function ServiceDetail({ service, featuredPostSlug }: ServiceDetailProps) {
  // Get image URL - use Sanity image if available, otherwise use placeholder
  let imageUrl = placeholderImage
  if (service.mainImage) {
    try {
      imageUrl = urlFor(service.mainImage).width(1200).height(675).fit('crop').auto('format').url()
    } catch (error) {
      console.error('Error generating image URL:', error)
      imageUrl = placeholderImage
    }
  }

  return (
    <div className="space-y-0 px-6 md:px-0">
      {/* Hero Section */}
      <div className="mb-0">
        <AspectRatio ratio={16 / 9} className="rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <img 
            src={imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </AspectRatio>

        {/* Stats Bar - 3-column horizontal bar beneath hero */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 py-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <Coffee className="w-6 h-6 text-brand-accent" aria-hidden="true" />
            <span className="text-lg text-slate-700 font-medium">Free Refreshments</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-300" aria-hidden="true"></div>
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-brand-accent" aria-hidden="true" />
            <span className="text-lg text-slate-700 font-medium">Accessible Venue</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-300" aria-hidden="true"></div>
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-brand-accent" aria-hidden="true" />
            <span className="text-lg text-slate-700 font-medium">No Booking Needed</span>
          </div>
        </div>
      </div>

      {/* Introduction Grid - 70/30 split */}
      <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 py-8">
        {/* Left Column (70%) - Title and Description */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            {service.title}
          </h1>
          <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
            <PortableText content={service.description || []} />
          </div>
        </div>

        {/* Right Column (30%) - Unified Logistics Card */}
        <div>
          <Card className="bg-gradient-to-br from-teal-50/80 to-teal-100/40 border border-teal-200/50 rounded-3xl shadow-[0_8px_30px_rgb(38,161,171,0.08)] sticky top-8">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-xl text-slate-900">
                Key Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              {/* When We're Here */}
              {service.schedule && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-[#26a1ab]" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-slate-900">When We're Here</h3>
                  </div>
                  <p className="text-slate-900 text-base leading-relaxed pl-7">
                    {service.schedule}
                  </p>
                </div>
              )}

              {/* Location */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-[#26a1ab]" aria-hidden="true" />
                  <h3 className="text-lg font-semibold text-slate-900">Location</h3>
                </div>
                <p className="text-slate-900 text-base leading-relaxed pl-7">
                  123 Community Street<br />
                  Spotland, Manchester<br />
                  M12 4AB
                </p>
              </div>

              {/* Accreditation Badge */}
              {featuredPostSlug && (
                <div className="pt-4 border-t border-teal-200/50">
                  <AccreditationBadge postSlug={featuredPostSlug} variant="compact" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Impact Panel - Full Width with Benefits and Who It's For */}
      {(service.benefits || service.targetAudience) && (
        <div className="w-full bg-slate-50 py-12 md:py-16 -mx-6 md:mx-0">
          <div className="px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div>
                  <h2 className="text-3xl text-slate-900 font-semibold mb-6 flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-[#d97706]" aria-hidden="true" />
                    Benefits
                  </h2>
                  <ul className="space-y-4">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="text-lg text-slate-900 leading-relaxed">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Who It's For */}
              {service.targetAudience && service.targetAudience.length > 0 && (
                <div>
                  <h2 className="text-3xl text-slate-900 font-semibold mb-6 flex items-center gap-3">
                    <User className="w-8 h-8 text-[#d97706]" aria-hidden="true" />
                    Who It's For
                  </h2>
                  <ul className="space-y-4">
                    {service.targetAudience.map((audience, index) => (
                      <li key={index} className="text-lg text-slate-900 leading-relaxed">
                        {audience}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="flex justify-center py-8">
        <Card className="bg-gradient-to-r from-[#26a1ab] via-[#2ba8b3] to-[#d97706] text-white border-0 shadow-[0_8px_30px_rgb(38,161,171,0.2)] rounded-3xl w-full max-w-4xl">
          <CardHeader className="p-8">
            <CardTitle className="text-3xl text-white mb-2">
              Ready to Join Us?
            </CardTitle>
            <p className="text-teal-50 text-lg">
              We'd love to hear from you and help you get started.
            </p>
          </CardHeader>
          <CardContent className="p-8 pt-0 space-y-6">
            {/* Phone Numbers */}
            {service.callToAction?.phoneNumbers && service.callToAction.phoneNumbers.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {service.callToAction.buttonText || 'Give us a ring'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {service.callToAction.phoneNumbers.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.number.replace(/\s/g, '')}`}
                      className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-50 font-medium text-base rounded-full px-5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#26a1ab] min-h-[44px]"
                    >
                      <span>{phone.label || phone.number}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Email Addresses */}
            {service.callToAction?.emails && service.callToAction.emails.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  Email Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {service.callToAction.emails.map((email, index) => (
                    <a
                      key={index}
                      href={`mailto:${email.address}`}
                      className="inline-flex items-center gap-2 bg-[#d97706] text-white hover:bg-[#b86505] font-medium text-base rounded-full px-5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:ring-offset-2 focus:ring-offset-white min-h-[44px]"
                    >
                      <span>{email.label || email.address}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Back Link */}
      <div className="pt-8 border-t border-slate-200 pb-8">
        <a 
          href="/services" 
          className="inline-flex items-center gap-2 text-[#26a1ab] hover:text-[#1b7a82] font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded min-h-[44px] px-4"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          <span>Back to all services</span>
        </a>
      </div>
    </div>
  )
}

