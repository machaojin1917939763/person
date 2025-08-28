import { ThemeProvider } from './components/ThemeProvider'
import './globals.css'

export const metadata = {
  title: 'Alex Chen - Full Stack Developer | React & Node.js Expert',
  description: 'Passionate full-stack developer with 5+ years experience in React, Node.js, and modern web technologies. Creating beautiful digital experiences with clean, efficient code.',
  keywords: 'Full Stack Developer, React Developer, Node.js, TypeScript, Frontend Engineer, Web Development, Portfolio',
  authors: [{ name: 'Alex Chen', url: 'https://alexchen.dev' }],
  creator: 'Alex Chen',
  publisher: 'Alex Chen',
  openGraph: {
    title: 'Alex Chen - Full Stack Developer',
    description: 'Creating beautiful digital experiences with modern web technologies',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Chen - Full Stack Developer',
    description: 'Creating beautiful digital experiences with modern web technologies',
    creator: '@alexchen_dev',
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