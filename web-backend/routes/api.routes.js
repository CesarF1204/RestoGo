import authRoutes from './authRoutes.js';
import itemRoutes from './itemRoutes.js';
import userRoutes from './userRoutes.js';

const ApiRoutes = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/items', itemRoutes);
    app.use('/api/users', userRoutes);
};

export default ApiRoutes;