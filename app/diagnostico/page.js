'use client';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <span className="nav-logo">Optima<span>IA</span></span>
            <Link href="/" style={{ color: 'var(--text-3)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Volver a Inicio
            </Link>
          </div>
          <Link href="/lead" className="btn-primary hide-mobile" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
            Obtener mi diagnóstico
          </Link>
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroInner}>
              <div className={`animate-fade-up`} style={{ animationDelay: '0ms', display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(8,181,214,0.12)', border: '1px solid rgba(8,181,214,0.4)', borderRadius: 9999, padding: '6px 16px', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.08em', color: '#08B5D6', textTransform: 'uppercase' }}>
                Diagnóstico personalizado en 5 minutos
              </div>
              <h1 className={`heading-xl animate-fade-up ${styles.heroTitle}`} style={{ animationDelay: '80ms' }}>
                Descubrí cómo los asistentes de IA pueden optimizar el funcionamiento de tu empresa
              </h1>
              <p className={`animate-fade-up ${styles.heroSub}`} style={{ animationDelay: '160ms' }}>
                Recibí un diagnóstico personalizado y un plan de implementación en menos de 5 minutos.
              </p>
              <div className={`animate-fade-up ${styles.heroCtas}`} style={{ animationDelay: '240ms' }}>
                <Link href="/lead" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg, #08B5D6, #0891B2)', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '14px 28px', borderRadius: 9999, textDecoration: 'none', boxShadow: '0 0 24px rgba(8,181,214,0.4)', transition: 'transform 0.2s, box-shadow 0.2s' }}>Obtener mi diagnóstico</Link>
                <a href="#como-funciona" className="btn-secondary">Ver cómo funciona</a>
              </div>
              <div className={`animate-fade-up ${styles.heroStats}`} style={{ animationDelay: '320ms' }}>
                <div className={styles.stat}>
                  <span className={styles.statNum}>5 min</span>
                  <span className={styles.statLabel}>para completar</span>
                </div>
                <div className={styles.statDiv} />
                <div className={styles.stat}>
                  <span className={styles.statNum}>100%</span>
                  <span className={styles.statLabel}>personalizado</span>
                </div>
                <div className={styles.statDiv} />
                <div className={styles.stat}>
                  <span className={styles.statNum}>IA real</span>
                  <span className={styles.statLabel}>sin plantillas genéricas</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroGlow} />
        </section>

        {/* ── PROBLEMA ─────────────────────────────────── */}
        <section className="section-alt">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className="badge">El problema</div>
              <h2 className="heading-lg" style={{ marginTop: 16 }}>
                Tu equipo pierde tiempo y dinero en tareas que la IA puede hacer
              </h2>
              <p style={{ color: 'var(--text-3)', maxWidth: 560, marginTop: 12 }}>
                La mayoría de las empresas dedica entre el 30% y el 60% de su capacidad operativa a procesos repetitivos que no generan valor real.
              </p>
            </div>
            <div className={`grid-3 ${styles.problemGrid}`} style={{ marginTop: 48 }}>
              {[
                { num: '30-60%', label: 'del tiempo operativo se gasta en tareas repetitivas' },
                { num: '3x', label: 'más caro operar sin automatización frente a tus competidores' },
                { num: '80%', label: 'de los procesos administrativos pueden automatizarse con IA' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ textAlign: 'center' }}>
                  <div className="score-number">{item.num}</div>
                  <p style={{ color: 'var(--text-3)', marginTop: 12, fontSize: '0.95rem' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUCIÓN ─────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className="badge">La solución</div>
              <h2 className="heading-lg" style={{ marginTop: 16 }}>
                Asistentes de IA que trabajan para cada área de tu empresa
              </h2>
              <p style={{ color: 'var(--text-3)', maxWidth: 560, marginTop: 12 }}>
                Automatizá operaciones, ventas, marketing y soporte al cliente con asistentes de IA diseñados específicamente para tu negocio.
              </p>
            </div>
            <div className={`grid-4 ${styles.areaGrid}`} style={{ marginTop: 48 }}>
              {[
                { area: 'Operaciones', desc: 'Reportes automáticos, gestión de datos y flujos de trabajo internos.' },
                { area: 'Ventas', desc: 'Calificación de leads - clientes potenciales, seguimiento automático y actualización de CRM.' },
                { area: 'Marketing', desc: 'Generación de contenido, planificación de campañas y análisis.' },
                { area: 'Soporte', desc: 'Respuestas automáticas, clasificación de tickets y base de conocimiento.' },
              ].map((item, i) => (
                <div key={i} className="card">
                  <div className={styles.areaNumber}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="heading-sm" style={{ marginTop: 16 }}>{item.area}</h3>
                  <p style={{ color: 'var(--text-3)', marginTop: 8, fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ─────────────────────────────── */}
        <section className="section-alt" id="como-funciona">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className="badge">Cómo funciona</div>
              <h2 className="heading-lg" style={{ marginTop: 16 }}>Tres pasos para tu blueprint de IA</h2>
            </div>
            <div className={styles.stepsGrid} style={{ marginTop: 56 }}>
              {[
                { step: '01', title: 'Respondé algunas preguntas sobre tu empresa', desc: 'Un cuestionario de 5 minutos sobre tus operaciones, equipo y procesos actuales.' },
                { step: '02', title: 'Nuestro sistema analiza tus procesos', desc: 'La IA evalúa tus respuestas e identifica oportunidades de automatización específicas para tu industria.' },
                { step: '03', title: 'Recibís un plan de implementación personalizado', desc: 'Un blueprint detallado con scores, asistentes recomendados y un roadmap por fases.' },
              ].map((item, i) => (
                <div key={i} className={styles.step}>
                  <div className={styles.stepNum}>{item.step}</div>
                  <div className={styles.stepContent}>
                    <h3 className="heading-sm">{item.title}</h3>
                    <p style={{ color: 'var(--text-3)', marginTop: 8, fontSize: '0.9rem' }}>{item.desc}</p>
                  </div>
                  {i < 2 && <div className={styles.stepConnector} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFICIOS ────────────────────────────────── */}
        <section className="section">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div className="badge">Qué vas a obtener</div>
              <h2 className="heading-lg" style={{ marginTop: 16 }}>Tu diagnóstico incluye</h2>
            </div>
            <div className={`grid-2 ${styles.benefitsGrid}`} style={{ marginTop: 48 }}>
              {[
                { title: 'Identificación de procesos automatizables', desc: 'Los 5 procesos de tu empresa con mayor potencial de automatización, priorizados por impacto.' },
                { title: 'Estimación de tiempo ahorrado', desc: 'Calculamos cuántas horas semanales recuperaría tu equipo con los asistentes implementados.' },
                { title: 'Asistentes de IA recomendados', desc: 'Qué herramientas implementar primero, con funciones específicas para tu tipo de negocio.' },
                { title: 'Roadmap claro por fases', desc: 'Un plan concreto en 3 etapas (0-30, 30-90, 90+ días) para escalar la IA en tu empresa.' },
              ].map((item, i) => (
                <div key={i} className={`card ${styles.benefitCard}`}>
                  <div className={styles.benefitCheck}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8L6.5 11.5L13 5" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="heading-sm">{item.title}</h3>
                    <p style={{ color: 'var(--text-3)', marginTop: 8, fontSize: '0.88rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ─────────────────────────────────── */}
        <section className={`section ${styles.ctaSection}`}>
          <div className="container">
            <div className={styles.ctaBox}>
              <div className={styles.ctaGlow} />
              <div className="badge">Gratis, sin compromiso</div>
              <h2 className="heading-lg" style={{ marginTop: 20 }}>
                Obtén tu plan de implementación<br />personalizado ahora
              </h2>
              <p style={{ color: 'var(--text-3)', marginTop: 16, maxWidth: 480 }}>
                En menos de 5 minutos tenés un diagnóstico completo de cómo la IA puede transformar tu empresa.
              </p>
              <Link href="/lead" className="btn-primary" style={{ marginTop: 32 }}>
                Obtener mi plan de implementación
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
          <img src="/images/logo-elbufalo.png" alt="Elbufalo IA" style={{ height: 56, width: 'auto' }} />
          <p style={{ color: 'var(--text-4)', fontSize: '0.78rem' }}>Producto desarrollado por Elbufalo IA</p>
        </div>
      </footer>
    </>
  );
}
