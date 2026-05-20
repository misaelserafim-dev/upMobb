import { getContracts } from "./contracts.requests.js";
import { renderContracts, renderLoading, renderError } from "./contracts.list.js";

let contracts = [];

async function loadContracts() {
    try {
        renderLoading(content);
        contracts = await getContracts();
        updateList();
    } catch (error) {
        renderError(content);
    }
}

loadContracts();