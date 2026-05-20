import { getContracts } from "./contracts.requests.js";
import { renderContracts, renderLoading, renderError } from "./contracts.list.js";

let contracts = [];

// carrega a lista
async function loadContracts() {
    try {
        renderLoading(content);
        contracts = await getContracts();
    } catch (error) {
        renderError(content);
    }
}

// remove item
function handleRemoveContract(contractId) {
    contracts = contracts.filter(contract => {
        return contract.id !== contractId;
    });

}


loadContracts();