import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"

function VotersSectionBtns() {
    const { state: { contract, accounts, web3 } } = useEth();
    const [inputAddress, setInputAddress] = useState("");

    const handleAddressChange = e => {
        setInputAddress(e.target.value);
    };

    const addVoter = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputAddress === "") {
            alert("Merci d'entrer une Adresse.");
            return;
        }
        if (!web3.utils.isAddress(inputAddress)) {
            alert("Cette adresse est invalide")
        }
        const newAddress = inputAddress;
        await contract.methods.addVoter(newAddress).send({ from: accounts[0] });
    };

    return (
        <div className="btns d-flex align-items-center gap-4">
            <input
                type="text"
                placeholder="Adresse"
                value={inputAddress}
                onChange={handleAddressChange}
            />
            <button className='btn_ajout d-flex align-items-center gap-2'><i className="ri-ball-pen-line"></i><span onClick={addVoter}>Ajouter</span></button>
        </div>
    );
};

export default VotersSectionBtns;