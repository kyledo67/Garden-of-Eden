import { createServer } from 'node:http';

const port = process.env.PORT || 3001;

const json = (response, status, body) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(body));
};

createServer((request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type' });
    return response.end();
  }
  if (request.method !== 'POST') return json(response, 404, { message: 'Not found' });
  if (request.url === '/api/contact') return json(response, 202, { message: 'Message accepted and discarded.' });
  if (request.url === '/api/chat') return json(response, 503, { message: 'The Garden of Eden assistant is not configured right now.' });
  return json(response, 404, { message: 'Not found' });
}).listen(port, () => console.log(`Garden of Eden backend listening on ${port}`));
