import { createUser } from '@/lib/airtable';

export async function POST(request) {
    try {
        const body = await request.json();
        const { nombre, email, whatsapp, empresa, rol, industria, tamano_equipo } = body;

        if (!nombre || !email || !empresa) {
            return Response.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        const userId = await createUser({ nombre, email, whatsapp, empresa, rol, industria, tamano_equipo });

        return Response.json({ success: true, user_id: userId });
    } catch (error) {
        console.error('Error en /api/lead:', error);
        return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
