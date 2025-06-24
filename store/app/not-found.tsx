import Link from 'next/link'
import Container from '@/components/ui/container'

export default function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8 text-center">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link 
          href="/"
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Return to Store
        </Link>
      </div>
    </Container>
  )
}