import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

function startServer(retryPort: number, maxRetries = 5) {
  if (maxRetries <= 0) {
    console.error('Max retry attempts reached. Please specify a different port manually.');
    process.exit(1);
  }

  app.listen(retryPort, () => {
    console.log(`Server running at http://localhost:${retryPort}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${retryPort} is busy, trying port ${retryPort + 1}...`);
      startServer(retryPort + 1, maxRetries - 1);
    } else {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  });
}

startServer(3000); 