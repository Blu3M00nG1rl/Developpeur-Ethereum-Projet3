import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VotersSectionBtns() {
    const { state: { contract, accounts } } = useEth();
    const [inputAddress, setInputAddress] = useState("");

    const handleAddressChange = e => {
        setInputAddress(e.target.value);
    };

    const addVoter = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputAddress === "") {
            alert("Please enter something.");
            return;
        }
        const newAddress = inputAddress;
        await contract.methods.addVoter(newAddress).send({ from: accounts[0] });
    };

    return (
        <div className="btns d-flex align-items-center gap-4">
            <input
                type="text"
                placeholder="Addresse"
                value={inputAddress}
                onChange={handleAddressChange}
            />
            <button className='btn d-flex align-items-center gap-2'><i className="ri-ball-pen-line"></i><span onClick={addVoter}>Ajouter</span></button>
        </div>
    );
};

export default VotersSectionBtns;