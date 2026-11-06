jest.mock('mongoose', () => ({
  __esModule: true,
  default: {
    connect: jest.fn(),
    connection: { close: jest.fn() }
  }
}));

import mongoose from 'mongoose';
import { connectToMongoDB, disconnectFromMongoDB } from '../src/db/mongo.js';

const originalExit = process.exit;
const originalError = console.error;

beforeEach(() => {
  jest.clearAllMocks();
  mongoose.connect.mockResolvedValue(mongoose);
  mongoose.connection.close.mockResolvedValue();
  process.env.MONGODB_URI = 'mongodb://localhost:27017/teste';
  process.exit = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  process.exit = originalExit;
  console.error = originalError;
  delete process.env.MONGODB_URI;
});

describe('connectToMongoDB', () => {
  test('conecta quando a URI está definida', async () => {
    const resultado = await connectToMongoDB();

    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost:27017/teste');
    expect(resultado).toBe(mongoose);
    expect(process.exit).not.toHaveBeenCalled();
  });

  test('encerra o processo quando a URI não está definida', async () => {
    delete process.env.MONGODB_URI;

    await connectToMongoDB();

    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test('encerra o processo quando a conexão falha', async () => {
    mongoose.connect.mockRejectedValue(new Error('conexão recusada'));

    await connectToMongoDB();

    expect(console.error).toHaveBeenCalled();
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});

describe('disconnectFromMongoDB', () => {
  test('fecha a conexão com o banco', async () => {
    await disconnectFromMongoDB();

    expect(mongoose.connection.close).toHaveBeenCalled();
  });
});