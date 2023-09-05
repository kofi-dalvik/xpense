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

export const LIGHT_COLORS = [
    "#FF6B6B", // Light Coral
    "#96CE7F", // Light Green
    "#FFDAB9", // Light Peach
    "#81DAF5", // Light Sky Blue
    "#FFEC8B", // Light Goldenrod
    "#E3C6E3", // Light Thistle
    "#FFA07A", // Light Salmon
    "#B0C4DE", // Light Steel Blue
    "#FFB6C1", // Light Pink
    "#AFEEE2", // Light Turquoise
    "#C2DFFF", // Light Periwinkle
    "#FFCCCB", // Light Rose
    "#FAD02E", // Light Yellow
    "#D8BFD8", // Thistle
    "#F5E0B7", // Light Wheat
    "#F0E68C", // Khaki
    "#FFE4E1", // Misty Rose
    "#D1E8E2", // Light Blue Green
    "#F4A460", // SandyBrown
    "#FFDEAD"  // NavajoWhite
];