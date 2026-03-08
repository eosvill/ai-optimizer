import './globals.css';

export const metadata = {
  title: 'Elbufalo IA — Agencia de Inteligencia Artificial',
  description: 'Ayudamos a PyMEs y empresas a optimizar sus procesos y ventas con Inteligencia Artificial.',
  icons: {
    icon: '/images/favicon_neg.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
