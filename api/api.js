export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    // process.env.N8N_WEBHOOK akan memanggil Environment Variable dari Vercel
    const n8nResponse = await fetch(process.env.N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await n8nResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Gagal meneruskan webhook' });
  }
}