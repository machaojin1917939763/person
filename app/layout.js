import { ThemeProvider } from './components/ThemeProvider'
import { getSEOConfig, getPersonalInfo } from '../lib/config'
import './globals.css'

const seoConfig = getSEOConfig()
const personalInfo = getPersonalInfo()

export const metadata = {
  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.author, url: seoConfig.siteUrl }],
  creator: seoConfig.author,
  publisher: seoConfig.author,
  openGraph: {
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: seoConfig.description,
    type: 'website',
    locale: 'en_US',
    url: seoConfig.siteUrl,
    siteName: personalInfo.name,
    images: [
      {
        url: seoConfig.image,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - ${personalInfo.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: seoConfig.description,
    creator: seoConfig.twitterHandle,
    images: [seoConfig.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', theme === 'dark');
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}