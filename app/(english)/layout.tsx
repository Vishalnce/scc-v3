


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body>
        <div>
          <p className="text-xl">Englihs layout</p>
 {children}
        </div>
       
      </body>
    </html>
  );
}
