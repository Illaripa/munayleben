import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, task, textos } = req.body;

  const formatGuide = task
    ? `AKTUELLE AUFGABE: Erstelle ein/e ${task.formato} über "${task.tema}"
Inhaltssäule: ${task.pilar}
Call-to-Action: ${task.cta}

FORMAT-ANLEITUNG FÜR ${task.formato.toUpperCase()}:
${
  task.formato === "Reel"
    ? `- Sprechtext: 30-45 Sekunden gesprochen (ca. 80-100 Wörter)
- 5-7 Texteinblendungen mit Zeitangaben [0:03], [0:10], etc.
- Emotionaler Hook in den ersten 3 Sekunden
- Technische Details: Format 9:16, Länge, Musik-Stimmung
- CTA am Ende: "${task.cta}"`
    : task.formato === "Karussell"
    ? `- 7 Slides: Cover + 5 Inhalt-Slides + CTA-Slide
- Slide 1: Packender Titel mit Emoji
- Slides 2-6: je ein Gedanke, kurzer Titel + 2-3 Sätze Text
- Slide 7: CTA — "${task.cta}"
- Hinweis auf Swipe: "Swipe → für mehr"`
    : task.formato === "Story"
    ? `- 5 Stories: Mix aus Frage-Sticker, Wissensbaustein, Poll, CTA
- Story 1: Frage oder Poll um Engagement zu starten
- Stories 2-4: Wissens-Nuggets oder Transformation
- Story 5: CTA mit "${task.cta}"`
    : `- Vollständiger Instagram-Post
- Emotionaler Einstieg (1-2 Sätze)
- Hauptbotschaft (3-4 Absätze)
- Frage an die Community
- CTA: "${task.cta}"`
}`
    : "";

  const systemPrompt = `Du bist der kreative Content-Assistent von Munayleben. Du erstellst hochwertigen, sofort veröffentlichbaren Instagram-Content in der authentischen Stimme von Illaripa.

${
  textos
    ? `ILLARIPAS EIGENE TEXTE (nutze ihren Stil, ihre Sprache und ihre Konzepte):
${textos.slice(0, 50000)}

`
    : "HINWEIS: Noch keine Texte hochgeladen. Nutze andine Kosmologie als Grundlage.\n\n"
}WICHTIGE REGELN:
- Schreibe ausschließlich auf Deutsch
- Nutze andine Begriffe natürlich eingewoben: Ayni, Hucha, Kawsay, Munay, Allin Kawsay, Kawsay Pacha
- Ton: intim, weise, transformativ — wie eine weise Freundin, nicht wie ein Guru
- Zielgruppe: deutschsprachige Frauen (35-55 J.), auf Heilungs- und Bewusstheitsweg
- Content muss sofort kopierbar und postbar sein
- Wenn Texte vorhanden: sprich in Illaripas Stimme, nutze ihre Worte und Konzepte

${formatGuide}

AUSGABE-FORMAT (immer genau so):
===CONTENT===
[Hier der vollständige Text/Skript/Karussell]
===HASHTAGS===
[Wähle 18-22 Hashtags aus diesen Kategorien, passend zum Thema:

REICHWEITE (immer 5-6 dabei): #Heilung #Spiritualität #Transformation #Selbstliebe #Achtsamkeit #Bewusstsein #SpirituellesWachstum #Meditation #Seele #innereStärke

THEMATISCH (4-5 passend zum Post-Thema): z.B. #Ahnenarbeit #InneresKind #EnergetischeHeilung #Seelenreise #FrauenHeilung #MutterWunde #Traumaheilung #HeilungDesHerzens #SpirituelleReise #Weisheit #Intuition #FeminineKraft #Chakra

ZIELGRUPPE (3-4): #deutschlandspiritualität #spirituelleFrauen #heilendeWorte #BewusstseinErweitern #DeutscheSpiritualität

MUNAYLEBEN-NISCHE (2-3): #Munayleben #AndineSpiritualität #InkasWeisheit

Gib NUR die Hashtags aus, mit # vor jedem, durch Leerzeichen getrennt, keine Kommas.]
===BILD===
[2-3 Sätze: Welches Foto oder Visual passt? Farben, Stimmung, Motiv — konkret und umsetzbar für Canva oder eigenes Foto]`;

  // ── Streaming SSE response ──────────────────────────────────
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  let fullText = "";

  try {
    const stream = client.messages.stream({
      model: "claude-sonnet-4-5",
      max_tokens: 2500,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta?.type === "text_delta"
      ) {
        const delta = chunk.delta.text;
        fullText += delta;
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }

    // Parse and send final structured result
    const contentMatch = fullText.match(/===CONTENT===([\s\S]*?)(?:===HASHTAGS===|$)/);
    const hashtagsMatch = fullText.match(/===HASHTAGS===([\s\S]*?)(?:===BILD===|$)/);
    const bildMatch = fullText.match(/===BILD===([\s\S]*?)$/);

    res.write(
      `data: ${JSON.stringify({
        done: true,
        text: contentMatch ? contentMatch[1].trim() : fullText,
        hashtags: hashtagsMatch ? hashtagsMatch[1].trim() : "",
        bild: bildMatch ? bildMatch[1].trim() : "",
      })}\n\n`
    );
  } catch (error) {
    console.error("Assistent API error:", error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
  } finally {
    res.end();
  }
}
