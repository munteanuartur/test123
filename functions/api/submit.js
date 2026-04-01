export async function onRequestPost(context) {
  try {
    // 1. Parse the form data from the request
    const formData = await context.request.formData();
    const data = Object.fromEntries(formData.entries());

    // 2. Process the data (Example: Forwarding it to Web3Forms via fetch)
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        access_key: "c5ca0130-819d-4f22-b234-ce4515e7380e", // Your key
        ...data,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return new Response("Success! Thank you for your message.", { status: 200 });
    } else {
      return new Response("Something went wrong with the provider.", { status: 500 });
    }

  } catch (err) {
    return new Response("Error processing form: " + err.message, { status: 500 });
  }
}