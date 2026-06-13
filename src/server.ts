import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Start HTTP Server
  const server = app.listen(env.PORT, () => {
    console.log(`[Server] Running in ${env.NODE_ENV} mode on port ${env.PORT}`);
    console.log(`[Server] Health Check URL: http://localhost:${env.PORT}/api/health`);
  });

  // Handle port already in use error
  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`[Server] Port ${env.PORT} is already in use. Stop the existing process and retry.`);
    } else {
      console.error(`[Server] Unexpected error: ${err.message}`);
    }
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
    server.close(() => process.exit(1));
  });
};

startServer();
