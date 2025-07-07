import EnglishNav from "@/Components/layout/EnglishNav";
import { Lato, Montserrat } from "next/font/google";
import ThemeProvider from "@/utils/theme/ThemeProvider";
import ThemeToggle from "@/utils/theme/ThemeToggle";

export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], // regular + bold
  variable: "--font-lato",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"], //
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-active-background text-[#37352f] dark:text-[#ffffffcf]" >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          
            {/* <ThemeToggle/> */}
            <EnglishNav />
            {children}
          
        </ThemeProvider>
      </body>
    </html>
  );
}
