import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(req: Request) {
  try {
    const { locale } = await req.json();

    const priceId = "price_1RIBdrQ5T5h2nSDtxexRbuFF";

    // Crea una nueva sesión de Stripe checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/${locale}/checkout/cancel`,
    });

    // Devuelve la URL de la sesión
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error al crear una sesión de Stripe checkout:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

// GET api para recuperar los datos de la sesión de Stripe
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      return new Response("El Session ID es necesario", { status: 400 });
    }

    // Recupera los datos de la sesión de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId); // Log the session object for debugging
    console.log("Stripe session:", session);

    if (!session) {
      return new Response("Sesión de Stripe no encontrada", { status: 404 });
    }

    // Devuelve los datos de la sesión
    const customerEmail = session.customer_details?.email;
    const paymentStatus = session.payment_status;

    return new Response(JSON.stringify({ customerEmail, paymentStatus }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error al recuperar la sesión de Stripa:", err);
    return new Response("No se ha podido recuperar la sesión de Stripe", {
      status: 500,
    });
  }
}
