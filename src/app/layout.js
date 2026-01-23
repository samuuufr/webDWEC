import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CryptoWeb - Seguimiento de Portafolio de Criptomonedas",
  description: "Rastrea tu portafolio de criptomonedas, ve precios en tiempo real y administra tus activos digitales",
};

// RootLayout es el que incluye <html> y <body>
// Se renderiza una sola vez y es obligatorio
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {/* Children es una propiedad de React que representa todo lo que está dentro de un componente cuando se renderiza. */}
        {/* La clase min-h-screen (altura mínima igual a la altura de la pantalla) en el main, obliga a hacer scroll para ver el footer */}
        <main className="min-h-screen">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
