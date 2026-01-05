import { createServer } from 'http';
import app from './app';
import { env } from './config/env';
import { initMySQL } from './config/mysql';
import { initSocketIO } from './socket/socket.server';

const PORT = Number(process.env.PORT || env.port || 4000);

async function start() {
  console.log('Starting server...');

  try {
    await initMySQL();
    console.log('✓ MySQL connected successfully');

    const httpServer = createServer(app);
    initSocketIO(httpServer);

    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    console.log('⚠️ Server will continue running without DB');
  }

}

start();

process.on('unhandledRejection', err => {
  console.error('Unhandled Promise Rejection:', err);
});

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
});
