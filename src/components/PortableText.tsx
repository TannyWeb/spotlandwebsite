import { PortableText as SanityPortableText } from '@portabletext/react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PortableTextProps {
  content: any[];
}

// Extract YouTube video ID from URL
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

export default function PortableText({ content }: PortableTextProps) {
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className="prose prose-lg prose-slate max-w-none">
    <SanityPortableText
      value={content}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-4 mt-8 text-slate-900">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-bold mb-3 mt-6 text-slate-900">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-bold mb-2 mt-4 text-slate-900">{children}</h3>
          ),
          normal: ({ children }) => (
            <p className="mb-4 text-slate-700 leading-relaxed">{children}</p>
          ),
          blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-[#26a1ab] pl-6 py-4 my-8 italic text-2xl text-slate-900 font-medium bg-teal-50/30 rounded-r-3xl not-prose max-w-4xl mx-auto">
              <p className="mb-0">{children}</p>
            </blockquote>
          ),
        },
        marks: {
          strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
            link: ({ value, children }) => {
              const href = value?.href;
              const youtubeVideoId = href ? getYouTubeVideoId(href) : null;
              
              // If it's a YouTube URL, render as embedded video
              // Using a span wrapper with block display to break out of inline context
              if (youtubeVideoId) {
                return (
                  <span className="block my-12 w-full not-prose">
                    <div className="rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                      <AspectRatio ratio={16 / 9}>
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                  </span>
                );
              }
              
              // Regular link
              return (
                <a
                  href={href}
                  className="text-[#26a1ab] hover:text-[#1b7a82] underline focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded"
                  target={value?.blank ? '_blank' : undefined}
                  rel={value?.blank ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              );
            },
        },
        list: {
          bullet: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700 ml-4">{children}</ul>
          ),
          number: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700 ml-4">{children}</ol>
          ),
        },
        listItem: {
          bullet: ({ children }) => <li className="ml-2">{children}</li>,
          number: ({ children }) => <li className="ml-2">{children}</li>,
        },
      }}
    />
    </div>
  );
}

