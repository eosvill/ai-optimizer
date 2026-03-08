'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const QUESTIONS = [
    // Perfil
    { id: 'actividades_principales', section: 'Perfil de la empresa', label: '¿Cuáles son las principales actividades de tu negocio?', type: 'textarea', placeholder: 'Describí brevemente qué hace tu empresa y cómo genera ingresos...' },
    { id: 'herramientas_actuales', section: 'Perfil de la empresa', label: '¿Qué herramientas digitales utilizan actualmente?', type: 'checkbox', options: ['CRM (Salesforce, HubSpot, etc.)', 'Notion / Confluence', 'Slack / Teams', 'Google Workspace', 'Hojas de cálculo (Excel/Sheets)', 'Software de contabilidad', 'ERP', 'Ninguna herramienta digital', 'Otra'] },
    // Operaciones
    { id: 'tiempo_tareas_repetitivas', section: 'Operaciones', label: '¿Cuánto tiempo dedica tu equipo a tareas repetitivas por semana?', type: 'radio', options: ['Menos de 5 horas', '5 a 15 horas', '15 a 30 horas', 'Más de 30 horas'] },
    { id: 'generacion_reportes', section: 'Operaciones', label: '¿Cómo generan los reportes internos actualmente?', type: 'radio', options: ['Manualmente en Excel/Sheets', 'Con herramientas de BI (Tableau, Power BI)', 'Delegado a un área específica', 'No generamos reportes regularmente'] },
    { id: 'procesos_documentados', section: 'Operaciones', label: '¿Tienen procesos operativos documentados?', type: 'radio', options: ['Sí, la mayoría está documentada', 'Algunos están documentados', 'Muy pocos', 'No tenemos documentación'] },
    // Ventas
    { id: 'gestion_leads', section: 'Ventas', label: '¿Cómo gestionan actualmente los leads - clientes potenciales?', type: 'radio', options: ['CRM dedicado', 'Planillas de cálculo', 'Email y notas manuales', 'No tenemos un proceso formal'] },
    { id: 'frecuencia_seguimiento', section: 'Ventas', label: '¿Con qué frecuencia hacen seguimiento a sus leads - clientes potenciales?', type: 'radio', options: ['Seguimiento automático', 'Manual, de forma consistente', 'Manual, pero irregular', 'Casi no hacemos seguimiento'] },
    // Marketing
    { id: 'generacion_contenido', section: 'Marketing', label: '¿Cómo generan contenido de marketing?', type: 'radio', options: ['Equipo interno dedicado', 'Agencia externa', 'El equipo lo hace como tarea secundaria', 'No generamos contenido regularmente'] },
    { id: 'canales_marketing', section: 'Marketing', label: '¿Qué canales de marketing utilizan actualmente?', type: 'checkbox', options: ['Redes sociales', 'Email marketing', 'Google Ads / SEO', 'WhatsApp', 'Referidos', 'Eventos / presencial', 'Ninguno formal'] },
    // Soporte
    { id: 'consultas_semana', section: 'Soporte al cliente', label: '¿Cuántas consultas de clientes reciben por semana?', type: 'radio', options: ['Menos de 20', '20 a 50', '50 a 150', 'Más de 150'] },
    { id: 'canal_soporte', section: 'Soporte al cliente', label: '¿Por qué canal atienden la mayoría de las consultas?', type: 'radio', options: ['WhatsApp', 'Email', 'Teléfono', 'Chat en web', 'Redes sociales', 'Presencial'] },
    // Automatización
    { id: 'procesos_automatizar', section: 'Automatización', label: '¿Qué procesos te gustaría automatizar con mayor urgencia?', type: 'checkbox', options: ['Respuestas a consultas frecuentes', 'Seguimiento de leads - clientes potenciales', 'Generación de reportes', 'Gestión de redes sociales', 'Facturación y cobranzas', 'Onboarding de clientes', 'Gestión de tareas internas', 'Otro'] },
    { id: 'experiencia_ia', section: 'Automatización', label: '¿Cuál es tu nivel de experiencia con herramientas de IA?', type: 'radio', options: ['Nunca usé IA en mi empresa', 'Uso ChatGPT u otras herramientas básicas', 'Tenemos algunas automatizaciones básicas', 'Usamos IA de forma estructurada'] },
];

