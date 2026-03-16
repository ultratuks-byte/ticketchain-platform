// Wallet Service - ethers v5 compatible
let provider = null;
let signer = null;
let userAddress = null;
let isConnected = false;

export async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            throw new Error('MetaMask not installed');
        }

        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });

        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        userAddress = accounts[0];
        isConnected = true;

        console.log('✅ Wallet connected:', userAddress);

        return {
            success: true,
            address: userAddress,
            message: 'Wallet connected successfully'
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

export function getUserAddress() {
    return userAddress;
}

export function getSigner() {
    if (!isConnected) {
        throw new Error('Wallet not connected');
    }
    return signer;
}

export function getProvider() {
    if (!isConnected) {
        throw new Error('Wallet not connected');
    }
    return provider;
}

export function isWalletConnected() {
    return isConnected;
}

export async function getBalance() {
    try {
        if (!isConnected) {
            throw new Error('Wallet not connected');
        }

        const balance = await provider.getBalance(userAddress);
        const ethBalance = ethers.utils.formatEther(balance);
        
        return ethBalance;
    } catch (error) {
        console.error('❌ Error:', error);
        throw error;
    }
}