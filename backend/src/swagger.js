import swaggerJsdoc from 'swagger-jsdoc';

// Configuração da documentação da API (OpenAPI 3.0).
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
  // O Swagger lê comentários JSDoc nestes arquivos para montar a documentação.
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;