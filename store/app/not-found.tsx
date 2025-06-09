import Link from 'next/link'
import Container from '@/components/ui/container'

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 text-center">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </Container>
  )
}