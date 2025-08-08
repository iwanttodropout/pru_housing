document.getElementById('quoteForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const contact = form.contact.value;

  // Your Google Apps Script Web App URL
  const scriptURL = `https://script.google.com/macros/s/AKfycbx8ugxWu26JztCKrrUZKxH7D96k9cUdEdD_3E5_GuVQcrmzpoMoASvvfMdeAmNP4Z5t/exec`;

  try {
    const res = await fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form),
    });

    if (res.ok) {
      alert('✅ Form submitted successfully!');
      form.reset();
    } else {
      alert('❌ Error submitting form.');
    }
  } catch (err) {
    alert('⚠️ Network error — please try again later.');
    console.error(err);
  }
});
