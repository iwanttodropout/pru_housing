export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, contact } = req.body;

  // Validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const contactRegex = /^[89]\d{7}$/;

  if (!name || !emailRegex.test(email) || !contactRegex.test(contact)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const sheetUrl = "https://script.google.com/macros/s/AKfycbx8ugxWu26JztCKrrUZKxH7D96k9cUdEdD_3E5_GuVQcrmzpoMoASvvfMdeAmNP4Z5t/exec";

    const formData = new URLSearchParams({
      name,
      email,
      contact,
    });

    const response = await fetch(sheetUrl, {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.ok) {
      return res.status(200).json({ message: "Form submitted successfully!" });
    } else {
      return res.status(500).json({ message: "Failed to submit form" });
    }
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}
