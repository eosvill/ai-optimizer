import { createWizardResponse, createBlueprint } from '@/lib/airtable';
import { generateBlueprint } from '@/lib/gemini';

export const maxDuration = 60;

export async function POST(request) {
    try {
        const body = await request.json();
        const { user_id, lead_data, respuestas } = body;

        if (!user_id || !respuestas) {
            return Response.json({ error: 'Faltan datos requeridos' }, { status: 400 });
        }

        // 1. Guardar respuestas del wizard en Airtable
        const wizardResponseId = await createWizardResponse(user_id, respuestas);

        // 2. Generar blueprint con OpenAI
        const blueprint = await generateBlueprint(lead_data || {}, respuestas);

        // 3. Guardar blueprint en Airtable
        const blueprintId = await createBlueprint(user_id, wizardResponseId, blueprint);

        return Response.json({
            success: true,
            blueprint_id: blueprintId,
            blueprint,
        });
    } catch (error) {
        console.error('Error en /api/diagnostico:', error);
        return Response.json({ error: 'Error al generar el diagnóstico' }, { status: 500 });
    }
}
