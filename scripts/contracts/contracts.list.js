import { openPreviewModal } from "./contracts.modal.js";

function getStatusLabel(status) {
    const statusMap = {
    1: "Não enviado",
    2: "Aguardando assinatura",
    3: "Assinado",
    4: "Cancelado"
    };

    return statusMap[status] || "";
}

// fallbacks carregando, erro, vazio
export function renderLoading(container) {
  container.innerHTML = `
    <div class="loading-container-status">
      Carregando contratos...
    </div>
  `;
}

export function renderEmpty(container) {
  container.innerHTML = `
    <div class="loading-container-status empty">
      Nenhum contrato encontrado.
    </div>
  `;
}

export function renderError(container) {
  container.innerHTML = `
    <div class="loading-container-status error">
      Erro ao carregar contratos.
    </div>
  `;
}
// fallbacks carregando, erro, vazio


// componente card
function createContractRow(contract) {
  const {
    status = "",
    id = "",
    createdAt = "",
    model = "",
    contractor = "",
    document = "",
    email = "",
    address = "",
    number = "",
    district = "",
    city = "",
    state = ""
  } = contract ?? {}; 

  return `
    <div class="contract-row status-${status}">

      <button class="remove-button" data-id="${id}">
        <img src="../../assets/trash.png" alt="Remover contrato">
      </button>
      
      <div class="contract-column">
        <span class="status-badge status-${status}">
          ${getStatusLabel(status)}
        </span>
      </div>

      <ul class="contract-list">
        <li><strong>Modelo:</strong> ${model}</li>
        <li><strong>Criado:</strong> ${createdAt}</li>
        <li><strong>Contratante:</strong> ${contractor}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>

      <details class="contract-details">
        <summary>Mais detalhes</summary>
          <ul class="contract-list">
            <li><strong>Tipo documento:</strong>${contract.documentType}</li>
            <li><strong>Documento:</strong> ${document}</li>
            <li><strong>Endereço:</strong> ${address}, ${number}, ${district}, ${city} - ${state}</li>
            <li><strong>CEP:</strong>${contract.zipCode}</li>
          </ul>
      </details>
      
      <button type="button" class="preview-button" data-preview="${id}">Prévia</button>
    </div>
  `;
}


function bindRemoveEvents(onRemove) {
  const buttons = document.querySelectorAll(".remove-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const contractId = Number(button.dataset.id);
      
      console.log("id contrato", button.dataset.id);
      onRemove(contractId);
    });
  });
}

function bindPreviewEvents(contracts) {
  const buttons = document.querySelectorAll(".preview-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const contractId = Number(button.dataset.preview);

      const contract = contracts.find(item => {
        return item.id === contractId;
      });

      if (!contract) {  return; }

      openPreviewModal(contract);
    });
  });
}

export function renderContracts(container, contracts, onRemove) {
  if (!contracts.length) {
    return renderEmpty(container);
  }

  const rows = contracts.map(contract => {
    return createContractRow(contract);
  }).join("");

  container.innerHTML = `${rows}`;

  bindRemoveEvents(onRemove);
  bindPreviewEvents(contracts);
}