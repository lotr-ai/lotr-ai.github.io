import './globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Yüzüklerin Efendisi',
  description: 'Bu oyunda Yüzüklerin Efendisi\'nin dünyasında geçen bir hikaye yazacağız. Oyunu oynarken, hikayeyi yazarken ve hikayeyi okurken eğlenmeniz dileğiyle.',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-YCQ8NN3XN5"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-YCQ8NN3XN5');
            `,
          }}
        />

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
