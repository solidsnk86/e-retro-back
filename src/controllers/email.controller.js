import { readFileSync } from "fs";

export class EmailController {
  contructor({ transporter }) {
    this.transporter = transporter;
  }

  sendMail = async (req, res) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({ message: "Faltan los datos del usaurio" })
    }

    const transporter = this.transporter.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const html = readFileSync("/src/templates/email_template.html", "utf-8");

    template.replace("{{username}}", user.name);
    template.replace(
      "{{loginUrl}}",
      "https://task-app-double-commit.vercel.app/login"
    );

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Bienvenido a doubleCommit taskApp 🚀",
      html,
    });

    res.status(200).json({ message: "Se ha enviado un cooreo a " + user.email + ", revise su casilla de correos 'No deseados' o 'Spam'." })
  };
}
