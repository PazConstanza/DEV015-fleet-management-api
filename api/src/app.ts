import express from 'express';
import taxiRoutes from './routes/taxiRoutes';

const app = express();
app.use(express.json());

app.use('/api', taxiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
