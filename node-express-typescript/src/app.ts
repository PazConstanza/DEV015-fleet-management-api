import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// parsear (convierte) a formato JSON
app.use(express.json());

// Endpoint para obtener todos los taxis
app.get('/taxis', async (req: Request, res: Response) => {
  let { plate, page = '1', limit = '10' } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);
  
  if (isNaN(pageNumber) || isNaN(limitNumber)) {
    return res.status(400).json({ error: 'Page and limit must be valid numbers' });
  }

  try {
    const where: any = {};

    if (plate) {
      where.plate = String(plate);
    }

    const taxis = await prisma.taxis.findMany({
      where,
      skip: (Number(pageNumber) - 1) * Number(limitNumber),
      take: Number(limitNumber),
    });

    res.json(taxis);
  } catch (error: any) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching taxis' });
  }
});


// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port' + PORT);
});

