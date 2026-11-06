import mongoose from 'mongoose';

// O Schema define a estrutura, os tipos de dados e as validações no nível do banco.
const estagioSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    cargo: { type: String, required: true },
    empresa: { type: String, required: true },
    localizacao: { type: String, required: true },
    cursos: { type: String, required: true },
    competencias: { type: String, required: true },
    
    // Convertido para Number para facilitar cálculos futuros ou filtros de valor
    bolsa: { type: Number, required: true },
    cargaHoraria: { type: String, required: true },
    
    modelo: { 
        type: String, 
        required: true,
        enum: ['Presencial', 'Híbrido', 'Remoto'] // Restringe o banco a aceitar apenas esses 3 valores
    },

    // Campos Opcionais (com valores padrão caso não sejam enviados)
    periodo: { type: String, default: '' },
    transporte: { type: Number, default: 0 },
    alimentacao: { type: Number, default: 0 },
    idiomas: { type: String, default: '' },
    atividades: { type: String, default: '' },
    informacoesExtras: { type: String, default: '' }
}, {
    // Cria automaticamente os campos 'createdAt' e 'updatedAt'
    timestamps: true 
});

export default mongoose.model('Estagio', estagioSchema);