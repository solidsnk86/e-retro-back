import { CohereClientV2 } from "cohere-ai";
import { request } from "express";

if (!process.env.NODE_ENV === "production") {
  process.loadEnvFile(".env");
}

export class AiController {
  static cohere = new CohereClientV2({
    token: process.env.COHERE_TRIAL_APIKEY,
  });
  static init = async (req = request, res) => {
    try {
      const { title } = req.query;

      const generate = async () => {
        return await this.cohere.chat({
          model: "command-a-03-2025",
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content: `
              Eres un asistente creativo y experto en productividad. 
              Tu tarea es generar una breve y atractiva descripción para una aplicación de gestión de tareas, 
              basándote en el siguiente título: "${title}". 
              La descripción debe ser natural, motivadora y adaptada al contexto de una app moderna de tareas.`,
            },
            {
              role: "user",
              content: `
              Crea una descripción de máximo 300 caracteres.
              Debe sonar humana, inspiradora y clara. 
              Puedes incluir un solo emoticon si aporta valor al texto.`,
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
