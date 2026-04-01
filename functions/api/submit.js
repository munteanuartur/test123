/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
  try {
    // 1. Extract the form data
    const input = await context.request.formData();
    const data = Object.fromEntries(input.entries());

    // 2. Add your Web3Forms Access Key
    // You can hardcode it here or use context.env.WEB3FORMS_KEY for better security
    data.access_key = "c5ca0130-819d-4f22-b234-ce4515e7380e";

    // 3. Send to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    // 4. Handle Redirect or Response
    if (result.success) {
      // You can return a simple message or a 302 Redirect to a "Thank You" page
      return new Response("Success! Your message was sent.", { status: 200 });
    } else {
      return new Response("Error: " + result.message, { status: 400 });
    }

  } catch (err) {
    return new Response("Internal Server Error: " + err.message, { status: 500 });
  }
}