export default function CuestionarioPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const q = QUESTIONS[step];
    const total = QUESTIONS.length;
    const progress = Math.round(((step) / total) * 100);

    const currentAnswer = answers[q.id];
    const isValid = () => {
        if (q.type === 'textarea') return currentAnswer?.trim()?.length > 0;
        if (q.type === 'radio') return !!currentAnswer;
        if (q.type === 'checkbox') return Array.isArray(currentAnswer) && currentAnswer.length > 0;
        return true;
    };

    const handleRadio = (val) => setAnswers(prev => ({ ...prev, [q.id]: val }));
    const handleCheckbox = (val) => {
        const current = answers[q.id] || [];
        const next = current.includes(val) ? current.filter(v => v !== val) : [...current, val];
        setAnswers(prev => ({ ...prev, [q.id]: next }));
    };
    const handleTextarea = (val) => setAnswers(prev => ({ ...prev, [q.id]: val }));

    const handleNext = () => {
        if (step < total - 1) { setStep(s => s + 1); window.scrollTo(0, 0); }
        else handleSubmit();
    };

    const handleBack = () => { if (step > 0) { setStep(s => s - 1); window.scrollTo(0, 0); } };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const userId = sessionStorage.getItem('user_id');
            const leadData = JSON.parse(sessionStorage.getItem('lead_data') || '{}');

            const formattedAnswers = {};
            QUESTIONS.forEach(q => {
                if (answers[q.id] !== undefined) formattedAnswers[q.label] = answers[q.id];
            });

            const res = await fetch('/api/diagnostico', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, lead_data: leadData, respuestas: formattedAnswers }),
            });
            const data = await res.json();
            if (data.success) {
                sessionStorage.setItem('blueprint', JSON.stringify(data.blueprint));
                router.push('/resultados');
            } else {
                setError(data.error || 'Ocurrió un error. Intentá de nuevo.');
            }
        } catch {
            setError('Error de conexión. Intentá de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingScreen />;
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
                            Inicio
                        </Link>
                    </div>
                    <span style={{ fontSize: '0.83rem', color: 'var(--text-3)' }}>{step + 1} / {total}</span>
                </div>
            </nav>

            <main className={styles.main}>
                <div className="container">
                    <div className={styles.wrapper}>
                        {/* Progress */}
                        <div className={styles.progressSection}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-4)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                    {q.section}
                                </span>
                                <span style={{ fontSize: '0.78rem', color: 'var(--text-4)' }}>{progress}%</span>
                            </div>
                            <div className="progress-bar-track">
                                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                            </div>
                        </div>

                        {/* Question */}
                        <div className={styles.questionBlock}>
                            <h2 className="heading-md">{q.label}</h2>

                            <div className={styles.answerArea}>
                                {q.type === 'radio' && q.options.map(opt => (
                                    <button key={opt} type="button"
                                        className={`${styles.optionBtn} ${currentAnswer === opt ? styles.optionBtnActive : ''}`}
                                        onClick={() => handleRadio(opt)}>
                                        <span className={styles.optionDot} />
                                        {opt}
                                    </button>
                                ))}

                                {q.type === 'checkbox' && q.options.map(opt => {
                                    const checked = (currentAnswer || []).includes(opt);
                                    return (
                                        <button key={opt} type="button"
                                            className={`${styles.optionBtn} ${checked ? styles.optionBtnActive : ''}`}
                                            onClick={() => handleCheckbox(opt)}>
                                            <span className={`${styles.optionCheck} ${checked ? styles.optionCheckActive : ''}`}>
                                                {checked && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4.5 7.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>}
                                            </span>
                                            {opt}
                                        </button>
                                    );
                                })}

                                {q.type === 'textarea' && (
                                    <textarea className={`form-input ${styles.textarea}`}
                                        placeholder={q.placeholder}
                                        value={currentAnswer || ''}
                                        onChange={e => handleTextarea(e.target.value)}
                                        rows={4}
                                    />
                                )}
                            </div>

                            {q.type === 'checkbox' && (
                                <p style={{ fontSize: '0.78rem', color: 'var(--text-4)', marginTop: 8 }}>Podés seleccionar varias opciones.</p>
                            )}
                        </div>

                        {error && <div style={{ padding: '12px 16px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 'var(--radius-sm)', color: '#f87171', fontSize: '0.88rem', marginBottom: 16 }}>{error}</div>}

                        {/* Nav buttons */}
                        <div className={styles.navButtons}>
                            {step > 0 && (
                                <button className="btn-secondary" onClick={handleBack}>Anterior</button>
                            )}
                            <button className="btn-primary" onClick={handleNext} disabled={!isValid()}
                                style={{ marginLeft: 'auto', opacity: isValid() ? 1 : 0.45 }}>
                                {step === total - 1 ? 'Ver mi diagnóstico' : 'Continuar'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="footer">
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                    <img src="/images/logo-elbufalo.png" alt="Elbufalo IA" style={{ height: 56, width: 'auto' }} />
                    <p style={{ color: 'var(--text-4)', fontSize: '0.78rem' }}>Producto desarrollado por Elbufalo IA</p>
                </div>
            </footer>
        </>
    );
}

function LoadingScreen() {
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <Link href="/" className="nav-logo">Optima<span>IA</span></Link>
                </div>
            </nav>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, textAlign: 'center', padding: '0 24px', paddingTop: 64 }}>
                <div className="spinner" />
                <div>
                    <h2 className="heading-md">Analizando tu empresa</h2>
                    <p style={{ color: 'var(--text-3)', marginTop: 8 }}>La IA está construyendo tu blueprint personalizado.<br />Esto puede tardar hasta 30 segundos.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', maxWidth: 320 }}>
                    {['Identificando procesos automatizables...', 'Evaluando madurez tecnológica...', 'Calculando impacto potencial...', 'Construyendo tu roadmap de IA...'].map((msg, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: 'var(--text-3)', animation: `fadeIn 0.4s ${i * 0.5}s both` }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                            {msg}
                        </div>
                    ))}
                </div>
            </div>
            <footer className="footer" style={{ borderTop: 'none', background: 'transparent' }}>
                <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                    <img src="/images/logo-elbufalo.png" alt="Elbufalo IA" style={{ height: 48, width: 'auto' }} />
                    <p style={{ color: 'var(--text-4)', fontSize: '0.75rem' }}>Producto desarrollado por Elbufalo IA</p>
                </div>
            </footer>
        </>
    );
}
