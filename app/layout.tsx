import './globals.css';

export const metadata = {
  title: 'Test Automation Platform',
  description: 'A complete solution for test automation and DevOps integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        {children}
      </body>
    </html>
  )
}
