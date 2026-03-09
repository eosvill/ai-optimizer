'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight, MessageCircle, Calendar } from 'lucide-react';
import styles from './page.module.css';

const IMPACT_COLORS = { Alto: 'impact-alto', Medio: 'impact-medio', Bajo: 'impact-bajo' };
const PRIORITY_COLORS = { 'Inmediata': 'impact-alto', 'Corto plazo': 'impact-medio', 'Mediano plazo': 'impact-bajo' };

export default function ResultadosPage() {
    const router = useRouter();
    const [blueprint, setBlueprint] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leadData, setLeadData] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [schedulingSent, setSchedulingSent] = useState(false);

    useEffect(() => {
        const raw = sessionStorage.getItem('blueprint');
        const lead = sessionStorage.getItem('lead_data');
        if (!raw) { router.push('/lead'); return; }
        setBlueprint(JSON.parse(raw));
        if (lead) setLeadData(JSON.parse(lead));
        setMounted(true);
    }, [router]);

    if (!mounted || !blueprint) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner" />
            </div>
        );
    }

    return (
        <>
            <nav className="navbar">
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                        <Link href="/" className="nav-logo">Optima<span>IA</span></Link>
                        <Link href="/" style={{ color: 'var(--text-3)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            Volver a Inicio
                        </Link>
                    </div>
                    <div className="badge hide-mobile">Diagnóstico completo</div>
                </div>
            </nav>

            <main className={styles.main}>
                <div className="container">

                    {/* ── HEADER ──────────────────────────────── */}
                    <div className={`${styles.header} animate-fade-up`}>
                        <div className="badge">Blueprint generado</div>
                        <h1 className="heading-lg" style={{ marginTop: 16 }}>
                            Tu diagnóstico de IA{leadData?.empresa ? ` para ${leadData.empresa}` : ''}
                        </h1>
                        {blueprint.resumen_ejecutivo && (
                            <p style={{ color: 'var(--text-3)', marginTop: 12, maxWidth: 640, lineHeight: 1.7 }}>
                                {blueprint.resumen_ejecutivo}
                            </p>
                        )}
                    </div>

                    {/* ── SCORES ──────────────────────────────── */}
                    <div className={`grid-4 ${styles.scoresGrid} animate-fade-up`}>
                        <ScoreCard
                            label="Nivel de Preparación"
                            value={blueprint.ai_readiness_score}
                            suffix="/100"
                            description="Madurez tecnológica de tu empresa"
                        />
                        <ScoreCard
                            label="Potencial de Automatización"
                            value={blueprint.automation_score}
                            suffix="/100"
                            description="Capacidad de automatizar procesos"
                        />
                        <MetricCard
                            label="Ahorro estimado"
                            value={blueprint.ahorro_horas_semana}
                            suffix=" hs/semana"
                            description="Horas recuperadas por el equipo"
                        />
                        <MetricCard
                            label="Impacto anual"
                            value={`$${(blueprint.impacto_anual_usd || 0).toLocaleString('es-AR')}`}
                            suffix=""
                            description="Estimación de valor generado en USD"
                            raw
                        />
                    </div>

                    {/* ── OPORTUNIDADES ────────────────────────── */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <h2 className="heading-md">Top oportunidades de automatización</h2>
                            <p style={{ color: 'var(--text-3)', marginTop: 6, fontSize: '0.9rem' }}>
                                Procesos identificados en tu empresa con mayor potencial de mejora
                            </p>
                        </div>
                        <div className={styles.opportunitiesList}>
                            {(blueprint.oportunidades || []).map((op, i) => (
                                <div key={i} className={`card ${styles.opCard}`}>
                                    <div className={styles.opNum}>{String(i + 1).padStart(2, '0')}</div>
                                    <div className={styles.opContent}>
                                        <div className={styles.opHeader}>
                                            <h3 className="heading-sm">{op.titulo}</h3>
                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                <span className={`badge ${styles.impactBadge} ${IMPACT_COLORS[op.impacto] || ''}`}>
                                                    Impacto {op.impacto}
                                                </span>
                                                <span className="chip">{op.tiempo_implementacion}</span>
                                            </div>
                                        </div>
                                        <p style={{ color: 'var(--text-3)', marginTop: 8, fontSize: '0.88rem', lineHeight: 1.6 }}>
                                            {op.descripcion}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── ASISTENTES ───────────────────────────── */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <h2 className="heading-md">Asistentes de IA recomendados</h2>
                            <p style={{ color: 'var(--text-3)', marginTop: 6, fontSize: '0.9rem' }}>
                                Las herramientas de IA que más impacto tendrían en tu operación
                            </p>
                        </div>
                        <div className="grid-2">
                            {(blueprint.asistentes_recomendados || []).map((asistente, i) => (
                                <div key={i} className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                                        <div>
                                            <h3 className="heading-sm">{asistente.nombre}</h3>
                                            <p style={{ color: 'var(--text-3)', fontSize: '0.83rem', marginTop: 4 }}>{asistente.rol}</p>
                                        </div>
                                        <span className={`badge ${PRIORITY_COLORS[asistente.prioridad] || ''}`} style={{ flexShrink: 0, fontSize: '0.72rem' }}>
                                            {asistente.prioridad}
                                        </span>
                                    </div>
                                    <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {(asistente.funciones || []).map((f, j) => (
                                            <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.85rem', color: 'var(--text-3)' }}>
                                                <svg style={{ flexShrink: 0, marginTop: 3 }} width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M2 6L5 9L10 3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── ROADMAP ──────────────────────────────── */}
                    <section className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <h2 className="heading-md">Roadmap de implementación</h2>
                            <p style={{ color: 'var(--text-3)', marginTop: 6, fontSize: '0.9rem' }}>
                                Tu plan de acción en 3 fases para implementar IA en tu empresa
                            </p>
                        </div>
                        <div className={styles.roadmap}>
                            {[
                                { key: 'fase1', color: '#4ade80', label: '0 - 30 días' },
                                { key: 'fase2', color: 'var(--gold)', label: '30 - 90 días' },
                                { key: 'fase3', color: '#a78bfa', label: '90+ días' },
                            ].map(({ key, color, label }) => {
                                const fase = blueprint.roadmap?.[key];
                                if (!fase) return null;
                                return (
                                    <div key={key} className={`card ${styles.faseCard}`}>
                                        <div className={styles.faseHeader}>
                                            <div className={styles.faseDot} style={{ background: color }} />
                                            <div>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
                                                <h3 className="heading-sm" style={{ marginTop: 4 }}>{fase.titulo}</h3>
                                            </div>
                                        </div>
                                        <p style={{ color: 'var(--text-3)', fontSize: '0.88rem', marginTop: 12, lineHeight: 1.6 }}>{fase.descripcion}</p>
                                        <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {(fase.acciones || []).map((a, i) => (
                                                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.85rem', color: 'var(--text-2)' }}>
                                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 6 }} />
                                                    {a}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* ── CTA FINAL ────────────────────────────── */}
                    <section className={`${styles.section} ${styles.ctaSection}`}>
                        <div className={styles.ctaBox}>
                            <div className={styles.ctaGlow} />
                            <div className="badge">Siguiente paso</div>
                            <h2 className="heading-lg" style={{ marginTop: 20, maxWidth: 560 }}>
                                Implementá tu estrategia de IA con un equipo especializado
                            </h2>
                            <p style={{ color: 'var(--text-3)', marginTop: 16, maxWidth: 480, lineHeight: 1.7 }}>
                                En una sesión estratégica de 60 minutos revisamos tu diagnóstico, validamos las oportunidades identificadas y definimos juntos el plan de implementación para tu empresa.
                            </p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary"
                                style={{ marginTop: 32, fontSize: '1rem', padding: '16px 32px', cursor: 'pointer' }}>
                                Agendar una cita
                            </button>
                            <p style={{ marginTop: 16, fontSize: '0.78rem', color: 'var(--text-4)' }}>
                                Sin costo. Sin compromiso. 60 minutos enfocados en tu empresa.
                            </p>
                        </div>
                    </section>

                </div>
            </main>

            <footer className="footer">
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                    <img src="/images/logo-elbufalo.png" alt="Elbufalo IA" style={{ height: 56, width: 'auto' }} />
                    <p style={{ color: 'var(--text-4)', fontSize: '0.78rem' }}>Producto desarrollado por Elbufalo IA</p>
                </div>
            </footer>

            {/* ── MODAL DE AGENDAMIENTO ───────────────────────── */}
            {isModalOpen && (
                <div
                    className={styles.modalBackdrop}
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className={`card animate-fade-up ${styles.modalContent}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 className="heading-md" style={{ marginBottom: 12, textAlign: 'center' }}>¿Cómo preferís avanzar?</h3>
                        <p style={{ color: 'var(--text-3)', textAlign: 'center', marginBottom: 32, fontSize: '0.9rem' }}>
                            Elegí la opción más cómoda para coordinar tu sesión estratégica gratuita de 60 minutos.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {
                                <a
                                    href={`https://wa.me/541157083080?text=${encodeURIComponent(`Hola! Soy ${leadData?.nombre || ''} de la empresa ${leadData?.empresa || ''}. Acabo de hacer el diagnóstico de IA y me gustaría agendar una llamada telefónica.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary"
                                    style={{ justifyContent: 'center', gap: 12, padding: '18px 24px', textDecoration: 'none' }}
                                >
                                    <Calendar size={20} />
                                    Agendar llamada telefónica
                                </a>
                            }

                            <a
                                href={`https://wa.me/541157083080?text=${encodeURIComponent(`Hola! soy ${leadData?.nombre || ''} de ${leadData?.empresa || ''}, hice el diagnóstico en línea y quería más información`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                                style={{ justifyContent: 'center', gap: 12, padding: '18px 24px', background: '#222222', borderColor: '#333333', color: '#FFFFFF', borderRadius: '12px' }}
                            >
                                <MessageCircle size={20} color="#25D366" />
                                Hablar por WhatsApp ahora
                            </a>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                marginTop: 24,
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-4)',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center',
                                fontSize: '0.85rem'
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

function ScoreCard({ label, value, suffix, description }) {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = value || 0;
        const duration = 1200;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setDisplay(end); clearInterval(timer); }
            else setDisplay(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [value]);

    const pct = Math.min(100, Math.max(0, value || 0));
    const radius = 52;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (pct / 100) * circ;

    return (
        <div className={`card ${styles.scoreCard}`}>
            <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--bg-4)" strokeWidth="8" />
                <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--gold)" strokeWidth="8"
                    strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
                    transform="rotate(-90 60 60)"
                    style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
                <text x="60" y="58" textAnchor="middle" fill="white" fontSize="20" fontWeight="800" fontFamily="Inter">{display}</text>
                <text x="60" y="74" textAnchor="middle" fill="var(--text-4)" fontSize="10" fontFamily="Inter">{suffix}</text>
            </svg>
            <div style={{ marginTop: 12, textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-2)' }}>{label}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-4)', marginTop: 4 }}>{description}</p>
            </div>
        </div>
    );
}

function MetricCard({ label, value, suffix, description, raw }) {
    return (
        <div className={`card ${styles.metricCard}`}>
            <div className="score-number">{raw ? value : value}{!raw && suffix}</div>
            <div style={{ marginTop: 12 }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-2)' }}>{label}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-4)', marginTop: 4 }}>{description}</p>
            </div>
        </div>
    );
}
