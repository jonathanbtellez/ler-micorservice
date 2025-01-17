import express from 'express';
import { PORT } from './utils/config.js';
import { info } from './utils/logger.js';
import runMigrations from './migrations/index.js';
import usersRouter from './routes/users.js';
import cors from 'cors';

const app = express();
app.use(cors())

app.use(express.json());

app.use('/api', usersRouter);

app.listen(PORT, () => {
    info(`Server running on port ${PORT}`);
});

runMigrations().catch(console.error);
