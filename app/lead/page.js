'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const INDUSTRIAS = [
    'Tecnología / Software',
    'Comercio y Retail',
    'Servicios profesionales',
    'Gastronomía / Hospitalidad',
    'Salud y Bienestar',
    'Educación',
    'Construcción / Inmobiliario',
    'Logística y Transporte',
    'Marketing y Publicidad',
    'Finanzas y Contabilidad',
    'Manufactura',
    'Otra',
];

const ROLES = [
    'CEO / Fundador',
    'Director / Gerente general',
    'Gerente de operaciones',
    'Gerente comercial / Ventas',
    'Gerente de marketing',
    'Gerente de TI / Tecnología',
    'Consultor / Asesor',
    'Otro',
];

const TAMANOS = ['1-5', '6-20', '21-50', '51-100', '100+'];

export default function LeadPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        rol: '', industria: '', tamano_equipo: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.rol) e.rol = 'Seleccioná tu rol';
        if (!form.industria) e.industria = 'Seleccioná la industria';
        if (!form.tamano_equipo) e.tamano_equipo = 'Seleccioná el tamaño del equipo';
        return e;
    };

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

        // Save partial data and move to the questionnaire
        sessionStorage.setItem('lead_data_partial', JSON.stringify(form));
        router.push('/cuestionario');
    };

    return (
        <>
            <nav className="navbar">
                <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <Link href="/" className="nav-logo">Optima<span>IA</span></Link>
                    <Link href="/" style={{ color: 'var(--text-3)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        Volver a Inicio
                    </Link>
                </div>
            </nav>

            <main className={styles.main}>
                <div className="container">
                    <div className={styles.wrapper}>
                        <div className={styles.header}>
                            <div className="badge">Paso 1 de 2</div>
                            <h1 className="heading-lg" style={{ marginTop: 16 }}>Datos iniciales</h1>
                        </div>

                        <form onSubmit={handleSubmit} noValidate className={styles.form}>
                            {errors.general && (
                                <div className={styles.errorBanner}>{errors.general}</div>
                            )}

                            <Field label="Tu rol en la empresa" error={errors.rol}>
                                <select className="form-select" value={form.rol} onChange={e => handleChange('rol', e.target.value)}>
                                    <option value="">Seleccioná tu rol</option>
                                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </Field>

                            <Field label="Industria" error={errors.industria}>
                                <select className="form-select" value={form.industria} onChange={e => handleChange('industria', e.target.value)}>
                                    <option value="">Seleccioná la industria</option>
                                    {INDUSTRIAS.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </Field>

                            <Field label="Tamaño del equipo" error={errors.tamano_equipo}>
                                <div className={styles.chipGroup}>
                                    {TAMANOS.map(t => (
                                        <button key={t} type="button"
                                            className={`${styles.chipBtn} ${form.tamano_equipo === t ? styles.chipBtnActive : ''}`}
                                            onClick={() => handleChange('tamano_equipo', t)}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                {errors.tamano_equipo && <span className={styles.fieldError}>{errors.tamano_equipo}</span>}
                            </Field>

                            <button type="submit" className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                                Iniciar diagnóstico
                            </button>
                        </form>
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

function Field({ label, error, children }) {
    return (
        <div className="form-group">
            <label className="form-label">{label}</label>
            {children}
            {error && <span style={{ fontSize: '0.78rem', color: '#f87171', marginTop: 2 }}>{error}</span>}
        </div>
    );
}
