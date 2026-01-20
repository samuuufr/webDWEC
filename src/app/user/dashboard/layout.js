'use client';
import Menu from '@/app/components/Menu';
import Breadcrumbs from '@/app/components/Breadcrumbs';

export default function Layout({ children }) {

  //Rutas para las migas de pan
  const rutas = [
    { label: "Inicio", href: "/" },
    { label: "Dashboard" },
  ];

  return (
    <section>
        <Breadcrumbs rutas={rutas} />
        <Menu />
        {children}
     </section> 
  );
}