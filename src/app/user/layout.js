"use client";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <p>estas migas de pan salen en todas las paginas del usuario</p>
        {children}
        
      </body>
    </html>
  );
}
