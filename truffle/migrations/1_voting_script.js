// Import du smart contract
const Voting = artifacts.require("Voting");
//Déploiement du contrat
module.exports = async (deployer) => {
  await deployer.deploy(Voting, 10000);
} 