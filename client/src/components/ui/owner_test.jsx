const fetchOwner = async () => { try { const currentOwner = await contract.methods.owner().call(); setOwner(currentOwner); } catch (err) { setOwner(""); } };
