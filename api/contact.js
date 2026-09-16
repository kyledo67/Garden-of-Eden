export default function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  // Intentional placeholder: submissions are accepted but never delivered.
  return response.status(202).json({ message: 'Message accepted and discarded.' });
}
