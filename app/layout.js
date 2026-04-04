import './globals.css';

export const metadata = {
  title: 'Elbufalo IA — Agencia de Inteligencia Artificial',
  description: 'Ayudamos a PyMEs y empresas a optimizar sus procesos y ventas con Inteligencia Artificial.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="facebook-domain-verification" content="8f1v2cpmsyp8ggd4b25uobkirpwd64" />
        {/* Meta Pixel Code */}
        <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1911618019559771');
          fbq('track', 'PageView');
        `}} />
        <noscript dangerouslySetInnerHTML={{ __html: `
          <img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=1911618019559771&ev=PageView&noscript=1" />
        `}} />
        {/* End Meta Pixel Code */}
      </head>
      <body>{children}</body>
    </html>
  );
}
