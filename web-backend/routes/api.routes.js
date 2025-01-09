import itemRoutes from './itemRoutes.js';

const ApiRoutes = (app) => {
    app.use('/api/items', itemRoutes);
};

export default ApiRoutes;