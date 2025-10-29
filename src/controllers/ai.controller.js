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
              Eres un asistente técnico especializado en generar descripciones prácticas y detalladas para tareas de desarrollo o trabajo.
              A partir del título de una tarea, crea una breve descripción (máximo 255 caracteres) que enumere los pasos o acciones concretas necesarias para completarla.
              Usa un lenguaje claro y conciso, sin frases motivacionales ni adornos. No uses emoticones.
              Ejemplo:
              Título: "Crear aplicación en Java con Spring Boot"
              Descripción: "Generar pom.xml con dependencias, crear entidades, repositorios, servicios y controladores básicos."
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
