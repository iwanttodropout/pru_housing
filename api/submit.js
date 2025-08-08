document.getElementById('quoteForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;

  const payload = {
    name: form.name.value,
    contact: form.contact.value,
    email: form.email.value,
    postal: form.postal ? form.postal.value : '',
    source: 'HomeInsurance_Landing',
  };

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Thanks! You’re on our list. We’ll reach out ASAP.');
      form.reset();
    } else {
      const data = await res.json();
      throw new Error(data.message || 'Submission error');
    }
  } catch (err) {
    alert('Oops! Something went wrong. Please try again.');
    console.error(err);
  }
});
