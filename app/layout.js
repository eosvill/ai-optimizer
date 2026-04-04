import './globals.css';

export const metadata = {
  title: 'Elbufalo IA — Agencia de Inteligencia Artificial',
  description: 'Ayudamos a PyMEs y empresas a optimizar sus procesos y ventas con Inteligencia Artificial.',
  other: {
    'facebook-domain-verification': '8f1v2cpmsyp8ggd4b25uobkirpwd64',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
