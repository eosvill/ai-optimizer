'use client';

export default function PrivacyPolicy() {
  return (
    <main style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Política de Privacidad</h1>

        <p style={styles.lastUpdated}>
          <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Introducción</h2>
          <p>
            Elbufalo IA ("nosotros", "nuestro", "la Compañía") se compromete a proteger su privacidad.
            Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y mantenemos segura su información
            cuando utiliza nuestras aplicaciones, sitios web y servicios.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Información que Recopilamos</h2>
          <p>Podemos recopilar información sobre usted de varias formas:</p>

          <h3 style={styles.subsectionTitle}>2.1 Información que Proporciona Directamente</h3>
          <ul style={styles.list}>
            <li>Nombre, correo electrónico y número de teléfono</li>
            <li>Información de su empresa u organización</li>
            <li>Datos proporcionados en formularios de contacto</li>
            <li>Mensajes y comunicaciones que nos envía</li>
            <li>Información de perfil en redes sociales (si se conecta mediante Meta/Facebook)</li>
          </ul>

          <h3 style={styles.subsectionTitle}>2.2 Información Recopilada Automáticamente</h3>
          <ul style={styles.list}>
            <li>Dirección IP, navegador, tipo de dispositivo y sistema operativo</li>
            <li>Páginas visitadas y duración de las visitas</li>
            <li>Datos de cookies y tecnologías similares</li>
            <li>Información de geolocalización (aproximada)</li>
            <li>Registros de interacción con nuestros servicios</li>
          </ul>

          <h3 style={styles.subsectionTitle}>2.3 Información de Terceros</h3>
          <ul style={styles.list}>
            <li>Datos de redes sociales (Meta/Facebook, cuando se autoriza)</li>
            <li>Información de proveedores de análisis y publicidad</li>
            <li>Datos de proveedores de servicios de terceros</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Uso de la Información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul style={styles.list}>
            <li>Proporcionar, mantener y mejorar nuestros servicios</li>
            <li>Responder a sus solicitudes y comunicaciones</li>
            <li>Procesar transacciones y enviar información relacionada</li>
            <li>Enviar actualizaciones, promociones y comunicaciones de marketing (con su consentimiento)</li>
            <li>Analizar el uso de nuestros servicios para optimizarlos</li>
            <li>Cumplir con obligaciones legales y regulatorias</li>
            <li>Prevenir fraude y garantizar la seguridad</li>
            <li>Personalizar su experiencia</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Compartición de Información</h2>
          <p>No vendemos, alquilamos ni compartimos su información personal con terceros para sus propósitos de marketing,
          excepto en los siguientes casos:</p>
          <ul style={styles.list}>
            <li><strong>Proveedores de Servicios:</strong> Con empresas que nos ayudan a operar nuestros servicios (hosting, análisis, marketing)</li>
            <li><strong>Cumplimiento Legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
            <li><strong>Redes Sociales:</strong> Si utiliza funciones de login social, se pueden compartir datos con Meta/Facebook según sus términos</li>
            <li><strong>Transferencias de Negocio:</strong> En caso de fusión, adquisición o venta de activos</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Cookies y Tecnologías Similares</h2>
          <p>Utilizamos cookies, píxeles de seguimiento y tecnologías similares para:</p>
          <ul style={styles.list}>
            <li>Recordar sus preferencias</li>
            <li>Entender cómo utiliza nuestros servicios</li>
            <li>Seguridad y prevención de fraude</li>
            <li>Publicidad personalizada en redes sociales</li>
          </ul>
          <p>Puede controlar las cookies a través de la configuración de su navegador. Tenga en cuenta que desactivar cookies
          puede afectar la funcionalidad de nuestros servicios.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>6. Seguridad de la Información</h2>
          <p>Implementamos medidas técnicas, administrativas y físicas para proteger su información personal, incluidas:</p>
          <ul style={styles.list}>
            <li>Encriptación de datos en tránsito (HTTPS)</li>
            <li>Controles de acceso y autenticación</li>
            <li>Monitoreo regular de seguridad</li>
            <li>Políticas de retención de datos</li>
          </ul>
          <p>Sin embargo, ningún sistema es 100% seguro. Si descubre una vulnerabilidad, contáctenos inmediatamente.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>7. Derechos del Usuario</h2>
          <p>Dependiendo de su ubicación, puede tener los siguientes derechos:</p>

          <h3 style={styles.subsectionTitle}>7.1 Derechos RGPD (Unión Europea)</h3>
          <ul style={styles.list}>
            <li><strong>Derecho de Acceso:</strong> Solicitar una copia de sus datos personales</li>
            <li><strong>Derecho a la Rectificación:</strong> Corregir información inexacta</li>
            <li><strong>Derecho al Olvido:</strong> Solicitar la eliminación de sus datos</li>
            <li><strong>Derecho a la Portabilidad:</strong> Obtener sus datos en un formato portable</li>
            <li><strong>Derecho a Oponersa:</strong> Oponerse al procesamiento de datos</li>
            <li><strong>Derecho a Revocar Consentimiento:</strong> Retirar el consentimiento en cualquier momento</li>
          </ul>

          <h3 style={styles.subsectionTitle}>7.2 Derechos de Privacidad (California - CCPA)</h3>
          <ul style={styles.list}>
            <li>Derecho a saber qué datos personales se recopilan</li>
            <li>Derecho a eliminar datos personales</li>
            <li>Derecho a opt-out de ventas de datos</li>
            <li>Derecho a no discriminación por ejercer derechos de privacidad</li>
          </ul>

          <p>Para ejercer cualquiera de estos derechos, contáctenos a través de los datos de contacto que se proporcionan a continuación.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>8. Marketing y Comunicaciones</h2>
          <p>Si nos ha proporcionado su email, podemos enviarle comunicaciones de marketing. Puede:</p>
          <ul style={styles.list}>
            <li>Usar el enlace "Darse de baja" en nuestros emails</li>
            <li>Contactarnos para solicitar ser removido de nuestras listas</li>
            <li>Cambiar sus preferencias de comunicación en su perfil</li>
          </ul>
          <p>Tenga en cuenta que incluso si se da de baja del marketing, podemos seguir enviándole comunicaciones administrativas necesarias.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>9. Retención de Datos</h2>
          <p>Retenemos su información personal solo mientras sea necesario para los propósitos para los que fue recopilada,
          o según lo requiera la ley. Los períodos de retención varían según el tipo de dato y el propósito del procesamiento.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>10. Enlaces de Terceros</h2>
          <p>Nuestros servicios pueden contener enlaces a sitios web de terceros. No somos responsables de sus prácticas de privacidad.
          Le recomendamos revisar las políticas de privacidad de cualquier sitio de terceros antes de proporcionar información personal.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>11. Privacidad de Menores</h2>
          <p>Nuestros servicios no están dirigidos a menores de 13 años (o la edad de consentimiento digital en su jurisdicción).
          No recopilamos información personal de menores a sabiendas. Si descubrimos que hemos recopilado datos de un menor,
          los eliminaremos inmediatamente.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>12. Cambios en Esta Política</h2>
          <p>Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios significativos serán notificados
          por email o se publicarán de forma destacada en nuestros servicios. Su uso continuado de nuestros servicios
          tras los cambios constituye su aceptación de la Política actualizada.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>13. Contacto</h2>
          <p>Si tiene preguntas sobre esta Política de Privacidad o sobre nuestras prácticas de privacidad, contáctenos:</p>
          <div style={styles.contactBox}>
            <p><strong>Elbufalo IA</strong></p>
            <p>Email: <a href="mailto:privacidad@elbufalo.site">privacidad@elbufalo.site</a></p>
            <p>Sitio Web: <a href="https://elbufalo.site">https://elbufalo.site</a></p>
          </div>
          <p>Responderemos a las solicitudes de privacidad dentro de 30 días hábiles.</p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>14. Cumplimiento Legal</h2>
          <p>Esta Política de Privacidad cumple con:</p>
          <ul style={styles.list}>
            <li>Reglamento General de Protección de Datos (RGPD) - UE</li>
            <li>California Consumer Privacy Act (CCPA)</li>
            <li>Ley Orgánica de Protección de Datos (LOPDGDD) - España</li>
            <li>Estándares de privacidad de Meta/Facebook para aplicaciones</li>
            <li>Leyes de privacidad aplicables en el país de operación</li>
          </ul>
        </section>
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#1a1a1a',
  },
  lastUpdated: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '30px',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #eee',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#222',
    marginTop: '0',
  },
  subsectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginTop: '15px',
    marginBottom: '10px',
    color: '#333',
  },
  list: {
    marginLeft: '20px',
    marginBottom: '15px',
  },
  contactBox: {
    backgroundColor: '#f0f4ff',
    padding: '20px',
    borderRadius: '6px',
    margin: '15px 0',
    borderLeft: '4px solid #007bff',
  },
};
