"use client";

export default function GlobalError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Something went wrong!
            </h2>
            <button
              onClick={() => reset()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
