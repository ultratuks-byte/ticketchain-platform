// Wallet Service - MetaMask Integration
// Handles wallet connection, account management, and network switching

let currentAccount = null;

// Check if MetaMask is installed
function isMetaMaskInstalled() {
    return typeof window.ethereum !== 'undefined';
}

// Connect to MetaMask wallet
async function connectWallet() {
    if (!isMetaMaskInstalled()) {
        alert('MetaMask is not installed! Please install MetaMask browser extension.');
        window.open('https://metamask.io/download/', '_blank');
        return null;
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });

        currentAccount = accounts[0];
        console.log('Connected account:', currentAccount);

        // Check if on correct network
        await checkNetwork();

        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        return currentAccount;

    } catch (error) {
        console.error('Error connecting wallet:', error);
        if (error.code === 4001) {
            alert('Please connect to MetaMask to use this application.');
        } else {
            alert('Error connecting wallet: ' + error.message);
        }
        return null;
    }
}

// Check if wallet is already connected
async function checkWalletConnection() {
    if (!isMetaMaskInstalled()) {
        return null;
    }

    try {
        const accounts = await window.ethereum.request({
            method: 'eth_accounts'
        });

        if (accounts.length > 0) {
            currentAccount = accounts[0];
            await checkNetwork();
            return currentAccount;
        }

        return null;

    } catch (error) {
        console.error('Error checking wallet connection:', error);
        return null;
    }
}

// Get current connected account
function getCurrentAccount() {
    return currentAccount;
}

// Check and switch to correct network
async function checkNetwork() {
    try {
        const chainId = await window.ethereum.request({
            method: 'eth_chainId'
        });

        // Check if on Ganache Local (chainId 0x539 = 1337)
        if (chainId !== NETWORK_CONFIG.chainId) {
            const shouldSwitch = confirm(
                'You are not connected to Ganache Local network. Would you like to switch?'
            );

            if (shouldSwitch) {
                await switchToGanache();
            }
        }

    } catch (error) {
        console.error('Error checking network:', error);
    }
}

// Switch to Ganache network
async function switchToGanache() {
    try {
        // Try to switch to the network
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NETWORK_CONFIG.chainId }]
        });

    } catch (switchError) {
        // Network doesn't exist, add it
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [NETWORK_CONFIG]
                });
            } catch (addError) {
                console.error('Error adding network:', addError);
                alert('Failed to add Ganache network. Please add it manually in MetaMask.');
            }
        } else {
            console.error('Error switching network:', switchError);
        }
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User disconnected wallet
        console.log('Please connect to MetaMask.');
        currentAccount = null;
        window.location.reload();
    } else if (accounts[0] !== currentAccount) {
        // User switched accounts
        currentAccount = accounts[0];
        console.log('Account changed to:', currentAccount);
        window.location.reload();
    }
}

// Handle chain/network changes
function handleChainChanged(chainId) {
    console.log('Network changed to:', chainId);
    window.location.reload();
}

// Disconnect wallet (cleanup)
function disconnectWallet() {
    currentAccount = null;
    window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    window.ethereum.removeListener('chainChanged', handleChainChanged);
}

// Format account address for display
function formatAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(38)}`;
}

// Get account balance
async function getAccountBalance(address) {
    try {
        const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [address || currentAccount, 'latest']
        });

        // Convert from Wei to ETH
        const balanceInEth = parseInt(balance, 16) / 1e18;
        return balanceInEth;

    } catch (error) {
        console.error('Error getting balance:', error);
        return 0;
    }
}
