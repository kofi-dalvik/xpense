export const EVENT_ADD_TRNX = 'addTrnx';

export const CURRENCIES = [
    { name: 'British Pounds', short: 'GBP', icon: '£' },
    { name: 'Euro', short: 'EUR', icon: '€' },
    { name: 'Ghanaian Cedi', short: 'GHS', icon: '₵' },
    { name: 'US Dollar', short: 'USD', icon: '$' },
];

export const CURRENCY_SYMBOLS = CURRENCIES.reduce((acc, curr) => {
    acc[curr.short] = curr.icon;

    return acc;
}, {});

export const ICONS = [
    'mdi-account', 'mdi-airplane', 'mdi-ambulance', 'mdi-food', 'mdi-baby', 'mdi-bank', 'mdi-food-apple', 'mdi-mushroom',
    'mdi-bike', 'mdi-music-box', 'mdi-bus', 'mdi-cake', 'mdi-car', 'mdi-sofa', 'mdi-access-point-network', 'mdi-barley', 'mdi-cash-100',
    'mdi-cash-multiple', 'mdi-cash-usd', 'mdi-certificate', 'mdi-chef-hat', 'mdi-clipboard', 'mdi-clock', 'mdi-coffee',
    'mdi-coffee-outline', 'mdi-currency-usd', 'mdi-diamond', 'mdi-dog', 'mdi-dumbbell', 'mdi-heart-pulse', 'mdi-shopping',
    'mdi-gift', 'mdi-gamepad-variant', 'mdi-school', 'mdi-gas-station', 'mdi-power',
];

export const COLORS = [ 'indigo', 'purple', 'pink', 'gray', 'danger', 'success', 'warning', 'info', 'dark' ];

export const COLOR_VALUES = {
    'indigo': '#6366F1',
    'purple': '#BC6DF8',
    'pink': '#EC4899',
    'gray': '#6F84A3',
    'danger': '#F64E60',
    'success': '#00C48C',
    'warning': '#FFB822',
    'info': '#127CF9',
    'dark': '#343a40',
    'primary': '#127CF9',
    'secondary': '#6E84A3',
};