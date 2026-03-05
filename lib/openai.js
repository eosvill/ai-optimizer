import OpenAI from 'openai';

// La SDK de OpenAI es 100% compatible con DeepSeek cambiando la URL base
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://api.deepseek.com/v1'
});

export async function generateBlueprint(leadData, respuestas) {
  const prompt = buildPrompt(leadData, respuestas);

  const completion = await client.chat.completions.create({
    model: 'deepseek-chat',
    temperature: 0.7,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Sos un consultor senior especialista en implementación de IA empresarial para empresas latinoamericanas.
Tu tarea es analizar la información de una empresa y generar un blueprint personalizado de implementación de IA.
SIEMPRE respondé en español rioplatense.
Respondé ÚNICAMENTE con un objeto JSON válido con exactamente esta estructura:

{
  "ai_readiness_score": número entre 0 y 100,
  "automation_score": número entre 0 y 100,
  "ahorro_horas_semana": número estimado de horas que se ahorrarían por semana,
  "impacto_anual_usd": número estimado del impacto económico anual en USD,
  "resumen_ejecutivo": "Párrafo breve (2-3 oraciones) resumiendo el diagnóstico de la empresa",
  "oportunidades": [
    {
      "titulo": "nombre del proceso a automatizar",
      "descripcion": "descripción breve de la oportunidad",
      "impacto": "Alto | Medio | Bajo",
      "tiempo_implementacion": "1-2 semanas | 2-4 semanas | 1-3 meses"
    }
  ],
  "asistentes_recomendados": [
    {
      "nombre": "nombre del asistente de IA",
      "rol": "rol o función principal",
      "funciones": ["función 1", "función 2", "función 3"],
      "prioridad": "Inmediata | Corto plazo | Mediano plazo"
    }
  ],
  "roadmap": {
    "fase1": {
      "titulo": "Quick Wins (0-30 días)",
      "descripcion": "descripción de acciones inmediatas",
      "acciones": ["acción 1", "acción 2", "acción 3"]
    },
    "fase2": {
      "titulo": "Optimización (30-90 días)",
      "descripcion": "descripción de optimizaciones",
      "acciones": ["acción 1", "acción 2", "acción 3"]
    },
    "fase3": {
      "titulo": "IA Avanzada (90+ días)",
      "descripcion": "descripción de implementaciones avanzadas",
      "acciones": ["acción 1", "acción 2", "acción 3"]
    }
  }
}

Incluí exactamente 5 oportunidades y 4 asistentes recomendados. Sé específico y relevante para la industria y tamaño del equipo de esta empresa.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const raw = completion.choices[0].message.content;
  const parsed = JSON.parse(raw);
  return { ...parsed, raw_blueprint: raw };
}

function buildPrompt(leadData, respuestas) {
  return `DATOS DE LA EMPRESA:
- Nombre del contacto: ${leadData.nombre}
- Empresa: ${leadData.empresa}
- Industria: ${leadData.industria}
- Rol: ${leadData.rol}
- Tamaño del equipo: ${leadData.tamano_equipo} personas

RESPUESTAS DEL DIAGNÓSTICO:
${Object.entries(respuestas)
      .map(([pregunta, respuesta]) => `- ${pregunta}: ${Array.isArray(respuesta) ? respuesta.join(', ') : respuesta}`)
      .join('\n')}

Basándote en esta información, generá un blueprint de implementación de IA personalizado para esta empresa.`;
}
