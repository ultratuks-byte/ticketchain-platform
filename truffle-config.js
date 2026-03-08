/**
 * Truffle configuration for TicketChain Platform
 * Configured for local Ganache development
 */

module.exports = {
  /**
   * Networks define how you connect to your ethereum client
   */
  networks: {
    // Local development network (Ganache)
    development: {
      host: "127.0.0.1",     // Localhost
      port: 7545,            // Ganache default port
      network_id: "*",       // Match any network id
      gas: 6721975,          // Gas limit
      gasPrice: 20000000000  // 20 gwei
    }
  },

  // Set default mocha options here
  mocha: {
    timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19",    // Must match contract version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
