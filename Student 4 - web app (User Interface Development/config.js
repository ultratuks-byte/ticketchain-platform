// TicketChain Configuration
// Shared contract — same one used by the mobile app

// ─────────────────────────────────────────────────────────────────────────
// CONTRACT ADDRESS — keep in sync with mobile app config.dart
// Update whenever you run: truffle migrate --reset
const CONTRACT_ADDRESS = '0xbB81EF36DA11Bbf4067E69E6C950804a077f7A02';
// ─────────────────────────────────────────────────────────────────────────

const CONTRACT_ABI = [
    {"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_venue","type":"string"},{"internalType":"uint256","name":"_date","type":"uint256"},{"internalType":"uint256","name":"_ticketPrice","type":"uint256"},{"internalType":"uint256","name":"_totalTickets","type":"uint256"}],"name":"createEvent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_eventId","type":"uint256"}],"name":"cancelEvent","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_eventId","type":"uint256"}],"name":"buyTicket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_ticketId","type":"uint256"}],"name":"validateTicket","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_ticketId","type":"uint256"},{"internalType":"address","name":"_to","type":"address"}],"name":"transferTicket","outputs":[],"stateMutability":"nonpayable","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_eventId","type":"uint256"}],"name":"getEvent","outputs":[{"components":[{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"venue","type":"string"},{"internalType":"uint256","name":"date","type":"uint256"},{"internalType":"uint256","name":"ticketPrice","type":"uint256"},{"internalType":"uint256","name":"totalTickets","type":"uint256"},{"internalType":"uint256","name":"ticketsSold","type":"uint256"},{"internalType":"address","name":"organizer","type":"address"},{"internalType":"bool","name":"isActive","type":"bool"}],"internalType":"struct TicketSystem.Event","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"uint256","name":"_ticketId","type":"uint256"}],"name":"getTicket","outputs":[{"components":[{"internalType":"uint256","name":"ticketId","type":"uint256"},{"internalType":"uint256","name":"eventId","type":"uint256"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"bool","name":"isUsed","type":"bool"},{"internalType":"uint256","name":"purchaseTime","type":"uint256"}],"internalType":"struct TicketSystem.Ticket","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},
    {"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getMyTickets","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"eventCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"inputs":[],"name":"ticketCounter","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"eventId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":true,"internalType":"address","name":"organizer","type":"address"}],"name":"EventCreated","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"eventId","type":"uint256"}],"name":"EventCancelled","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"ticketId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"eventId","type":"uint256"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"}],"name":"TicketPurchased","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"ticketId","type":"uint256"}],"name":"TicketValidated","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"ticketId","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"TicketTransferred","type":"event"}
];

const NETWORK_CONFIG = {
    chainId: '0x539',
    chainName: 'Ganache Local',
    rpcUrls: ['http://127.0.0.1:7545'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 }
};
