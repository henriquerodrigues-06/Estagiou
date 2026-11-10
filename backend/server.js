import app from './src/app.js';
import { connectToMongoDB } from './src/db/mongo.js';
import dns from 'node:dns'; 

dns.setServers(['8.8.8.8', '8.8.4.4']);

const PORT = process.env.PORT || 3000;

connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Backend rodando na porta ${PORT}.`);
    });
});