

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <p className="text-3xl">Hindi layout</p>
          {children}
        </div>
      </body>
    </html>
  );
}
