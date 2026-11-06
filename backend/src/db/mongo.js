import mongoose from 'mongoose';
import 'dotenv/config';

export async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("ERRO: A variável MONGODB_URI não está definida no arquivo .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Banco de dados conectado com sucesso! (MongoDB)");
    return mongoose;
  } catch (err) {
    console.error("Erro fatal ao conectar ao MongoDB:", err);
    process.exit(1);
  }
}

export async function disconnectFromMongoDB() {
  await mongoose.connection.close();
  console.log("Desconectado do MongoDB.");
}