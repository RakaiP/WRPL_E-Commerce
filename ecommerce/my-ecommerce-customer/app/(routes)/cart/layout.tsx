// This is a Server Component (no "use client" directive)

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Shopping Cart',
  description: 'View your shopping cart',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
