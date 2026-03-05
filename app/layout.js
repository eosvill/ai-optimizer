import './globals.css';

export const metadata = {
  title: 'AI Operations Optimizer — Diagnóstico de IA para tu empresa',
  description: 'Recibí un diagnóstico personalizado y un plan de implementación de IA en menos de 5 minutos. Identificá procesos automatizables y conocé qué asistentes implementar primero.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
