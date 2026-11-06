import Estagio from '../src/models/estagios.model.js';

describe('estagios.model', () => {
  test('define os campos obrigatórios do modelo', () => {
    const paths = Estagio.schema.paths;

    expect(paths.titulo).toBeDefined();
    expect(paths.cargo).toBeDefined();
    expect(paths.empresa).toBeDefined();
    expect(paths.localizacao).toBeDefined();
    expect(paths.cursos).toBeDefined();
    expect(paths.competencias).toBeDefined();
    expect(paths.bolsa).toBeDefined();
    expect(paths.cargaHoraria).toBeDefined();
    expect(paths.modelo).toBeDefined();
  });

  test('o campo "modelo" é restrito à enumeração definida', () => {
    const enumValues = Estagio.schema.paths.modelo.enumValues;
    expect(enumValues).toEqual(['Presencial', 'Híbrido', 'Remoto']);
  });

  test('campos opcionais recebem valores padrão', () => {
    const instancia = new Estagio({});

    expect(instancia.transporte).toBe(0);
    expect(instancia.alimentacao).toBe(0);
    expect(instancia.periodo).toBe('');
    expect(instancia.idiomas).toBe('');
  });
});