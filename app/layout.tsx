import { isDatabaseUp } from "@/lib/health/dbhealth";
import "./globals.css";
import { lato, montserrat } from "@/lib/fonts/fonts";
import { Provider } from "@/utils/auth-provider/Providers";
import ThemeProvider from "@/utils/theme/ThemeProvider";
import Script from "next/script";
import DbHealthWatcher from "@/Components/client/DbHealthWatcher";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const dbIsUp = await isDatabaseUp()

  // if (!dbIsUp) {
  //   return (
  //     <html lang="en">
  //       <body className="flex min-h-screen items-center justify-center bg-gray-100 text-red-600">
  //         <div className="text-center">
  //           <h1 className="text-2xl font-bold">Database Connection Error</h1>
  //           <p className="mt-2 text-gray-700">
  //             Our servers are temporarily unavailable. Please try after some time .
  //           </p>
  //         </div>
  //       </body>
  //     </html>
  //   );
  // }

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
