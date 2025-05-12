export async function onRequestPost({ request }) {
  const body = await request.json();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "noreply@angstrom-usa.com",
      to: "gsmith@angstrom-usa.com",
      subject: "New Business Card Order",
      html: `
        <h3>New Business Card Order</h3>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Title:</strong> ${body.title}</p>
        <p><strong>Mobile Number:</strong> ${body.mobile}</p>
        <p><strong>Desk Extension:</strong> ${body.desk}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Card Color:</strong> ${body.color}</p>
      `,
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Failed to send email." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
