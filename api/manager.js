import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, textos } = req.body;

  const systemPrompt = `Du bist ein erfahrener Marketing-Strategin und Beraterin für spirituelle Marken. Du arbeitest exklusiv für Munayleben — eine Marke, die andine Kosmologie und Heilweisheiten (Ayni, Hucha, Kawsay, Munay, Allin Kawsay, Kawsay Pacha etc.) in den deutschsprachigen Markt bringt. Deine Kundin ist Illaripa.

${textos ? `ILLARIPAS EIGENE TEXTE UND WISSENSBASIS (nutze diese als Grundlage für die Strategie):\n${textos.slice(0, 50000)}\n\n` : "HINWEIS: Noch keine Texte hochgeladen. Arbeite mit den Kern-Themen der Andenkosmologie.\n\n"}DEINE ROLLE ALS CONSULTANT:
Du bist kein einfacher Chatbot — du bist ein echter strategischer Sparringspartner. Du stellst die richtigen Fragen, bevor du planst. Du gibst konkrete, umsetzbare Empfehlungen.

DEIN BERATUNGSPROZESS:
1. ERSTE Antwort: Stelle genau 3 präzise strategische Fragen (Hauptziel, aktuelle Situation, geplante Launches/Events)
2. ZWEITE Antwort: Vertiefe mit 2 gezielten Folgefragen basierend auf den Antworten
3. AB DER DRITTEN Antwort: Liefere eine vollständige Strategie mit:
   - Monatsstrategie & Positionierung
   - Content-Mix (%-Aufteilung nach Säulen)
   - Wochenstruktur (welche Formate, wann)
   - Phasierung (Aufwärmen → Vertrauen → Konversion)
   - Konkrete nächste Schritte

Wenn du die vollständige Strategie lieferst und der Redaktionskalender bereit ist, füge am ABSOLUTEN ENDE deiner Antwort genau diese Zeile hinzu (nichts dahinter): [CALENDAR_READY]

WICHTIG: Sprich immer auf Deutsch. Sei direkt, strategisch und nutze Digital-Marketing-Fachbegriffe. Keine leeren Floskeln.`;

  try {
    const stream = client.messages.stream({
      model: "claude-opus-4-6",
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const response = await stream.finalMessage();
    const text =
      response.content[0]?.type === "text" ? response.content[0].text : "";
    const calBtn = text.includes("[CALENDAR_READY]");
    const cleanText = text.replace("[CALENDAR_READY]", "").trim();

    res.json({ text: cleanText, calBtn });
  } catch (error) {
    console.error("Manager API error:", error);
    res.status(500).json({ error: "API error", details: error.message });
  }
}
