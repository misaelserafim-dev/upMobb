import { getContracts } from "./contracts.requests.js";
import { renderContracts, renderLoading, renderError } from "./contracts.list.js";
import { openContractForm} from "./contracts.form.js";
import { resetPage } from "./contracts.pagination.js";

let contracts = [];

const SORT_TYPES = {
  RECENT: "recent",
  OLDEST: "oldest"
};

const content =  document.querySelector("#contracts-content");
const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const sortFilter = document.querySelector("#sort-filter");
const openFormButton = document.querySelector("#open-contract-form");

function init() {
  eventListeners();
  loadContracts();
}

if (!content || !searchInput || !statusFilter || !sortFilter || !openFormButton) {
  document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <h2>Ops! Algo deu errado ao carregar a página.</h2>
      <button onclick="window.location.reload()">Atualizar Página</button>
    </div>
  `;
  throw new Error("Elemento crítico #contracts-content não encontrado.");
}

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
  const sortType = sortFilter.value;

  return [...contractsList].sort((firstContract, secondContract) => {
    const firstDate = new Date(firstContract.createdAt).getTime();
    const secondDate = new Date(secondContract.createdAt).getTime();

    const sortMap = {
      [SORT_TYPES.RECENT]: secondDate - firstDate,
      [SORT_TYPES.OLDEST]: firstDate - secondDate
    };

    return sortMap[sortType] ?? 0;
  });
}

// atualiza com os filtros e ordenacao
function updateList(reset = false) {
  try {

    if (reset) resetPage();

    const clonedContracts = [...contracts];
    const filtered = filterContracts(clonedContracts);
    const sorted = sortContracts(filtered);

    renderContracts(content, sorted, handleRemoveContract);

  } catch (error) {
    renderError(content);
  }
}

// carrega a lista
async function loadContracts() {
  try {

    // throw new Error("Simulando erro");

    renderLoading(content);
    contracts = await getContracts();

    updateList();

  } catch (error) {
    renderError(content);
  }
}

// cria novo item
function handleCreateContract(contract) {
  const newContract = {
    ...contract,
    createdAt: contract.createdAt || new Date().toISOString()
  };
  contracts.unshift(newContract);
  updateList();
}

// evento modal novo contrato
openFormButton.onclick = () => {
  openContractForm(
    handleCreateContract
  );
};

// remove item
function handleRemoveContract(contractId) {
  if (!contractId) { return; }

  if (!confirm("Tem certeza que deseja excluir?")) {
    return;
  }

  contracts = contracts.filter(contract => {
    return contract.id !== contractId;
  });

  updateList();
}

function eventListeners() {
  searchInput.addEventListener("input", () => updateList(true));
  statusFilter.addEventListener("change", () => updateList(true));
  sortFilter.addEventListener("change", () => updateList(true));
}

init();