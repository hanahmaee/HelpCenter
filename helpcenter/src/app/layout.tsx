import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/components/pages/ThemeProvider";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Courstify Help Center",
  description: "",
  icons:{
    icon:["/favicon.ico?v=4"],
    apple:["/apple-touch-icon.png?v=4"],
    shortcut:["/apple-touch-icon.png"]
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={nunitoSans.variable}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={nunitoSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
