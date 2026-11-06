import sanitizeUtil from '../../backend/src/utils/sanitize.util.js';

describe('sanitizeTerm', () => {
  test('remove caracteres especiais, espaços extras e converte para minúsculas', () => {
    const resultado = sanitizeUtil.sanitizeTerm('  Desenvolvedor  Jr!  ');
    expect(resultado).toBe('desenvolvedor jr');
  });

  test('mantém letras e números acentuados', () => {
    const resultado = sanitizeUtil.sanitizeTerm('Programação Sênior 2024');
    expect(resultado).toBe('programação sênior 2024');
  });

  test('retorna string vazia quando o valor é ausente ou inválido', () => {
    expect(sanitizeUtil.sanitizeTerm()).toBe('');
    expect(sanitizeUtil.sanitizeTerm(null)).toBe('');
    expect(sanitizeUtil.sanitizeTerm('')).toBe('');
  });
});

describe('sanitizeFormattedTerm', () => {
  test('remove caracteres especiais preservando maiúsculas', () => {
    const resultado = sanitizeUtil.sanitizeFormattedTerm('  Florianópolis / SC  ');
    // Os espaços múltiplos são colapsados em um só e a barra é removida.
    expect(resultado).toBe('Florianópolis SC');
  });

  test('retorna string vazia quando o valor é ausente', () => {
    expect(sanitizeUtil.sanitizeFormattedTerm(undefined)).toBe('');
    expect(sanitizeUtil.sanitizeFormattedTerm('')).toBe('');
  });
});

describe('sanitizeCurrency', () => {
  test('converte string monetária com vírgula em número', () => {
    expect(sanitizeUtil.sanitizeCurrency('1500,50')).toBe(1500.5);
  });

  test('mantém valores numéricos', () => {
    expect(sanitizeUtil.sanitizeCurrency(1200)).toBe(1200);
  });

  test('retorna 0 para valores ausentes ou inválidos', () => {
    expect(sanitizeUtil.sanitizeCurrency()).toBe(0);
    expect(sanitizeUtil.sanitizeCurrency(null)).toBe(0);
    expect(sanitizeUtil.sanitizeCurrency('abc')).toBe(0);
  });
});

describe('sanitizeTime', () => {
  test('mantém números, letras e dois pontos (carga horária)', () => {
    const resultado = sanitizeUtil.sanitizeTime('30 horas semanais: 6h/dia!');
    // Dois-pontos são mantidos; a barra (/) é removida pelo utilitário.
    expect(resultado).toBe('30 horas semanais: 6hdia');
  });

  test('retorna string vazia quando o valor é ausente', () => {
    expect(sanitizeUtil.sanitizeTime(undefined)).toBe('');
    expect(sanitizeUtil.sanitizeTime('')).toBe('');
  });
});