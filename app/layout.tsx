import Navbar from "@/components/Navbar"
import "./globals.css"
import Footer from "@/components/Footer"
import ErrorBoundary from "../components/ErrorBoundary"

export const metadata = {
  title: "Flexibble",
  description: "To Display developer projects",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  )
}
