const TicketSystem = artifacts.require("TicketSystem");

module.exports = function(deployer) {
  deployer.deploy(TicketSystem);
};
