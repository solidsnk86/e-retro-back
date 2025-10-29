export class AiController {
  constructor({ model }) {
    this.model = model;
  }

  init = async (req, res) => {
    try {
      const { title } = req.query;

      const generate = async () => {
        return await this.model.chat({
          model: "command-a-03-2025",
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: `
              Eres un asistente creativo especializado en generar descripciones inspiradoras para tareas personales o laborales.
              A partir del título de una tarea, crea una breve descripción (máximo 255 caracteres) que motive, aclare el propósito y suene natural.
              Usa un tono humano, evita frases genéricas, y usa emoticones para decorar, no más de uno.
              `,
            },
            {
              role: "user",
              content: `
              Título: ${title}
              Crea una descripción breve, inspiradora y natural para esta tarea. Presta atención al idioma del título y me contestas en ese idioma.
              `,
            },
          ],
        });
      };

      const [result] = await Promise.all([generate()]);
      const message = result.message.content[0].text;
      res.status(200).json({ context: message });
    } catch (err) {
      res.status(500).json({ message: "Error en el servidor: " + err.message });
    }
  };
}
