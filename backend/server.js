import app from './src/app.js';
import { connectToMongoDB } from './src/db/mongo.js'

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        mensagem: "Bem-vindo ao Estagiou."
    });
});

connectToMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Backend rodando na porta ${PORT}.`);
    });
});