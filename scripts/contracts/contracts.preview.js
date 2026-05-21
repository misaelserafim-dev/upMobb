function parseParagraph(paragraph) {
    
    if (paragraph.startsWith("-")) {
        return `<li>${paragraph.replace("-", "").trim()}</li>`;
    }

    const boldText = paragraph.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    return `<p>${boldText}</p>`;
}

export function openPreviewModal(contract) {
    const modal = document.querySelector("#preview-modal");
    const paragraphs = contract.paragraphs.map(parseParagraph).join("");

    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content preview-modal">
                <button class="close-modal">&times;</button>

                <h2>${contract.model}</h2>

                <ul class="contract-list">
                    <li><strong>Criado:</strong> <span>${contract.createdAt}</span></li>
                    <li><strong>Contratante:</strong> <span>${contract.contractor}</span></li>
                    <li><strong>Documento:</strong> <span>${contract.document}</span></li>
                    <li><strong>Email:</strong> <span>${contract.email}</span></li>
                    <li><strong>Tipo documento:</strong> <span>${contract.documentType}</span></li>
                    <li><strong>Endereço:</strong> <span>${contract.address}, ${contract.number}, ${contract.district}, ${contract.city} - ${contract.state}</span></li>
                    <li><strong>CEP:</strong> <span>${contract.zipCode}</span></li>
                </ul>

                <div class="preview-text">
                    <h4>Mais detalhes:</h4>
                    <div class="preview-information">
                        ${paragraphs}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add("active");

    modal.onclick = event => {
        const closeButton = event.target.closest(".close-modal");
        const overlay = event.target.closest(".modal-overlay");

        if(closeButton || event.target === overlay) {
            closePreviewModal();
        }
    };
}

export function closePreviewModal() {
  const modal = document.querySelector("#preview-modal");
  modal.classList.remove("active");
  modal.innerHTML = "";
}