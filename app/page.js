'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

export default function AgencyHome() {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [submitted, setSubmitted] = useState(false);
    const carouselRef = useRef(null);

    useEffect(() => {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) return;

        const interval = setInterval(() => {
            if (carouselRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
                const maxScroll = scrollWidth - clientWidth;

                if (scrollLeft >= maxScroll - 10) {
                    carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    carouselRef.current.scrollBy({ left: 374, behavior: 'smooth' });
                }
            }
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://formspree.io/f/xdawkjpp', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            setSubmitted(true);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/">
                        <img src="/images/logo-elbufalo.png" alt="Elbufalo IA - Agencia de inteligencia artificial" style={{ height: 44, width: 'auto', display: 'block' }} />
                    </Link>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <a href="#contacto" className="btn-secondary hide-mobile" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                            Más información
                        </a>
                        <a href="#contacto" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                            Agendar Cita
                        </a>
                    </div>
                </div>
            </nav>

            <main>
                {/* HERO */}
                <section className={styles.hero}>
                    <div className="container">
                        <div className={styles.heroInner}>
                            <div className="badge animate-fade-up" style={{ animationDelay: '0ms' }}>
                                Agencia de Automatización con IA
                            </div>
                            <h1 className={`heading-xl animate-fade-up ${styles.heroTitle}`} style={{ animationDelay: '80ms' }}>
                                Multiplicá la eficiencia de tu empresa con <span>Inteligencia Artificial</span>
                            </h1>
                            <p className={`animate-fade-up ${styles.heroSub}`} style={{ animationDelay: '160ms' }}>
                                Ayudamos a PyMEs, comercios y emprendedores a agilizar sus procesos, mejorar sus ventas y delegar tareas repetitivas en asistentes virtuales inteligentes.
                            </p>
                            <div className={`animate-fade-up ${styles.heroCtas}`} style={{ animationDelay: '240ms' }}>
                                <a href="#contacto" className="btn-primary">Agendar Cita Gratis</a>
                                <a href="#servicios" className="btn-secondary">Ver Servicios</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.heroGlow} />
                </section>

                {/* HIGHLIGHT BANNER: Optimizador/Diagnóstico */}
                <section style={{ padding: '0 24px', zIndex: 10, position: 'relative' }}>
                    <div className="container">
                        <div className={`animate-fade-up ${styles.highlightBanner}`} style={{ animationDelay: '320ms' }}>
                            <div className={styles.cyanBadge}>
                                Herramienta Gratuita
                            </div>
                            <h2 className="heading-lg" style={{ marginBottom: 24, textWrap: 'balance' }}>
                                Descubrí tu potencial de <span className={styles.highlightCyan}>automatización</span> en 5 minutos
                            </h2>
                            <p style={{ color: 'var(--text-3)', maxWidth: 400, margin: '0 auto 32px', fontSize: '1rem', lineHeight: '1.6' }}>
                                ¿No estás seguro por dónde empezar? Probá nuestro recomendador interactivo con IA y recibí un diagnóstico exacto de qué procesos de tu negocio podés automatizar hoy mismo.
                            </p>
                            <Link href="/diagnostico" className={styles.cyanButtonBtn}>
                                Probar Optimizador Gratis
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                                    <path d="M5 12h14"></path>
                                    <path d="M12 5l7 7-7 7"></path>
                                </svg>
                            </Link>

                            <div className={styles.socialProof}>
                                <div className={styles.avatars}>
                                    <div className={styles.avatarCircle}></div>
                                    <div className={styles.avatarCircle}></div>
                                    <div className={styles.avatarCircle}></div>
                                </div>
                                <span className={styles.socialText}>+100 empresas optimizadas</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SERVICIOS */}
                <section className="section" id="servicios">
                    <div className="container">
                        <div className="sectionHeader" style={{ textAlign: 'center', marginBottom: 64 }}>
                            <div className="badge">Nuestros Servicios</div>
                            <h2 className="heading-lg" style={{ marginTop: 16 }}>
                                Soluciones a medida para hacer crecer tu negocio
                            </h2>
                        </div>

                        <div className={styles.servicesCarousel} ref={carouselRef}>
                            {[
                                {
                                    num: '1',
                                    image: '/images/chat.jpg',
                                    title: 'Atención 24/7 en WhatsApp',
                                    desc: 'Asistente de Inteligencia Artificial que responde rápido a tus clientes, resuelve dudas y te agenda turnos sin que tengas que estar pendiente del celular.',
                                },
                                {
                                    num: '2',
                                    image: '/images/leads.jpg',
                                    title: 'Búsqueda de Nuevos Clientes',
                                    desc: 'Encontramos clientes ideales para tu negocio usando IA y les escribimos mensajes personalizados de forma automática para generar interés.',
                                },
                                {
                                    num: '3',
                                    image: '/images/redes.jpg',
                                    title: 'Redes Sociales en Piloto Automático',
                                    desc: 'Automatizá tu Instagram o Facebook. Le pasás una foto a la IA desde el celular, y se encarga de escribir un texto vendedor y publicarlo por vos.',
                                },
                                {
                                    num: '4',
                                    image: '/images/admin.jpg',
                                    title: 'Cobranzas y Tareas Administrativas',
                                    desc: 'Olvídate de mandar recordatorios de pago a mano. El sistema sabe cuándo vencen y envía los avisos por WhatsApp o email amablemente. También automatizamos el ingreso de facturas, entre otras muchas actividades. Consultanos.',
                                },
                                {
                                    num: '5',
                                    image: '/images/sistemas.jpg',
                                    title: 'Sistemas a tu Medida',
                                    desc: 'Creamos soluciones personalizadas para tu forma de trabajar, para que no pierdas horas organizando datos en planillas complicadas.',
                                },
                                {
                                    num: '6',
                                    image: '/images/web.jpg',
                                    title: 'Diseño Web para Ventas',
                                    desc: 'Actualizamos o creamos tu sitio web y landing pages con un diseño moderno enfocado 100% en captar clientes, igual que esta página.',
                                },
                                {
                                    num: '7',
                                    image: '/images/tienda.jpg',
                                    title: 'Tu Tienda Online Automática',
                                    desc: 'Implementamos tiendas virtuales completas que se encargan de vender tus productos 24/7 sin que tengas que intervenir en el proceso.',
                                }
                            ].map((item, i) => (
                                <div key={i} className={styles.carouselCard}>
                                    <div className={styles.carouselImageArea} style={{ backgroundImage: `url(${item.image})` }}>
                                        <div className={styles.carouselImageOverlay} />
                                        <div className={styles.carouselPill}>
                                            <span>Módulo {item.num}</span>
                                        </div>
                                    </div>
                                    <div className={styles.carouselContent}>
                                        <h3 className={styles.carouselTitle}>{item.title}</h3>
                                        <p className={styles.carouselDesc}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* REVIEWS */}
                <section className={`section-alt ${styles.reviewsSection}`}>
                    <div className="container">
                        <div className="sectionHeader" style={{ textAlign: 'center', marginBottom: 64 }}>
                            <div className="badge">Testimonios</div>
                            <h2 className="heading-lg" style={{ marginTop: 16 }}>
                                Empresas que ya escalaron con Elbufalo IA
                            </h2>
                        </div>

                        <div className={`grid ${styles.reviewsGrid}`}>
                            {[
                                {
                                    initials: 'MS',
                                    name: 'Martín S.',
                                    role: 'Dueño de Inmobiliaria',
                                    review: 'Implementamos el chatbot conversacional para WhatsApp y nos filtó el 80% de las consultas básicas. Pasamos a derivar a los asesores solo prospectos calificados con turno agendado.'
                                },
                                {
                                    initials: 'CV',
                                    name: 'Carolina V.',
                                    role: 'Consultorio Médico',
                                    review: 'Dejamos de perder horas confirmando y cancelando turnos a mano. Ahora la IA avisa, reprograma avisando las políticas y actualiza nuestro Google Calendar al instante.'
                                },
                                {
                                    initials: 'RP',
                                    name: 'Roberto P.',
                                    role: 'Servicios Logísticos',
                                    review: 'El sistema de seguimiento de cobranzas nos cambió la vida. Nos daba vergüenza reclamar pagos a clientes recurrentes, la IA lo hace perfecto y amigable. Recuperamos un 30% de pasivo.'
                                }
                            ].map((rev, i) => (
                                <div key={i} className={styles.reviewCard}>
                                    <div className={styles.reviewText}>
                                        {rev.review}
                                    </div>
                                    <div className={styles.reviewerInfo}>
                                        <div className={styles.reviewerAvatar}>{rev.initials}</div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'var(--text)' }}>{rev.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-4)' }}>{rev.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTACTO */}
                <section className={styles.contactSection} id="contacto">
                    <div className={styles.contactGlow} />
                    <div className={`container ${styles.contactContainer}`}>
                        <div>
                            <div className="badge">Demos el siguiente paso</div>
                            <h2 className="heading-lg" style={{ marginTop: 20, marginBottom: 24 }}>
                                Transformá tu empresa. Dejá que la IA trabaje por vos.
                            </h2>
                            <p style={{ color: 'var(--text-3)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 32 }}>
                                Agendemos una llamada para entender las necesidades específicas de tu rubro. Analizamos cuellos de botella y te proponemos soluciones rentables y listas para operar.
                            </p>

                            <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
                                <a href="#contacto" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    Agendar Cita Directa
                                </a>
                            </div>
                        </div>

                        <div className={styles.contactForm}>
                            <h3 className="heading-md" style={{ marginBottom: 8 }}>Quiero recibir más info</h3>
                            <p style={{ color: 'var(--text-3)', fontSize: '0.9rem', marginBottom: 24 }}>
                                Dejanos tus datos si preferís que te contactemos nosotros primero por WhatsApp o Email.
                            </p>

                            {submitted ? (
                                <div style={{ padding: 24, textAlign: 'center', backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid var(--gold)', borderRadius: 16 }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px' }}>
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                    <h4 style={{ color: 'var(--text)', fontSize: '1.1rem', marginBottom: 8 }}>¡Mensaje Enviado!</h4>
                                    <p style={{ color: 'var(--text-3)', fontSize: '0.9rem' }}>Un asesor de Elbufalo IA se pondrá en contacto pronto.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Nombre completo</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className={styles.formInput}
                                            placeholder="Ej: Juan Pérez"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Teléfono / WhatsApp</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            className={styles.formInput}
                                            placeholder="+54 9 11 0000-0000"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className={styles.formInput}
                                            placeholder="tu@negocio.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                                        Enviar mis datos
                                    </button>
                                    <p style={{ color: 'var(--text-4)', fontSize: '0.8rem', textAlign: 'center', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                        Tus datos son 100% confidenciales y están protegidos.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer" style={{ borderTop: '1px solid var(--bg-3)' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
                    <img src="/images/logo-elbufalo.png" alt="Elbufalo IA" style={{ height: 64, width: 'auto' }} />
                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        <a href="mailto:elbufaloia@gmail.com" style={{ color: 'var(--text-3)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                            elbufaloia@gmail.com
                        </a>
                        <a href="https://wa.me/541157083080" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-3)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path></svg>
                            +54 11 5708-3080
                        </a>
                    </div>
                    <p style={{ color: 'var(--text-4)', fontSize: '0.78rem' }}>Transformando PyMEs con Inteligencia Artificial &copy; 2026</p>
                </div>
            </footer>
        </>
    );
}
