import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Horario from '../models/Horario';

const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

export const getHorarioSemanal = async (req: Request, res: Response) => {
  try {
    const clases:any = await Horario.findAll({ order: [['dia', 'ASC'], ['horaInicio', 'ASC']] });

    const horarioPorDia = DIAS.map((nombre, i) => ({
      dia: i,
      nombre,
      nombreCorto: DIAS_CORTOS[i],
      clases: clases.filter((c:any) => c.dia === i).map((c:any) => ({
        id: c.id,
        horaInicio: c.horaInicio,
        horaFin: c.horaFin,
        materia: c.materia,
        profesor: c.profesor,
        color: c.color
      }))
    }));

    const clasesNoDomingo = horarioPorDia.filter((d:any) => d.dia !== 0);
    res.json({ semana: clasesNoDomingo });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener horario' });
  }
};

export const getHorarioHoy = async (req: Request, res: Response) => {
  try {
    const ahora = new Date();
    const diaSemana = ahora.getDay();
    const horaActual = ahora.toTimeString().slice(0, 5);

    const clasesHoy:any = await Horario.findAll({ 
      where: { dia: diaSemana },
      order: [['horaInicio', 'ASC']]
    });

    const claseActual = clasesHoy.find((c:any) => horaActual >= c.horaInicio && horaActual <= c.horaFin) || null;

    res.json({
      dia: diaSemana,
      nombreDia: DIAS[diaSemana],
      horaActual,
      claseActual,
      clasesHoy: clasesHoy.map((c:any) => ({
        id: c.id,
        horaInicio: c.horaInicio,
        horaFin: c.horaFin,
        materia: c.materia,
        profesor: c.profesor,
        color: c.color
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener horario de hoy' });
  }
};

export const getProximaClase = async (req: Request, res: Response) => {
  try {
    const ahora = new Date();
    const diaActual = ahora.getDay();
    const horaActual = ahora.toTimeString().slice(0, 5);

    const todasClases:any = await Horario.findAll({ order: [['dia', 'ASC'], ['horaInicio', 'ASC']] });

    let proxima = null;
    const diasFuturos = [0,1,2,3,4,5,6].slice(diaActual).concat([0,1,2,3,4,5,6].slice(0, diaActual));

    for (const dia of diasFuturos) {
      const clasesDelDia = todasClases.filter((c:any) => c.dia === dia);

      if (dia === diaActual) {
        const sig = clasesDelDia.find((c:any) => c.horaInicio > horaActual);
        if (sig) {
          proxima = { ...sig.toJSON(), nombreDia: DIAS[dia], nombreCorto: DIAS_CORTOS[dia] };
          break;
        }
      } else {
        if (clasesDelDia.length > 0) {
          proxima = { ...clasesDelDia[0].toJSON(), nombreDia: DIAS[dia], nombreCorto: DIAS_CORTOS[dia] };
          break;
        }
      }
    }

    res.json({ proximaClase: proxima });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener próxima clase' });
  }
};

export const crearHorario = async (req: Request, res: Response) => {
  try {
    const { dia, horaInicio, horaFin, materia, profesor, color } = req.body;
    
    if (dia === undefined || !horaInicio || !horaFin || !materia || !profesor) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevo = await Horario.create({ dia, horaInicio, horaFin, materia, profesor, color });
    res.status(201).json({ msg: 'Horario creado', horario: nuevo });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear horario' });
  }
};

export const actualizarHorario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const horario: any = await Horario.findByPk(id);
    
    if (!horario) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    await horario.update(req.body);
    res.json({ msg: 'Horario actualizado', horario });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar horario' });
  }
};

export const eliminarHorario = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const horario: any = await Horario.findByPk(id);
    
    if (!horario) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    await horario.destroy();
    res.json({ msg: 'Horario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar horario' });
  }
};

export const getClasesPorDiaSemana = async (req: Request, res: Response) => {
  try {
    const { dia } = req.params;
    const diaNum = parseInt(dia as string);

    if (isNaN(diaNum) || diaNum < 0 || diaNum > 6) {
      return res.status(400).json({ error: 'Día inválido' });
    }

    const clases:any = await Horario.findAll({ 
      where: { dia: diaNum },
      order: [['horaInicio', 'ASC']]
    });

    res.json({
      dia: diaNum,
      nombreDia: DIAS[diaNum],
      clases: clases.map((c:any) => ({
        id: c.id,
        horaInicio: c.horaInicio,
        horaFin: c.horaFin,
        materia: c.materia,
        profesor: c.profesor,
        color: c.color
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clases' });
  }
};