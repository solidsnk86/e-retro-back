export class AiController { 
  constructor ({ model }) {
    this.model = model
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
              content:
                "Eres un experto creando descripciones para una aplicación de tareas a partir de éste título: " +
                title,
            },
            {
              role: "user",
              content: "Crea una breve descripción para mi tarea, no más de 300 caracteres...Puedes usar un solo emoticon.",
            },
          ],
        });
      };

      const [result] = await Promise.all([generate()]);
      const message = result.message.content[0].text
      res.status(200).json({ context: message });
    } catch (err) {
      res.status(500).json({ message: "Error en el servidor: " + err.message });
    }
  };
}
