/**
 * GlobalExchange Premium — Lógica de la aplicación
 *
 * Módulos:
 *  1. Constantes y estado global
 *  2. Utilidades
 *  3. Carga de tasas (API + fallback local)
 *  4. Conversión en tiempo real
 *  5. Swap de monedas
 *  6. Historial de conversiones (localStorage)
 *  7. Inicialización
 */

'use strict';

/* ============================================================
   1. Constantes y Estado Global
   ============================================================ */
const API_URL      = 'https://cdn.moneyconvert.net/api/latest.json';
const FALLBACK_URL = 'assets/rates-fallback.json';
const HISTORY_KEY  = 'globalexchange_historial';
const MAX_HISTORY  = 10;

// Mapa de monedas frecuentes con emoji de bandera
const CURRENCY_FLAGS = {
    AED: '🇦🇪', AFN: '🇦🇫', ALL: '🇦🇱', AMD: '🇦🇲', ANG: '🇳🇱', AOA: '🇦🇴',
    ARS: '🇦🇷', AUD: '🇦🇺', AWG: '🇦🇼', AZN: '🇦🇿', BAM: '🇧🇦', BBD: '🇧🇧',
    BDT: '🇧🇩', BGN: '🇧🇬', BHD: '🇧🇭', BIF: '🇧🇮', BMD: '🇧🇲', BND: '🇧🇳',
    BOB: '🇧🇴', BRL: '🇧🇷', BSD: '🇧🇸', BTN: '🇧🇹', BWP: '🇧🇼', BYN: '🇧🇾',
    BZD: '🇧🇿', CAD: '🇨🇦', CDF: '🇨🇩', CHF: '🇨🇭', CLP: '🇨🇱', CNY: '🇨🇳',
    COP: '🇨🇴', CRC: '🇨🇷', CUP: '🇨🇺', CVE: '🇨🇻', CZK: '🇨🇿', DJF: '🇩🇯',
    DKK: '🇩🇰', DOP: '🇩🇴', DZD: '🇩🇿', EGP: '🇪🇬', ERN: '🇪🇷', ETB: '🇪🇹',
    EUR: '🇪🇺', FJD: '🇫🇯', GBP: '🇬🇧', GEL: '🇬🇪', GHS: '🇬🇭', GMD: '🇬🇲',
    GNF: '🇬🇳', GTQ: '🇬🇹', GYD: '🇬🇾', HKD: '🇭🇰', HNL: '🇭🇳', HTG: '🇭🇹',
    HUF: '🇭🇺', IDR: '🇮🇩', ILS: '🇮🇱', INR: '🇮🇳', IQD: '🇮🇶', IRR: '🇮🇷',
    ISK: '🇮🇸', JMD: '🇯🇲', JOD: '🇯🇴', JPY: '🇯🇵', KES: '🇰🇪', KGS: '🇰🇬',
    KHR: '🇰🇭', KMF: '🇰🇲', KRW: '🇰🇷', KWD: '🇰🇼', KYD: '🇰🇾', KZT: '🇰🇿',
    LAK: '🇱🇦', LBP: '🇱🇧', LKR: '🇱🇰', LRD: '🇱🇷', LSL: '🇱🇸', LYD: '🇱🇾',
    MAD: '🇲🇦', MDL: '🇲🇩', MGA: '🇲🇬', MKD: '🇲🇰', MMK: '🇲🇲', MNT: '🇲🇳',
    MOP: '🇲🇴', MRU: '🇲🇷', MUR: '🇲🇺', MVR: '🇲🇻', MWK: '🇲🇼', MXN: '🇲🇽',
    MYR: '🇲🇾', MZN: '🇲🇿', NAD: '🇳🇦', NGN: '🇳🇬', NIO: '🇳🇮', NOK: '🇳🇴',
    NPR: '🇳🇵', NZD: '🇳🇿', OMR: '🇴🇲', PAB: '🇵🇦', PEN: '🇵🇪', PGK: '🇵🇬',
    PHP: '🇵🇭', PKR: '🇵🇰', PLN: '🇵🇱', PYG: '🇵🇾', QAR: '🇶🇦', RON: '🇷🇴',
    RSD: '🇷🇸', RUB: '🇷🇺', RWF: '🇷🇼', SAR: '🇸🇦', SBD: '🇸🇧', SCR: '🇸🇨',
    SDG: '🇸🇩', SEK: '🇸🇪', SGD: '🇸🇬', SHP: '🇸🇭', SOS: '🇸🇴', SRD: '🇸🇷',
    SSP: '🇸🇸', STN: '🇸🇹', SVC: '🇸🇻', SYP: '🇸🇾', SZL: '🇸🇿', THB: '🇹🇭',
    TJS: '🇹🇯', TMT: '🇹🇲', TND: '🇹🇳', TOP: '🇹🇴', TRY: '🇹🇷', TTD: '🇹🇹',
    TWD: '🇹🇼', TZS: '🇹🇿', UAH: '🇺🇦', UGX: '🇺🇬', USD: '🇺🇸', UYU: '🇺🇾',
    UZS: '🇺🇿', VES: '🇻🇪', VND: '🇻🇳', VUV: '🇻🇺', WST: '🇼🇸', XAF: '🌍',
    XCD: '🌎', XOF: '🌍', XPF: '🌏', YER: '🇾🇪', ZAR: '🇿🇦', ZMW: '🇿🇲',
    ZWG: '🇿🇼', GIP: '🇬🇮', FKP: '🇫🇰',
};

