// Layout anidado para el área de mercado
export default function MercadoLayout({ children }) {
    return (
        <section className="min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold mb-6 text-white">Área de Mercado</h2>
                {children}
            </div>
        </section>
    );
}