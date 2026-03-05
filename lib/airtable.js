import Airtable from 'airtable';

function getBase() {
  return new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN || process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
}

// ──────────────────────────────────────────
// USERS
// ──────────────────────────────────────────
export async function createUser(data) {
  const record = await getBase()('users').create({
    nombre: data.nombre || '',
    email: data.email || '',
    whatsapp: data.whatsapp || '',
    empresa: data.empresa || '',
    rol: data.rol || '',
    industria: data.industria || '',
    tamano_equipo: data.tamano_equipo || '',
  });
  return record.id;
}

// ──────────────────────────────────────────
// WIZARD RESPONSES
// ──────────────────────────────────────────
export async function createWizardResponse(userId, respuestas) {
  const record = await getBase()('wizard_responses').create({
    user_id: userId,
    respuestas: JSON.stringify(respuestas),
  });
  return record.id;
}

// ──────────────────────────────────────────
// BLUEPRINTS
// ──────────────────────────────────────────
export async function createBlueprint(userId, wizardResponseId, blueprint) {
  const record = await getBase()('blueprints').create({
    user_id: userId,
    wizard_response_id: wizardResponseId,
    ai_readiness_score: blueprint.ai_readiness_score,
    automation_score: blueprint.automation_score,
    ahorro_horas_semana: blueprint.ahorro_horas_semana,
    impacto_anual_usd: blueprint.impacto_anual_usd,
    oportunidades: JSON.stringify(blueprint.oportunidades),
    asistentes_recomendados: JSON.stringify(blueprint.asistentes_recomendados),
    roadmap: JSON.stringify(blueprint.roadmap),
    raw_blueprint: blueprint.raw_blueprint || '',
  });
  return record.id;
}
