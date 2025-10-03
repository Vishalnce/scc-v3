import "./globals.css";
import { lato, montserrat } from "@/lib/fonts/fonts";
import { Provider } from "@/utils/auth-provider/Providers";
import ThemeProvider from "@/utils/theme/ThemeProvider";
import Script from "next/script";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${montserrat.variable} `}
      suppressHydrationWarning
    >
      <body>
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
            enableColorScheme={false} // ✅ prevents color-scheme mismatch
          >
            {children}
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
