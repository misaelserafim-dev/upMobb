import { getContracts } from "./contracts.requests.js";
import { renderContracts, renderLoading, renderError } from "./contracts.list.js";

let contracts = [];
const content = document.querySelector("#contracts-content");
const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const sortFilter = document.querySelector("#sort-filter");

// atualiza com o filtro
function filterContracts(contractsList) {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedStatus = Number(statusFilter.value);

  return contractsList.filter(({ contractor, document, model, status }) => {
    const searchableText = `${contractor} ${document} ${model}`.toLowerCase();
    
    const matchesSearch = searchableText.includes(searchTerm);
    const matchesStatus = !selectedStatus || status === selectedStatus;

    return matchesSearch && matchesStatus;
  });
}

// ordenacao
function sortContracts(contractsList) {
  return contractsList.sort((a, b) => 
  {
    const firstDate = new Date(a.createdAt);
    const secondDate = new Date(b.createdAt);

    if (sortFilter.value === "recent") {
      return secondDate - firstDate;
    }

    return firstDate - secondDate;
  });
}

// atualiza com os filtros e ordenacao
function updateList() {
  const clonedContracts = [...contracts];
  const filtered = filterContracts(clonedContracts);
  const sorted = sortContracts(filtered);

  renderContracts(content, sorted, handleRemoveContract);
}

// carrega a lista
async function loadContracts() {
  try {
      renderLoading(content);
      contracts = await getContracts();

      updateList();

  } catch (error) {
      renderError(content);
  }
}

// remove item
function handleRemoveContract(contractId) {
  contracts = contracts.filter(contract => {
      return contract.id !== contractId;
  });

  updateList();
}


searchInput.addEventListener("input",
  updateList
);

statusFilter.addEventListener("change",
  updateList
);

sortFilter.addEventListener("change",
  updateList
);


loadContracts();