export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, contact } = req.body;

  // Validation patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[89]\d{7}$/; // SG numbers starting with 8 or 9, 8 digits total

  // Validate input
  if (!name || !emailRegex.test(email) || !contactRegex.test(contact)) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  // Google Apps Script endpoint (your deployed GAS Web App URL)
  const sheetUrl =
    "https://script.google.com/macros/s/AKfycbx8ugxWu26JztCKrrUZKxH7D96k9cUdEdD_3E5_GuVQcrmzpoMoASvvfMdeAmNP4Z5t/exec";

  try {
    const formData = new URLSearchParams({
      name,
      email,
      contact,
    });

    const response = await fetch(sheetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API returned status ${response.status}`);
    }

    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
}
