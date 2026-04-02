// Contract Service — uses ethers.js for reliable ABI encoding
// This replaces manual hex encoding which had wrong function signatures

let contractInstance = null;
let ethersProvider = null;
let ethersSigner = null;

// Load ethers.js from CDN — called once on page load
async function initEthers() {
    if (typeof ethers === 'undefined') {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.umd.min.js');
    }
    if (!window.ethereum) throw new Error('MetaMask not installed');
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    ethersSigner = ethersProvider.getSigner();
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
        const s = document.createElement('script');
        s.src = src; s.onload = resolve; s.onerror = reject;
        document.head.appendChild(s);
    });
}

// Get contract instance (read-only or with signer)
async function getContract(withSigner = false) {
    await initEthers();
    const provider = withSigner ? ethersSigner : ethersProvider;
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}

// ─── READ FUNCTIONS ────────────────────────────────────────────────────────

async function contractEventCounter() {
    const c = await getContract();
    const result = await c.eventCounter();
    return result.toBigInt();
}

async function contractTicketCounter() {
    const c = await getContract();
    const result = await c.ticketCounter();
    return result.toBigInt();
}

async function contractGetEvent(eventId) {
    const c = await getContract();
    const e = await c.getEvent(eventId);
    return {
        eventId: e.eventId.toNumber(),
        name: e.name,
        venue: e.venue,
        date: e.date.toNumber(),
        ticketPrice: e.ticketPrice.toBigInt(),
        totalTickets: e.totalTickets.toNumber(),
        ticketsSold: e.ticketsSold.toNumber(),
        organizer: e.organizer,
        isActive: e.isActive
    };
}

async function contractGetTicket(ticketId) {
    const c = await getContract();
    const t = await c.getTicket(ticketId);
    return {
        ticketId: t.ticketId.toNumber(),
        eventId: t.eventId.toNumber(),
        owner: t.owner,
        isUsed: t.isUsed,
        purchaseTime: t.purchaseTime.toNumber()
    };
}

async function contractGetMyTickets(userAddress) {
    const c = await getContract();
    const ids = await c.getMyTickets(userAddress);
    return ids.map(id => id.toNumber());
}

// ─── WRITE FUNCTIONS ───────────────────────────────────────────────────────

async function contractCreateEvent(name, venue, date, ticketPrice, totalTickets) {
    const account = getCurrentAccount();
    if (!account) throw new Error('Wallet not connected');
    const c = await getContract(true);
    const tx = await c.createEvent(name, venue, date, ticketPrice, totalTickets, {
        gasLimit: 500000
    });
    return await waitForTx(tx);
}

async function contractCancelEvent(eventId) {
    const account = getCurrentAccount();
    if (!account) throw new Error('Wallet not connected');
    const c = await getContract(true);
    const tx = await c.cancelEvent(eventId, { gasLimit: 300000 });
    return await waitForTx(tx);
}

async function contractBuyTicket(eventId, ticketPrice) {
    const account = getCurrentAccount();
    if (!account) throw new Error('Wallet not connected');
    const c = await getContract(true);
    const tx = await c.buyTicket(eventId, {
        value: ethers.BigNumber.from(ticketPrice.toString()),
        gasLimit: 300000
    });
    return await waitForTx(tx);
}

async function contractValidateTicket(ticketId) {
    const account = getCurrentAccount();
    if (!account) throw new Error('Wallet not connected');
    const c = await getContract(true);
    const tx = await c.validateTicket(ticketId, { gasLimit: 300000 });
    return await waitForTx(tx);
}

async function contractTransferTicket(ticketId, toAddress) {
    const account = getCurrentAccount();
    if (!account) throw new Error('Wallet not connected');
    const c = await getContract(true);
    const tx = await c.transferTicket(ticketId, toAddress, { gasLimit: 300000 });
    return await waitForTx(tx);
}

// Wait for transaction and return receipt
async function waitForTx(tx) {
    console.log('Transaction sent:', tx.hash);
    showNotification('Transaction sent! Waiting for confirmation...', 'info');
    const receipt = await tx.wait();
    console.log('Transaction mined:', receipt);
    return {
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        status: receipt.status === 1
    };
}

// Legacy wrapper — keeps old code working
async function getContract_legacy() {
    return {
        eventCounter: contractEventCounter,
        ticketCounter: contractTicketCounter,
        getEvent: contractGetEvent,
        getTicket: contractGetTicket,
        getMyTickets: contractGetMyTickets,
        createEvent: contractCreateEvent,
        cancelEvent: contractCancelEvent,
        buyTicket: contractBuyTicket,
        validateTicket: contractValidateTicket,
        transferTicket: contractTransferTicket
    };
}
