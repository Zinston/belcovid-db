import app from './app.js';
import express from 'express';

const hostname = '127.0.0.1';
const port = 3000;

const server = express();
server.get('/', function (req, res) {
    // Set the response HTTP header with HTTP status and Content type
    res.statusCode = 200;
    res.send('Hello World\n');
});

// Handle 404 - Keep this as a last route
server.use(function(req, res, next) {
    res.status(404);
    res.send('404: File Not Found');
});

// listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at http://${hostname}:${port}/`);
  app().catch(console.error);
});
