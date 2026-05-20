import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <h1 className="font-display text-6xl font-bold text-espresso mb-4">404</h1>
        <p className="text-xl text-warm-gray-600 mb-8">
          This page doesn't exist. It may have been moved or removed.
        </p>
        <div className="space-y-4">
          <Link
            href="/en"
            className="block bg-trade-orange text-white font-display font-bold text-lg px-8 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Go to Homepage
          </Link>
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Link href="/en/services/kitchen-remodeling" className="text-navy hover:text-trade-orange transition font-medium">
              Kitchen Remodeling
            </Link>
            <Link href="/en/services/bathroom-remodeling" className="text-navy hover:text-trade-orange transition font-medium">
              Bathroom Remodeling
            </Link>
            <Link href="/en/services/interior-painting" className="text-navy hover:text-trade-orange transition font-medium">
              Interior Painting
            </Link>
            <Link href="/en/services/exterior-painting" className="text-navy hover:text-trade-orange transition font-medium">
              Exterior Painting
            </Link>
          </div>
          <p className="text-warm-gray-500 mt-6">
            Need help? Call <a href="tel:+17863637039" className="text-trade-orange font-semibold">(786) 363-7039</a>
          </p>
        </div>
      </div>
    </div>
  )
}