// Estado de la aplicación
const state = {
    rates: null,        // Objeto con tasas respecto a USD
    usingFallback: false,
    lastUpdated: null,
};

/* ============================================================
   2. Referencias al DOM
   ============================================================ */
const dom = {
    amountInput:     document.getElementById('amount-input'),
    resultDisplay:   document.getElementById('result-display'),
    originSelect:    document.getElementById('origin-select'),
    destSelect:      document.getElementById('dest-select'),
    originFlag:      document.getElementById('origin-flag'),
    destFlag:        document.getElementById('dest-flag'),
    swapBtn:         document.getElementById('swap-btn'),
    continueBtn:     document.getElementById('continue-btn'),
    rateValue:       document.getElementById('rate-value'),
    rateChange:      document.getElementById('rate-change'),
    loadingOverlay:  document.getElementById('loading-overlay'),
    errorMsg:        document.getElementById('error-msg'),
    errorText:       document.getElementById('error-text'),
    historyToggle:   document.getElementById('history-toggle'),
    historyCard:     document.getElementById('history-card'),
    historyBody:     document.getElementById('history-body'),
    historyList:     document.getElementById('history-list'),
    historyEmpty:    document.getElementById('history-empty'),
    clearHistoryBtn: document.getElementById('clear-history-btn'),
    chartLine:       document.getElementById('chart-line'),
    toast:           document.getElementById('toast'),
};

/* ============================================================
   3. Utilidades
   ============================================================ */

/**
 * Formatea un número como moneda local (es-ES)
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
function formatNumber(value, decimals = 2) {
    return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
}

/**
 * Devuelve la fecha y hora actuales formateadas en español
 * @returns {string}
 */
function formatDateTime() {
    return new Intl.DateTimeFormat('es-ES', {
        day:    '2-digit',
        month:  '2-digit',
        year:   'numeric',
        hour:   '2-digit',
        minute: '2-digit',
    }).format(new Date());
}

/**
 * Muestra un toast temporal
 * @param {string} message
 */
function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    setTimeout(() => {
        dom.toast.classList.remove('is-visible');
    }, 3000);
}

/**
 * Obtiene la bandera de una moneda
 * @param {string} code
 * @returns {string}
 */
function getFlag(code) {
    return CURRENCY_FLAGS[code] || '🏳️';
}

/**
 * Actualiza el emoji de bandera visible junto al select.
 * La bandera es un <span> independiente del <select> nativo,
 * por lo que siempre se muestra correctamente en cualquier OS/navegador.
 * @param {HTMLElement} flagEl - Elemento span con la bandera
 * @param {string} code       - Código de la moneda (ej: 'USD')
 */
