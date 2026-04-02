// Utility Functions
// Helper functions for formatting, conversions, and common operations

// Format Wei to ETH
function formatEther(wei) {
    const eth = Number(BigInt(wei)) / 1e18;
    return eth.toFixed(4);
}

// Parse ETH to Wei
function parseEther(eth) {
    const wei = BigInt(Math.floor(parseFloat(eth) * 1e18));
    return wei.toString();
}

// Format date from Unix timestamp
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Format date for input field (YYYY-MM-DDTHH:mm)
function formatDateForInput(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// Parse date from input to Unix timestamp
function parseDateToTimestamp(dateString) {
    const date = new Date(dateString);
    return Math.floor(date.getTime() / 1000);
}

// Get current Unix timestamp
function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}

// Format address for display
function formatAddress(address) {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(38)}`;
}

// Copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy', 'error');
    });
}

// Show notification toast
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show loading overlay
function showLoading(message = 'Loading...') {
    let overlay = document.getElementById('loadingOverlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <p id="loadingMessage">${message}</p>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    document.getElementById('loadingMessage').textContent = message;
    overlay.style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

// Validate Ethereum address
function isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Validate positive number
function isPositiveNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
}

// Validate integer
function isPositiveInteger(value) {
    const num = parseInt(value);
    return !isNaN(num) && num > 0 && Number.isInteger(num);
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Calculate percentage
function calculatePercentage(part, total) {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
}

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Redirect with parameters
function redirectWithParams(url, params) {
    const urlParams = new URLSearchParams(params);
    window.location.href = `${url}?${urlParams.toString()}`;
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if date is in the future
function isFutureDate(timestamp) {
    return timestamp > getCurrentTimestamp();
}

// Get time remaining until date
function getTimeRemaining(timestamp) {
    const now = getCurrentTimestamp();
    const diff = timestamp - now;

    if (diff <= 0) {
        return 'Event has passed';
    }

    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} remaining`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''} remaining`;
    }
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Generate random color
function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

// Truncate text with ellipsis
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Check if user is event organizer
function isOrganizer(eventOrganizerAddress) {
    const currentAccount = getCurrentAccount();
    return currentAccount && currentAccount.toLowerCase() === eventOrganizerAddress.toLowerCase();
}

// Check if user owns ticket
function isTicketOwner(ticketOwnerAddress) {
    const currentAccount = getCurrentAccount();
    return currentAccount && currentAccount.toLowerCase() === ticketOwnerAddress.toLowerCase();
}

// Format transaction hash for display
function formatTxHash(hash) {
    if (!hash) return '';
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
}

// Get Etherscan link (for real networks)
function getEtherscanLink(txHash, network = 'ganache') {
    if (network === 'ganache') {
        return '#'; // Ganache doesn't have block explorer
    }
    // For other networks, construct Etherscan URL
    return `https://etherscan.io/tx/${txHash}`;
}

// Local storage helpers
function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function getFromLocalStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}

// Error message handler
function handleError(error, userMessage = 'An error occurred') {
    console.error('Error:', error);

    let message = userMessage;

    // Check for specific error types
    if (error.code === 4001) {
        message = 'Transaction was rejected by user';
    } else if (error.message && error.message.includes('insufficient funds')) {
        message = 'Insufficient funds for transaction';
    } else if (error.message && error.message.includes('user rejected')) {
        message = 'Transaction was rejected';
    } else if (error.message) {
        message = error.message;
    }

    showNotification(message, 'error');
    return message;
}
