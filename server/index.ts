import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { authRouter } from './routes/auth';
import { stakingRouter } from './routes/staking';
import { userRouter } from './routes/user';
import { adminRouter } from './routes/admin';
import { setupWebSocket } from './websocket';
import { prisma } from './lib/prisma';

// Load environment variables
config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Setup WebSocket
setupWebSocket(io);

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/staking', stakingRouter);
app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

// Graceful shutdown
const shutdown = async () => {
  logger.info('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;