function updateFlagDisplay(flagEl, code) {
    flagEl.textContent = getFlag(code);
}

/* ============================================================
   4. Carga de Tasas (API + Fallback Local)
   ============================================================ */

/**
 * Muestra u oculta el indicador de carga
 * @param {boolean} visible
 */
function setLoading(visible) {
    if (visible) {
        dom.loadingOverlay.classList.add('is-visible');
    } else {
        dom.loadingOverlay.classList.remove('is-visible');
    }
}

/**
 * Muestra u oculta el mensaje de error
 * @param {boolean} visible
 * @param {string} [message]
 */
function setError(visible, message = '') {
    if (visible) {
        dom.errorText.textContent = message;
        dom.errorMsg.classList.add('is-visible');
    } else {
        dom.errorMsg.classList.remove('is-visible');
    }
}

/**
 * Carga las tasas desde la API externa.
 * Si falla, carga el fallback local.
 */
async function loadRates() {
    setLoading(true);
    setError(false);

    try {
        const response = await fetch(API_URL, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }
        const data = await response.json();
        if (!data.rates || !data.base) {
            throw new Error('Formato de respuesta inesperado');
        }

        state.rates = data.rates;
        state.usingFallback = false;
        state.lastUpdated = data.ts || new Date().toISOString();

        setError(false);
    } catch (apiError) {
        // Intentar fallback local
        try {
            const fallbackResponse = await fetch(FALLBACK_URL);
            const fallbackData = await fallbackResponse.json();

            state.rates = fallbackData.rates;
            state.usingFallback = true;
            state.lastUpdated = fallbackData.ts;

            setError(true, '⚠️ Sin conexión al servidor. Mostrando tasas de respaldo locales.');
        } catch (fallbackError) {
            setError(true, '❌ No se pudieron cargar las tasas de cambio. Comprueba tu conexión.');
        }
    } finally {
        setLoading(false);
        // Poblar los selects con las monedas disponibles (solo la primera vez)
        if (state.rates && dom.originSelect.options.length === 0) {
            populateSelects();
        }
        // Actualizar conversión con las nuevas tasas
        convertCurrency();
        updateRateInfo();
    }
}

/* ============================================================
   5. Poblar los Selectores de Moneda
   ============================================================ */

/**
 * Llena ambos selects con las monedas del objeto de tasas.
 */
function populateSelects() {
    const currencies = Object.keys(state.rates).sort();

    // Monedas prioritarias para mostrar al inicio
    const prioritized = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'MXN', 'BRL', 'ARS'];

    // Ordenar: primero las prioritarias, luego el resto
    const ordered = [
        ...prioritized.filter(c => currencies.includes(c)),
        ...currencies.filter(c => !prioritized.includes(c)),
    ];

    ordered.forEach(code => {
        // Opción para el select origen
        const optionOrigin = document.createElement('option');
        optionOrigin.value = code;
        optionOrigin.textContent = code; // Solo el código: la bandera va en el span externo
        dom.originSelect.appendChild(optionOrigin);

        // Opción para el select destino
        const optionDest = document.createElement('option');
        optionDest.value = code;
        optionDest.textContent = code;
        dom.destSelect.appendChild(optionDest);
    });

    // Valores por defecto
    dom.originSelect.value = 'USD';
    dom.destSelect.value   = 'EUR';

    // Actualizar banderas iniciales
    updateFlagDisplay(dom.originFlag, 'USD');
    updateFlagDisplay(dom.destFlag,   'EUR');
}

/* ============================================================
   6. Conversión en Tiempo Real
   ============================================================ */

/**
 * Convierte la cantidad del campo de origen al de destino.
 * La conversión usa USD como moneda base del API.
 *
 * Formula: resultado = (cantidad / rateOrigen) * rateDest
 */
