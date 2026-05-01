import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import routes from './routes';
import { initSocket } from './websocket';
import { conectarDB } from './config/database';
import { seed } from './seed';

const API_URL = "http://localhost:3000/api";

const app = express();

const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads')); 

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(204).end();
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', routes);

initSocket(httpServer);

const PORT = 3000;

const startServer = async () => {
  try {
    await conectarDB();
    if (process.env.RUN_SEED === 'true') {
      console.log('🌱 Ejecutando seeding de base de datos...');
      await seed();
    }
    
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
      console.log(`📡 Acceso desde red local: http://10.65.174.170:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error fatal al iniciar:', error);
  }
};

startServer();