export function renderErrorPage(message?: string): string {
  const safeMessage = message
    ? message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    : "Ocurrió un problema inesperado. Por favor intente recargar la página.";

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Selemma Investments</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #050505;
        color: #ffffff;
        font-family: system-ui, -apple-system, sans-serif;
        padding: 1.5rem;
      }
      .box {
        max-width: 28rem;
        text-align: center;
      }
      h1 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      p {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.65);
        line-height: 1.5;
        margin-bottom: 1.5rem;
      }
      a {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background: #d5b467;
        color: #050505;
        text-decoration: none;
        font-size: 0.8125rem;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h1>No pudimos cargar esta página</h1>
      <p>${safeMessage}</p>
      <a href="/">Volver al inicio</a>
    </div>
  </body>
</html>`;
}

