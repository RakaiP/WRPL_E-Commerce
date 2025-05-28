import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#282A3A' }} // solid dark blue background (can keep or change if you want)
    >
      <div className="backdrop-blur-sm bg-gray-600 p-6 rounded-2xl shadow-xl">
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gray-700 hover:bg-gray-600 text-white font-semibold", // dark gray button
              card: "shadow-xl bg-white", // dark gray card background
              headerTitle: "text-white",
              headerSubtitle: "text-gray-300",
              formFieldLabel: "text-gray-200",
              formFieldInput: "bg-gray-800 text-white border-gray-700",
              footerActionText: "text-gray-300",
              footerActionLink: "text-gray-400 hover:text-gray-500 underline", // changed blue to gray here
              socialButtonsBlockButtonText: "text-white" // make "Continue with Google" text white
            },
            variables: {
              colorPrimary: "#4b5563", // Tailwind gray-600
              colorBackground: "#282A3A", // keep dark background
              colorText: "#ffffff"
            }
          }}
        />
      </div>
    </div>
  )
}
