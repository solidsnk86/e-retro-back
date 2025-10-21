export const emailTemplate = ({ userName, url }) => `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenido a doubleCommit taskApp</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: "Inter", "Segoe UI", Arial, sans-serif;
        background-color: #f4f4f7;
        color: #18181b;
        -webkit-text-size-adjust: none;
      }
      table {
        border-spacing: 0;
        width: 100%;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
      }
      .header {
        background: linear-gradient(135deg, #4f46e5, #6366f1);
        color: #ffffff;
        text-align: center;
        padding: 35px 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 26px;
        font-weight: 700;
        letter-spacing: -0.3px;
      }
      .content {
        padding: 40px 35px;
        text-align: center;
      }
      .content h2 {
        font-size: 22px;
        color: #18181b;
        margin-bottom: 12px;
      }
      .content p {
        font-size: 15px;
        color: #3f3f46;
        line-height: 1.6;
        margin: 10px 0;
      }
      .button {
        display: inline-block;
        background: #4f46e5;
        color: #ffffff !important;
        text-decoration: none;
        padding: 14px 28px;
        border-radius: 8px;
        font-weight: 600;
        margin-top: 24px;
        transition: background 0.25s ease;
      }
      .button:hover {
        background: #3730a3;
      }
      .divider {
        width: 70%;
        height: 1px;
        background: #e4e4e7;
        margin: 35px auto;
      }
      .footer {
        background: #fafafa;
        text-align: center;
        font-size: 13px;
        color: #71717a;
        padding: 18px 15px;
        border-top: 1px solid #e4e4e7;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background: #09090b;
          color: #fafafa;
        }
        .container {
          background: #1c1c1f;
          border: 1px solid #27272a;
        }
        .content p,
        .footer {
          color: #a1a1aa;
        }
        .divider {
          background: #27272a;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation">
      <tr>
        <td align="center">
          <div class="container">
            <div class="header"><h1>doubleCommit taskApp</h1></div>
            <div class="content">
              <h2>¡Bienvenido, ${userName}! 🎉</h2>
              <p>
                Nos alegra tenerte en <strong>doubleCommit</strong>. Desde ahora
                podrás crear, organizar y completar tus tareas de forma sencilla
                y eficiente.
              </p>
              <p>
                Cada compromiso doble cuenta — ¡mantén tu progreso y alcanza tus
                metas!
              </p>
              <a href="${url}" class="button">Comenzar ahora</a>
              <div class="divider"></div>
              <p style="font-size: 13px; color: #71717a">
                Si no creaste esta cuenta, puedes ignorar este correo.
              </p>
            </div>
            <div class="footer">
              © 2025 doubleCommit taskApp<br />
              Creado con 💜 para la facultad.
            </div>
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
