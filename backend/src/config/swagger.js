import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Estagiou API',
      version: '1.0.0',
      description: 'API RESTful do aplicativo Estagiou — conexão de alunos a vagas de estágio. Documentação completa de todos os endpoints de CRUD.'
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' }
    ]
  },
  apis: ['./src/docs/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;