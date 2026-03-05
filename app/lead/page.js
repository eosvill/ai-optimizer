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
        nombre: '', email: '', whatsapp: '',
        empresa: '', rol: '', industria: '', tamano_equipo: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.nombre.trim()) e.nombre = 'El nombre es requerido';
        if (!form.email.trim()) e.email = 'El email es requerido';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
        if (!form.empresa.trim()) e.empresa = 'El nombre de la empresa es requerido';
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
        setLoading(true);
        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                sessionStorage.setItem('user_id', data.user_id);
                sessionStorage.setItem('lead_data', JSON.stringify(form));
                router.push('/cuestionario');
            } else {
                setErrors({ general: data.error || 'Ocurrió un error. Intentá de nuevo.' });
            }
        } catch {
            setErrors({ general: 'Error de conexión. Intentá de nuevo.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <Link href="/" className="nav-logo">AI Operations <span>Optimizer</span></Link>
                </div>
            </nav>

            <main className={styles.main}>
                <div className="container">
                    <div className={styles.wrapper}>
                        <div className={styles.header}>
                            <div className="badge">Paso 1 de 2</div>
                            <h1 className="heading-lg" style={{ marginTop: 16 }}>Antes de empezar, contanos sobre vos</h1>
                            <p style={{ color: 'var(--text-3)', marginTop: 8 }}>
                                Usamos estos datos para personalizar tu diagnóstico y enviarte los resultados.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate className={styles.form}>
                            {errors.general && (
                                <div className={styles.errorBanner}>{errors.general}</div>
                            )}

                            <div className="grid-2" style={{ gap: 16 }}>
                                <Field label="Nombre" error={errors.nombre}>
                                    <input className="form-input" type="text" placeholder="Tu nombre" value={form.nombre}
                                        onChange={e => handleChange('nombre', e.target.value)} />
                                </Field>
                                <Field label="Email" error={errors.email}>
                                    <input className="form-input" type="email" placeholder="tu@empresa.com" value={form.email}
                                        onChange={e => handleChange('email', e.target.value)} />
                                </Field>
                            </div>

                            <div className="grid-2" style={{ gap: 16 }}>
                                <Field label="WhatsApp (opcional)" error={errors.whatsapp}>
                                    <input className="form-input" type="tel" placeholder="+54 11 1234-5678" value={form.whatsapp}
                                        onChange={e => handleChange('whatsapp', e.target.value)} />
                                </Field>
                                <Field label="Empresa" error={errors.empresa}>
                                    <input className="form-input" type="text" placeholder="Nombre de tu empresa" value={form.empresa}
                                        onChange={e => handleChange('empresa', e.target.value)} />
                                </Field>
                            </div>

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

                            <button type="submit" className="btn-primary" disabled={loading}
                                style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                                {loading ? 'Guardando...' : 'Iniciar diagnóstico'}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
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
