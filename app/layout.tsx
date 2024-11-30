import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-gradient-to-b from-gray-100 to-gray-50 text-gray-800">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            {/* Header */}
            <nav className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 shadow-lg">
              <div className="w-full max-w-6xl mx-auto flex justify-between items-center p-4 text-white">
                <div className="flex items-center gap-6 font-bold">
                  <Link href={"/"} className="text-lg hover:underline">
                    Teaching Assistant Assignment System
                  </Link>
                  <DeployButton />
                </div>
                <div>{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}</div>
              </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col flex-1 gap-12 w-full max-w-6xl p-6">
              {children}
            </div>

            {/* Footer */}
            <footer className="w-full bg-gradient-to-r from-orange-500 via-indigo-500 to-blue-500 text-white text-center py-6">
              <div className="flex flex-col items-center gap-4">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-semibold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
