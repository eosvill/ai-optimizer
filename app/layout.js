import './globals.css';

export const metadata = {
  title: 'OptimaIA — Diagnóstico de Optimización con IA',
  description: 'Obtené un diagnóstico personalizado y un plan de implementación de IA en menos de 5 minutos con OptimaIA. Identificá procesos automatizables hoy mismo.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
