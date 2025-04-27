export default function PoliticaCookies() {
  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Política de Cookies</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">¿Qué son las cookies?</h2>
        <p className="text-gray-700">
          Las cookies son pequeños archivos de texto que se almacenan en tu
          dispositivo al visitar un sitio web. Nos permiten mejorar tu
          experiencia de navegación y ofrecer servicios personalizados.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Tipos de cookies que utilizamos
        </h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>
            <strong>Cookies técnicas:</strong> Necesarias para la navegación y
            funcionamiento del sitio.
          </li>
          <li>
            <strong>Cookies de análisis:</strong> Nos ayudan a analizar el uso
            del sitio y mejorar nuestros servicios.
          </li>
          <li>
            <strong>Cookies de personalización:</strong> Permiten recordar tus
            preferencias y configuraciones.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Cómo gestionar las cookies
        </h2>
        <p className="text-gray-700">
          Puedes configurar tu navegador para aceptar o rechazar las cookies.
          Ten en cuenta que, si rechazas las cookies, algunas funcionalidades
          del sitio pueden no estar disponibles.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Actualizaciones</h2>
        <p className="text-gray-700">
          Esta política puede actualizarse periódicamente. Te recomendamos
          revisarla regularmente para estar informado sobre cómo utilizamos las
          cookies.
        </p>
      </section>
    </main>
  );
}
