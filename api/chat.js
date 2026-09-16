export default function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  return response.status(503).json({
    message: 'The Garden of Eden assistant is not configured right now.',
  });
}
