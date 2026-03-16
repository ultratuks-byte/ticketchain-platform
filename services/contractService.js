// Contract Service - ethers v5 compatible
import { getSigner, isWalletConnected } from './walletService.js';

let contract = null;
let contractAddress = null;
let contractABI = null;

export async function initializeContract() {
    try {
        if (!isWalletConnected()) {
            throw new Error('Wallet not connected');
        }

        const response = await fetch('./build/contracts/TicketSystem.json');
        const contractData = await response.json();

        const networkId = '5777';
        
        if (!contractData.networks[networkId]) {
            throw new Error('Contract not deployed');
        }

        contractAddress = contractData.networks[networkId].address;
        contractABI = contractData.abi;

        const signer = getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);

        console.log('✅ Contract initialized:', contractAddress);

        return {
            success: true,
            address: contractAddress,
            message: 'Contract initialized'
        };

    } catch (error) {
        console.error('❌ Error:', error);
        return {
            success: false,
            address: null,
            message: error.message
        };
    }
}

export async function createEvent(name, venue, date, ticketPrice, totalTickets) {
    try {
        if (!contract) {
            throw new Error('Contract not initialized');
        }

        console.log('📝 Creating event:', name);

        const priceInWei = ethers.utils.parseEther(ticketPrice.toString());

        const tx = await contract.createEvent(
            name,
            venue,
            date,
            priceInWei,
            totalTickets
        );

        console.log('⏳ Transaction sent:', tx.hash);
        const receipt = await tx.wait();
        console.log('✅ Event created!');

        const eventId = receipt.logs[0].topics[1];

        return {
            success: true,
            eventId: parseInt(eventId, 16).toString(),
            transactionHash: tx.hash,
            message: 'Event created successfully'
        };

    } catch (error) {
        console.error('❌ Error:', error);
        return {
            success: false,
            eventId: null,
            message: error.message
        };
    }
}

export async function buyTicket(eventId, ticketPrice) {
    try {
        if (!contract) {
            throw new Error('Contract not initialized');
        }

        console.log('🎫 Buying ticket for event:', eventId);

        const priceInWei = ethers.utils.parseEther(ticketPrice.toString());

        const tx = await contract.buyTicket(eventId, {
            value: priceInWei
        });

        console.log('⏳ Transaction sent:', tx.hash);
        const receipt = await tx.wait();
        console.log('✅ Ticket purchased!');

        const ticketId = receipt.logs[0].topics[1];

        return {
            success: true,
            ticketId: parseInt(ticketId, 16).toString(),
            transactionHash: tx.hash,
            message: 'Ticket purchased successfully'
        };

    } catch (error) {
        console.error('❌ Error:', error);
        return {
            success: false,
            ticketId: null,
            message: error.message
        };
    }
}

export async function getEvent(eventId) {
    try {
        if (!contract) {
            throw new Error('Contract not initialized');
        }

        const event = await contract.getEvent(eventId);

        return {
            success: true,
            event: {
                eventId: event.eventId.toString(),
                name: event.name,
                venue: event.venue,
                date: event.date.toNumber(),
                ticketPrice: ethers.utils.formatEther(event.ticketPrice),
                totalTickets: event.totalTickets.toNumber(),
                ticketsSold: event.ticketsSold.toNumber(),
                organizer: event.organizer,
                isActive: event.isActive
            }
        };

    } catch (error) {
        console.error('❌ Error:', error);
        return {
            success: false,
            event: null,
            message: error.message
        };
    }
}

export async function getMyTickets(userAddress) {
    try {
        if (!contract) {
            throw new Error('Contract not initialized');
        }

        const ticketIds = await contract.getMyTickets(userAddress);

        return {
            success: true,
            ticketIds: ticketIds.map(id => id.toString())
        };

    } catch (error) {
        console.error('❌ Error:', error);
        return {
            success: false,
            ticketIds: [],
            message: error.message
        };
    }
}