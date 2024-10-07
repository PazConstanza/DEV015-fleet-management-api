import { Request, Response } from 'express';
import { getAllTaxis, getTaxiTrajectories } from '../services/taxiService';

export const getTaxis = async (req: any, res: any) => {
  try {
    const { plate, page, limit } = req.query;
    const taxis = await getAllTaxis(plate as string, page as string, limit as string);
    res.json(taxis);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching taxis' });
  }
};

export const getTrajectories = async (req: any, res: any) => {
  try {
    const { taxiId, date } = req.query;
    if (!taxiId || !date) {
      return res.status(400).json({ error: 'taxiId and date are required' });
    }
    const trajectories = await getTaxiTrajectories(parseInt(taxiId as string), date as string);
    if (!trajectories) {
      return res.status(404).json({ error: 'No trajectories found' });
    }
    res.json(trajectories);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching taxi trajectories' });
  }
};
