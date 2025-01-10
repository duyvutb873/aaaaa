import "./globals.css";
import QueryProvider from "../components/QueryProvider";
import React from "react";
import { AuthorsProvider, AssetsProvider } from "@/contexts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AuthorsProvider>
            <AssetsProvider>
              <div className="w-full h-full">{children}</div>
            </AssetsProvider>
          </AuthorsProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
