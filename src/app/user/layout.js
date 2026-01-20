'use client';
import EncabezadoH2 from '../components/EncabezadoH2';

//Los layout anidados son Layout
export default function Layout({ children }) {
  return (
      <article className="m-5">
        <EncabezadoH2>Área de usuario</EncabezadoH2>
        {children}
      </article>
  );
}