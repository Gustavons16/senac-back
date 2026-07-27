import 'dotenv/config';

import cors from 'cors';
import express from 'express';

import { generateSwaggerDocs, setupSwagger } from './src/docs/swagger.js';
import usuariosRoutes from './src/routes/usuariosRoutes.js';
import storeRoutes from './src/routes/storeRoutes.js';
import categoryRoutes from './src/routes/categoryRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import dayofjobRoutes from './src/routes/dayofjobRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais usados em quase toda API.
app.use(cors());
app.use(express.json());

// Cada recurso fica em um router separado para manter organizacao.
app.use('/usuarios', usuariosRoutes);
app.use('/stores', storeRoutes);
app.use('/category', categoryRoutes);
app.use('/products', productRoutes);
app.use('/dayofjob', dayofjobRoutes);
app.get('/', (req, res) => {
    res.redirect(301, '/docs');
});

app.use((err, req, res, next) => {
  console.error('[erro nao tratado]', err);
  res.status(500).json({ mensagem: 'Erro interno do servidor.' });
});

async function start() {
  setupSwagger(app);

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

start();
