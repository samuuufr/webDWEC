//Los layout anidados son Layout
export default function Layout({ children }) {
  return (
      <article className="m-5">
        <h2 className="text-2xl font-bold my-8">Área de usuario</h2>
        {children}
      </article>
  );
}