export interface Currency {
  code: string;
  symbol: string;
  name: string;
  country: string;
}

export const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", country: "United States" },
  { code: "EUR", symbol: "€", name: "Euro", country: "European Union" },
  { code: "GBP", symbol: "£", name: "British Pound", country: "United Kingdom" },
  { code: "INR", symbol: "₹", name: "Indian Rupee", country: "India" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", country: "Canada" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", country: "Australia" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", country: "Japan" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan", country: "China" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar", country: "Singapore" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", country: "Hong Kong" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", country: "New Zealand" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc", country: "Switzerland" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", country: "Sweden" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", country: "Norway" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", country: "Denmark" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham", country: "United Arab Emirates" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal", country: "Saudi Arabia" },
  { code: "ZAR", symbol: "R", name: "South African Rand", country: "South Africa" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", country: "Brazil" },
  { code: "MXN", symbol: "$", name: "Mexican Peso", country: "Mexico" },
  { code: "KRW", symbol: "₩", name: "South Korean Won", country: "South Korea" },
  { code: "THB", symbol: "฿", name: "Thai Baht", country: "Thailand" },
  { code: "MYR", symbol: "RM", name: "Malaysian Ringgit", country: "Malaysia" },
  { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah", country: "Indonesia" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso", country: "Philippines" },
  { code: "PKR", symbol: "₨", name: "Pakistani Rupee", country: "Pakistan" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka", country: "Bangladesh" },
  { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee", country: "Sri Lanka" },
  { code: "NPR", symbol: "रू", name: "Nepalese Rupee", country: "Nepal" },
  { code: "VND", symbol: "₫", name: "Vietnamese Dong", country: "Vietnam" },
  { code: "EGP", symbol: "E£", name: "Egyptian Pound", country: "Egypt" },
  { code: "NGN", symbol: "₦", name: "Nigerian Naira", country: "Nigeria" },
  { code: "KES", symbol: "KSh", name: "Kenyan Shilling", country: "Kenya" },
  { code: "GHS", symbol: "₵", name: "Ghanaian Cedi", country: "Ghana" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira", country: "Turkey" },
  { code: "RUB", symbol: "₽", name: "Russian Ruble", country: "Russia" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty", country: "Poland" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna", country: "Czech Republic" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", country: "Hungary" },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel", country: "Israel" },
  { code: "CLP", symbol: "$", name: "Chilean Peso", country: "Chile" },
  { code: "ARS", symbol: "$", name: "Argentine Peso", country: "Argentina" },
  { code: "COP", symbol: "$", name: "Colombian Peso", country: "Colombia" },
  { code: "PEN", symbol: "S/", name: "Peruvian Sol", country: "Peru" },
];

// Function to detect currency based on timezone
export const detectCurrency = (): Currency => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const timezoneMap: { [key: string]: string } = {
    'America/New_York': 'USD',
    'America/Chicago': 'USD',
    'America/Los_Angeles': 'USD',
    'America/Denver': 'USD',
    'Europe/London': 'GBP',
    'Europe/Paris': 'EUR',
    'Europe/Berlin': 'EUR',
    'Europe/Rome': 'EUR',
    'Europe/Madrid': 'EUR',
    'Asia/Kolkata': 'INR',
    'Asia/Dubai': 'AED',
    'Asia/Tokyo': 'JPY',
    'Asia/Shanghai': 'CNY',
    'Asia/Singapore': 'SGD',
    'Asia/Hong_Kong': 'HKD',
    'Australia/Sydney': 'AUD',
    'Australia/Melbourne': 'AUD',
    'America/Toronto': 'CAD',
    'America/Vancouver': 'CAD',
  };

  const currencyCode = timezoneMap[timezone] || 'USD';
  return currencies.find(c => c.code === currencyCode) || currencies[0];
};
