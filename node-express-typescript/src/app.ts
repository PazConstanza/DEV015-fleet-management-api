import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// parsear (convierte) a formato JSON
app.use(express.json());

// Endpoint para obtener todos los taxis
app.get('/taxis', async (req: Request, res: Response) => {
    const { plate, page = 1, limit = 10 } = req.query;
  
    try {
      const where: any = {};
  
      if (plate) {
        where.plate = String(plate);
      }
  
      const taxis = await prisma.taxis.findMany({
        where,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      });
  
      res.json(taxis);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching taxis' });
    }
  });
  

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port' + PORT);
});

