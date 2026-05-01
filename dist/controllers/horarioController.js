"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClasesPorDiaSemana = exports.eliminarHorario = exports.actualizarHorario = exports.crearHorario = exports.getProximaClase = exports.getHorarioHoy = exports.getHorarioSemanal = void 0;
const Horario_1 = __importDefault(require("../models/Horario"));
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const getHorarioSemanal = async (req, res) => {
    try {
        const clases = await Horario_1.default.findAll({ order: [['dia', 'ASC'], ['horaInicio', 'ASC']] });
        const horarioPorDia = DIAS.map((nombre, i) => ({
            dia: i,
            nombre,
            nombreCorto: DIAS_CORTOS[i],
            clases: clases.filter((c) => c.dia === i).map((c) => ({
                id: c.id,
                horaInicio: c.horaInicio,
                horaFin: c.horaFin,
                materia: c.materia,
                profesor: c.profesor,
                color: c.color
            }))
        }));
        const clasesNoDomingo = horarioPorDia.filter((d) => d.dia !== 0);
        res.json({ semana: clasesNoDomingo });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener horario' });
    }
};
exports.getHorarioSemanal = getHorarioSemanal;
const getHorarioHoy = async (req, res) => {
    try {
        const ahora = new Date();
        const diaSemana = ahora.getDay();
        const horaActual = ahora.toTimeString().slice(0, 5);
        const clasesHoy = await Horario_1.default.findAll({
            where: { dia: diaSemana },
            order: [['horaInicio', 'ASC']]
        });
        const claseActual = clasesHoy.find((c) => horaActual >= c.horaInicio && horaActual <= c.horaFin) || null;
        res.json({
            dia: diaSemana,
            nombreDia: DIAS[diaSemana],
            horaActual,
            claseActual,
            clasesHoy: clasesHoy.map((c) => ({
                id: c.id,
                horaInicio: c.horaInicio,
                horaFin: c.horaFin,
                materia: c.materia,
                profesor: c.profesor,
                color: c.color
            }))
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener horario de hoy' });
    }
};
exports.getHorarioHoy = getHorarioHoy;
const getProximaClase = async (req, res) => {
    try {
        const ahora = new Date();
        const diaActual = ahora.getDay();
        const horaActual = ahora.toTimeString().slice(0, 5);
        const todasClases = await Horario_1.default.findAll({ order: [['dia', 'ASC'], ['horaInicio', 'ASC']] });
        let proxima = null;
        const diasFuturos = [0, 1, 2, 3, 4, 5, 6].slice(diaActual).concat([0, 1, 2, 3, 4, 5, 6].slice(0, diaActual));
        for (const dia of diasFuturos) {
            const clasesDelDia = todasClases.filter((c) => c.dia === dia);
            if (dia === diaActual) {
                const sig = clasesDelDia.find((c) => c.horaInicio > horaActual);
                if (sig) {
                    proxima = { ...sig.toJSON(), nombreDia: DIAS[dia], nombreCorto: DIAS_CORTOS[dia] };
                    break;
                }
            }
            else {
                if (clasesDelDia.length > 0) {
                    proxima = { ...clasesDelDia[0].toJSON(), nombreDia: DIAS[dia], nombreCorto: DIAS_CORTOS[dia] };
                    break;
                }
            }
        }
        res.json({ proximaClase: proxima });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener próxima clase' });
    }
};
exports.getProximaClase = getProximaClase;
const crearHorario = async (req, res) => {
    try {
        const { dia, horaInicio, horaFin, materia, profesor, color } = req.body;
        if (dia === undefined || !horaInicio || !horaFin || !materia || !profesor) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }
        const nuevo = await Horario_1.default.create({ dia, horaInicio, horaFin, materia, profesor, color });
        res.status(201).json({ msg: 'Horario creado', horario: nuevo });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear horario' });
    }
};
exports.crearHorario = crearHorario;
const actualizarHorario = async (req, res) => {
    try {
        const id = req.params.id;
        const horario = await Horario_1.default.findByPk(id);
        if (!horario) {
            return res.status(404).json({ error: 'Horario no encontrado' });
        }
        await horario.update(req.body);
        res.json({ msg: 'Horario actualizado', horario });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar horario' });
    }
};
exports.actualizarHorario = actualizarHorario;
const eliminarHorario = async (req, res) => {
    try {
        const id = req.params.id;
        const horario = await Horario_1.default.findByPk(id);
        if (!horario) {
            return res.status(404).json({ error: 'Horario no encontrado' });
        }
        await horario.destroy();
        res.json({ msg: 'Horario eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar horario' });
    }
};
exports.eliminarHorario = eliminarHorario;
const getClasesPorDiaSemana = async (req, res) => {
    try {
        const { dia } = req.params;
        const diaNum = parseInt(dia);
        if (isNaN(diaNum) || diaNum < 0 || diaNum > 6) {
            return res.status(400).json({ error: 'Día inválido' });
        }
        const clases = await Horario_1.default.findAll({
            where: { dia: diaNum },
            order: [['horaInicio', 'ASC']]
        });
        res.json({
            dia: diaNum,
            nombreDia: DIAS[diaNum],
            clases: clases.map((c) => ({
                id: c.id,
                horaInicio: c.horaInicio,
                horaFin: c.horaFin,
                materia: c.materia,
                profesor: c.profesor,
                color: c.color
            }))
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener clases' });
    }
};
exports.getClasesPorDiaSemana = getClasesPorDiaSemana;
