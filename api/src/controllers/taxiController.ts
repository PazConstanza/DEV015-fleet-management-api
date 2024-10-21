import { Request, Response } from 'express';
import { getAllTaxis, getTaxiTrajectories, getLatestTrajectories } from '../services/taxiService';

export const getTaxis = async (req: any, res: any) => {                                                 // Se obtiene una lista de taxis con paginacion filtrada por placa

    try {
        const { plate, page, limit } = req.query;                                                      // Saca los parametros (plate, page, limit) desde la URL 
        const taxis = await getAllTaxis(plate as string, page as string, limit as string);             // Llama a getAllTaxis para obtener los taxis desde la base de datos

        res.json(taxis);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching taxis' });
    }
};

export const getTrajectories = async (req: any, res: any) => {                                         // Obtiene las trayectorias de un taxi en una fecha especifica

    try {
        const { taxiId, date } = req.query;                                                            //  Verifica si taxiId y date existen en la URL

        if (!taxiId || !date) {
            return res.status(400).json({ error: 'taxiId and date are required' });
        }

        const trajectories = await getTaxiTrajectories(parseInt(taxiId as string), date as string);   // Llama a getTaxiTrajectories para obtener las trayectorias desde la base de datos

        if (!trajectories) {
            return res.status(404).json({ error: 'No trajectories found' });
        }

        res.json(trajectories);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching taxi trajectories' });
    }
};


export const getLastTrajectory = async (req: any, res: any) => {                                    // Obtiene la ultima trayectoria de todos los taxis

    const trajectories = await getLatestTrajectories();

    if (!trajectories || trajectories.length === 0) {
        return res.status(404).json({ error: 'No trajectories found' });
    }

    
    const formattedTrajectories = trajectories.map(taxi => {                                       // Tomar el primer objeto de la lista de "trajectories"

        const latestTrajectory = taxi.trajectories[0];                                             // Obtener la última trayectoria
        let response = {};

        if (latestTrajectory != undefined) {
            response = {
                taxiId: taxi.id,
                plate: taxi.plate,
                date: latestTrajectory.date.toISOString().replace('T', ' ').replace('.000Z', '') || '',
                latitude: latestTrajectory.latitude || '',
                longitude: latestTrajectory.longitude || ''
            };
        } else {
            response = {
                taxiId: taxi.id,
                plate: taxi.plate
            };
        }

        return response
    });

    res.json(formattedTrajectories);


};
