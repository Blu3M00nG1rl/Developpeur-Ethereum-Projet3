import { useState } from "react";
import useEth from "../../../contexts/EthContext/useEth"

function ProposalsSectionBtns() {
    const { state: { contract, accounts } } = useEth();
    const [inputText, setInputText] = useState("");

    const handleTextChange = e => {
        setInputText(e.target.value);
    };

    const addProposal = async e => {
        if (e.target.tagName === "INPUT") {
            return;
        }
        if (inputText === "") {
            alert("Merci d'entrer une proposition.");
            return;
        }
        const newProposal = inputText;
        await contract.methods.addProposal(newProposal).send({ from: accounts[0] });
        window.location.reload();
    };

    return (
        <div className="btns d-flex align-items-center gap-4">
            <input
                type="text"
                placeholder="Proposez un artiste"
                value={inputText}
                onChange={handleTextChange}
            />
            <button className='btn_ajout d-flex align-items-center gap-2'><i className="ri-ball-pen-line"></i><span onClick={addProposal}>Enregistrer</span></button>
        </div>
    );
};

export default ProposalsSectionBtns;