function convertCurrency() {
    if (!state.rates) {
        dom.resultDisplay.textContent = '—';
        return;
    }

    const rawValue  = dom.amountInput.value.replace(',', '.').trim();
    const amount    = parseFloat(rawValue);
    const originCode = dom.originSelect.value;
    const destCode   = dom.destSelect.value;

    if (!originCode || !destCode || isNaN(amount) || amount < 0) {
        dom.resultDisplay.textContent = '—';
        return;
    }

    const rateOrigin = state.rates[originCode];
    const rateDest   = state.rates[destCode];

    if (!rateOrigin || !rateDest) {
        dom.resultDisplay.textContent = '—';
        return;
    }

    const result = (amount / rateOrigin) * rateDest;
    dom.resultDisplay.textContent = formatNumber(result, getDecimals(result));
}

/**
 * Determina el número de decimales adecuado según el valor
 * @param {number} value
 * @returns {number}
 */
function getDecimals(value) {
    if (value >= 1000) return 2;
    if (value >= 1) return 4;
    return 6;
}

/**
 * Actualiza el texto informativo de la tasa de cambio.
 */
function updateRateInfo() {
    if (!state.rates) {
        dom.rateValue.textContent = '—';
        return;
    }

    const originCode = dom.originSelect.value;
    const destCode   = dom.destSelect.value;

    if (!originCode || !destCode) return;

    const rateOrigin = state.rates[originCode];
    const rateDest   = state.rates[destCode];

    if (!rateOrigin || !rateDest) return;

    const crossRate = rateDest / rateOrigin;
    dom.rateValue.textContent = `1 ${originCode} = ${formatNumber(crossRate, 4)} ${destCode}`;

    // Simulación de variación 24h (dato estático de muestra)
    const simulatedChange = ((crossRate - 1) * 0.1 + Math.random() * 0.005 - 0.0025).toFixed(4);
    const isPositive = parseFloat(simulatedChange) >= 0;
    dom.rateChange.textContent = `${isPositive ? '↗' : '↘'} ${isPositive ? '+' : ''}${(simulatedChange * 100).toFixed(2)}% en 24h`;
    dom.rateChange.style.color = isPositive ? 'var(--color-green)' : '#dc2626';

    updateChart(crossRate);
}

/**
 * Dibuja una mini línea de tendencia en el SVG del gráfico.
 * @param {number} rate
 */
function updateChart(rate) {
    const points = generateChartPoints(rate);
    dom.chartLine.setAttribute('d', points);
}

/**
 * Genera un path SVG simulando una tendencia.
 * @param {number} rate
 * @returns {string}
 */
