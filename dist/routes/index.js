"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const tareaRoutes_1 = __importDefault(require("./tareaRoutes"));
const horarioRoutes_1 = __importDefault(require("./horarioRoutes"));
const router = (0, express_1.Router)();
router.use('/auth', authRoutes_1.default);
router.use('/tareas', tareaRoutes_1.default);
router.use('/', horarioRoutes_1.default);
exports.default = router;
