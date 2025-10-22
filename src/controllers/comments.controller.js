import { CREATE_COMMENT, GET_ALL_COMMETS } from "./constants.js";

export class CommentsController {
  constructor({ authDB }) {
    this.authDB = authDB;
  }

  getFirtsRow = (result) => result?.rows?.[0] || result[0];

  getAllCommets = async (req, res) => {
    try {
      const results = await this.authDB.query(GET_ALL_COMMETS);
      if (results.length === 0) res.status(409).json({ message: "No hay comentarios" })
      const comments = this.getFirtsRow(results)
      res.status(200).json(comments)
    } catch (err) {
      res.status(500).json({ message: "Error al obtener comentarios" });
    }
  };

  createComment = async (req, res) => {
    try {
      const { title, message } = req.body
      if (!title || !message) res.status(400).json({ message: "Campos vacíos" })
      const result = await this.authDB.query(CREATE_COMMENT, [title, message]);
      const comment = this.getFirtsRow(result)
      res.status(200).json({ message: "Comentario creado con éxito", comment })
    } catch (err) {
      res.status(500).json({ message: "Error al obtener comentarios" });
    }
  };
}