function generateChartPoints(rate) {
    const w = 100;
    const h = 40;
    const pts = [];
    const steps = 8;

    for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * w;
        const noise = (Math.random() - 0.4) * 10;
        const trend = (i / steps) * 8;
        const y = h - trend + noise;
        pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${Math.max(2, Math.min(h - 2, y)).toFixed(1)}`);
    }
    return pts.join(' ');
}

/* ============================================================
   7. Swap de Monedas
   ============================================================ */

/**
 * Intercambia las monedas de origen y destino.
 */
function swapCurrencies() {
    const originVal = dom.originSelect.value;
    const destVal   = dom.destSelect.value;

    dom.originSelect.value = destVal;
    dom.destSelect.value   = originVal;

    updateFlagDisplay(dom.originFlag, destVal);
    updateFlagDisplay(dom.destFlag,   originVal);

    convertCurrency();
    updateRateInfo();
}

/* ============================================================
   8. Historial de Conversiones (localStorage)
   ============================================================ */

/**
 * Lee el historial del localStorage.
 * @returns {Array}
 */
function readHistory() {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

/**
 * Guarda el historial en el localStorage.
 * @param {Array} history
 */
function saveHistory(history) {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
        // localStorage no disponible
    }
}

/**
 * Añade una entrada al historial y lo persiste.
 * Limita el historial a MAX_HISTORY entradas.
 */
function addToHistory() {
    if (!state.rates) return;

    const rawValue   = dom.amountInput.value.replace(',', '.').trim();
    const amount     = parseFloat(rawValue);
    const originCode = dom.originSelect.value;
    const destCode   = dom.destSelect.value;

    if (!originCode || !destCode || isNaN(amount) || amount <= 0) return;

    const rateOrigin = state.rates[originCode];
    const rateDest   = state.rates[destCode];
    if (!rateOrigin || !rateDest) return;

    const result    = (amount / rateOrigin) * rateDest;
    const crossRate = rateDest / rateOrigin;

    const entry = {
        id:         Date.now(),
        amount:     amount,
        originCode: originCode,
        destCode:   destCode,
        result:     result,
        crossRate:  crossRate,
        date:       formatDateTime(),
    };

    const history = readHistory();
    history.unshift(entry); // insertar al inicio
    if (history.length > MAX_HISTORY) {
        history.splice(MAX_HISTORY); // mantener solo las últimas 10
    }
    saveHistory(history);
    renderHistory();
    showToast(`Conversión guardada: ${formatNumber(amount)} ${originCode} → ${formatNumber(result, 2)} ${destCode}`);
}

/**
 * Renderiza el historial en el DOM.
 */
function renderHistory() {
    const history = readHistory();

    // Limpiar lista actual
    while (dom.historyList.firstChild) {
        dom.historyList.removeChild(dom.historyList.firstChild);
    }

    if (history.length === 0) {
        dom.historyEmpty.style.display = 'block';
        dom.historyList.style.display  = 'none';
        dom.clearHistoryBtn.style.display = 'none';
        return;
    }

    dom.historyEmpty.style.display = 'none';
    dom.historyList.style.display  = 'flex';
    dom.clearHistoryBtn.style.display = 'flex';

    history.forEach(entry => {
        const li = document.createElement('li');
        li.className = 'history-item';

        const conversionDiv = document.createElement('div');
        conversionDiv.className = 'history-item__conversion';

        const amountSpan = document.createElement('span');
        amountSpan.className = 'history-item__amount';
        const originFlag = getFlag(entry.originCode);
        const destFlag   = getFlag(entry.destCode);
        amountSpan.textContent = `${originFlag} ${formatNumber(entry.amount)} ${entry.originCode}  →  ${destFlag} ${formatNumber(entry.result, 2)} ${entry.destCode}`;

        const rateSpan = document.createElement('span');
        rateSpan.className = 'history-item__rate';
        rateSpan.textContent = `1 ${entry.originCode} = ${formatNumber(entry.crossRate, 4)} ${entry.destCode}`;

        conversionDiv.appendChild(amountSpan);
        conversionDiv.appendChild(rateSpan);

        const dateSpan = document.createElement('span');
        dateSpan.className = 'history-item__date';
        dateSpan.textContent = entry.date;

        li.appendChild(conversionDiv);
        li.appendChild(dateSpan);

        dom.historyList.appendChild(li);
    });
}

/**
 * Limpia el historial completo del localStorage y recarga la vista.
 */
function clearHistory() {
    saveHistory([]);
    renderHistory();
    showToast('Historial borrado');
}

/**
 * Alterna la visibilidad del panel de historial.
 */
function toggleHistory() {
    const isOpen = dom.historyCard.classList.toggle('is-open');
    dom.historyToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

/* ============================================================
   9. Event Listeners
   ============================================================ */

function bindEvents() {
    // Conversión en tiempo real al escribir
    dom.amountInput.addEventListener('input', () => {
        convertCurrency();
    });

    // Cambio de moneda origen
    dom.originSelect.addEventListener('change', () => {
        updateFlagDisplay(dom.originFlag, dom.originSelect.value);
        convertCurrency();
        updateRateInfo();
    });

    // Cambio de moneda destino
    dom.destSelect.addEventListener('change', () => {
        updateFlagDisplay(dom.destFlag, dom.destSelect.value);
        convertCurrency();
        updateRateInfo();
    });

    // Intercambiar monedas
    dom.swapBtn.addEventListener('click', (e) => {
        e.preventDefault();
        swapCurrencies();
    });

    // Botón Continuar: guarda en el historial
    dom.continueBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addToHistory();
    });

    // Toggle del historial
    dom.historyToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleHistory();
    });

    // Limpiar historial
    dom.clearHistoryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearHistory();
    });
}

/* ============================================================
   10. Inicialización
   ============================================================ */

function init() {
    bindEvents();
    renderHistory();
    loadRates();
}

// Arrancar la app cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
