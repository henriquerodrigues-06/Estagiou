const sanitizeTerm = (term) => {
    if (!term) return '';

    const text = String(term);

    const cleanTerm = text
        .normalize('NFC')
        .replace(/[^\p{L}\p{N}\s]/gu, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    return cleanTerm;
};

const sanitizeFormattedTerm = (term) => {
    if (!term) return '';
    const text = String(term);
    const cleanTerm = text
        .normalize('NFC')
        .replace(/[^\p{L}\p{N}\s.,;:!?'"()\/_+-]/gu, '')
        .replace(/[ \t]+/g, ' ')
        .trim();
    return cleanTerm;
};

const sanitizeCurrency = (value) => {
    if (!value) return 0;

    if (typeof value === 'number') return value;

    const text = String(value).replace(/,/g, '.').trim();
    
    const cleanValue = parseFloat(text);

    return isNaN(cleanValue) ? 0 : cleanValue;
};

const sanitizeTime = (time) => {
    if (!time) return '';
    const text = String(time);
    const cleanTime = text
        .normalize('NFC')
        .replace(/[^\p{L}\p{N}\s:\/]/gu, '')
        .replace(/\s+/g, ' ')
        .trim();
    return cleanTime;
};

export default {
    sanitizeTerm,
    sanitizeFormattedTerm,
    sanitizeCurrency,
    sanitizeTime
};