

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      
        <div>
          <p className="text-3xl">Hindi layout</p>
          {children}
        </div>
     
    
  );
}
