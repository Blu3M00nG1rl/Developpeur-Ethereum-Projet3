function Workflow({ callStatus }) {


    return (
        <>
            <div className="workflow_message">
                <div className="text-center">
                    {
                        (() => {

                            switch (callStatus) {
                                case "1":
                                    return (
                                        <div className="text-center">Ouverture de l'enregistrement des propositions - Cliquez sur "Propositions" et soumettez une ou plusieurs propositions.</div>
                                    )
                                case "2":
                                    return (
                                        <div className="text-center">Fermeture de l'enregistrement des propositions.</div>
                                    )
                                case "3":
                                    return (
                                        <div className="text-center">Session de vote ouverte - Cliquez sur "Vote" et votez pour le numéro de votre proposition préférée.</div>
                                    )
                                case "4":
                                    return (
                                        <div className="text-center">Session de vote fermée  -  Calcul des résultats en cours.</div>
                                    )
                                case "5":
                                    return (
                                        <div className="text-center">Session de vote cloturée  -  Cliquez sur "Résultats" et affichez la proposition gagnante.</div>
                                    )
                                default:
                                    return (
                                        <div className="text-center">Phase d'enregistrement des voteurs sur la Whitelist</div>
                                    )
                            }

                        })()
                    }</div>

            </div>
        </>
    );
}

export default Workflow;