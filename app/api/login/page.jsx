import { getProviders, signIn } from "next-auth/react";

async function getAuthProviders() {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/auth/providers`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function LoginPage() {
  const providers = await getAuthProviders();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-lg">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Sign in to TwitterX</h1>

          <p className="text-sm text-zinc-400 mt-2">
            Welcome back. Please enter your details.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() => signIn(provider.id)}
                  className="w-full bg-white text-black py-2 rounded-full font-semibold hover:bg-gray-200 transition"
                >
                  Sign in with 
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}