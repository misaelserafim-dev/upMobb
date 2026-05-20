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

function renderEmpty(container) {
  container.innerHTML = `
    <div class="loading-container-status empty">
      Nenhum contrato encontrado.
    </div>
  `;
}

function renderError(container) {
  container.innerHTML = `
    <div class="loading-container-status error">
      Erro ao carregar contratos.
    </div>
  `;
}
// fallbacks carregando, erro, vazio


// componente card
function createContractRow(contract) {
  return `
    <div class="contract-row status-${contract.status}">
      <div class="contract-column">
        <span class="status-badge">
          ${getStatusLabel(contract.status)}
        </span>
      </div>

      <ul class="contract-list">
        <li><strong>Modelo</strong>: ${contract.model}</li>
        <li><strong>Contratante</strong>: ${contract.contractor}</li>
        <li><strong>Contratário</strong>: ${contract.document}</li>
        <li><strong>Endereço</strong>: ${contract.address}, ${contract.number}</li>
      </ul>

      <div class="contract-column">
        <div class="contract-actions">

          <button type="button">
            Detalhes
          </button>

          <button type="button">
            Prévia
          </button>

          <button class="remove-button" data-id="${contract.id}">
            Excluir
          </button>

        </div>
      </div>

    </div>
  `;
}

function bindRemoveEvents(onRemove) {
  const buttons =
    document.querySelectorAll(".remove-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const contractId =
        Number(button.dataset.id);

      onRemove(contractId);
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
}

function renderEmpty(container) {
  container.innerHTML = `
    <div class="empty-state">
      Nenhum contrato encontrado.
    </div>
  `;
}