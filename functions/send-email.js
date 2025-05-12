export async function onRequestPost({ request }) {
  const body = await request.json();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "noreply@yourdomain.com",
      to: "youremail@example.com",
      subject: "New Business Card Order",
      html: `
        <strong>Name:</strong> ${body.name}<br>
        <strong>Title:</strong> ${body.title}<br>
        <strong>Mobile:</strong> ${body.mobile}<br>
        <strong>Desk:</strong> ${body.desk}<br>
        <strong>Email:</strong> ${body.email}<br>
        <strong>Color:</strong> ${body.color}
      `,
    }),
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: "Email failed to send." }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
