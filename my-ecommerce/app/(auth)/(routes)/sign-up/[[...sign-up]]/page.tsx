// File: app/sign-up/page.tsx

import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/033/862/789/small_2x/department-store-massive-showroom-with-merchandise-from-various-clothing-brands-retail-boutique-with-stylish-and-casual-clothes-empty-shopping-center-shop-filled-with-fashionable-trends-photo.jpg')" }}
    >
      <div className="backdrop-blur-sm bg-white/70 p-6 rounded-2xl shadow-xl">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-red-600 hover:bg-red-700 text-white font-semibold",
              card: "shadow-none", // we wrap it ourselves
            },
            variables: {
              colorPrimary: "#dc2626", // Tailwind red-600
            },
          }}
        />
      </div>
    </div>
  )
}
