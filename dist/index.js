"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const websocket_1 = require("./websocket");
const database_1 = require("./config/database");
const seed_1 = require("./seed");
const API_URL = "http://localhost:3000/api";
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/uploads', express_1.default.static('uploads'));
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
    res.status(204).end();
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.use('/api', routes_1.default);
(0, websocket_1.initSocket)(httpServer);
const PORT = 3000;
const startServer = async () => {
    try {
        await (0, database_1.conectarDB)();
        if (process.env.RUN_SEED === 'true') {
            console.log('🌱 Ejecutando seeding de base de datos...');
            await (0, seed_1.seed)();
        }
        httpServer.listen(PORT, '0.0.0.0', () => {
            console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
            console.log(`📡 Acceso desde red local: http://10.65.174.170:${PORT}`);
        });
    }
    catch (error) {
        console.error('❌ Error fatal al iniciar:', error);
    }
};
startServer();
