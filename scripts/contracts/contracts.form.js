import { validateContract } from "./contracts.validate.js";

export function openContractForm(onSave) {
  const modal = document.querySelector("#new-contract-modal");

  modal.innerHTML = `
    <div class="modal-overlay">
      <div class="modal-content form-modal">
        <button type="button" class="close-modal">&times;</button>
        <h2>Novo contrato</h2>

        <form id="contract-form" class="contract-form">
            <div class="grid-form">
                <div class="form-group">
                    <label for="form-model">Modelo</label>
                    <input id="form-model" type="text" name="model" placeholder="Modelo" value="Novo contrato UpMobb">
                </div>

                <div class="form-group">
                    <label for="form-contractor">Contratante</label>
                    <input id="form-contractor" type="text" name="contractor" placeholder="Contratante" value="Indústria Global S.A.">
                </div>

                <div class="form-group">
                    <label for="form-documentType">Tipo documento</label>
                    <select id="form-documentType" name="documentType">
                      <option value="">Tipo documento</option>
                      <option value="CPF">CPF</option>
                      <option value="CNPJ" selected>CNPJ</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="form-document">Documento</label>
                    <input id="form-document" type="text" name="document" placeholder="Documento" value="56.789.012/0001-88">
                </div>

                <div class="form-group">
                    <label for="form-phone">Telefone</label>
                    <input id="form-phone" type="text" name="phone" placeholder="(41) 99999-9999" value="(41) 99999-9999">
                </div>

                <div class="form-group">
                    <label for="form-email">E-mail</label>
                    <input id="form-email" type="email" name="email" placeholder="E-mail" value="ti@global.com.br">
                </div>

                <div class="form-group">
                    <label for="form-zipCode">CEP</label>
                    <input id="form-zipCode" type="text" name="zipCode" placeholder="CEP" value="83065-150">
                </div>

                <div class="form-group">
                    <label for="form-address">Endereço</label>
                    <input id="form-address" type="text" name="address" placeholder="Endereço" value="Rua das Palmeiras">
                </div>

                <div class="form-group">
                    <label for="form-number">Número</label>
                    <input id="form-number" type="text" name="number" placeholder="Número" value="88">
                </div>

                <div class="form-group">
                    <label for="form-district">Bairro</label>
                    <input id="form-district" type="text" name="district" placeholder="Bairro" value="Industrial">
                </div>

                <div class="form-group">
                    <label for="form-city">Cidade</label>
                    <input id="form-city" type="text" name="city" placeholder="Cidade" value="São José dos Pinhais">
                </div>

                <div class="form-group">
                    <label for="form-state">UF</label>
                    <input id="form-state" type="text" name="state" placeholder="UF" value="PR">
                </div>
            </div>

            <div class="form-group full-width">
                <label for="form-paragraphs">Parágrafos do contrato</label>
                <textarea id="form-paragraphs" name="paragraphs" placeholder="Parágrafos do contrato">Uso de licenças do sistema UpMobb ERP.\n- 50 acessos simultâneos\n**Garantia de SLA** de 99.9%.</textarea>
            </div>
            
            <button type="submit" class="btn-submit">Salvar contrato</button>
        </form>

      </div>
    </div>
  `;

  bindFormEvents(modal, onSave);
}

function bindFormEvents(modal, onSave) {
    modal.onclick = event => {
        const closeButton = event.target.closest(".close-modal");
        const overlay = event.target.closest(".modal-overlay");

        if (closeButton || event.target === overlay) {
            closeContractForm();
        }
    };

    const form = modal.querySelector("#contract-form");
    const documentInput = form.querySelector("#form-document");
    const documentTypeSelect = form.querySelector("#form-documentType");
    const phoneInput = form.querySelector("#form-phone");
    const zipCodeInput = form.querySelector("#form-zipCode");

    documentInput.oninput = () => {
        if (documentTypeSelect.value === "CPF") {
        documentInput.value = maskCPF(documentInput.value);
        } else if (documentTypeSelect.value === "CNPJ") {
        documentInput.value = maskCNPJ(documentInput.value);
        }
    };

    documentTypeSelect.onchange = () => {
        documentInput.value = "";
        documentInput.placeholder = documentTypeSelect.value === "CPF" ? "000.000.000-00" : "00.000.000/0000-00";
    };

    phoneInput.oninput = () => {
        phoneInput.value = maskPhone(phoneInput.value);
    };

    zipCodeInput.oninput = () => {
        zipCodeInput.value = maskCEP(zipCodeInput.value);
    };

    form.onsubmit = event => {
        event.preventDefault();
        const formData = new FormData(form);

        const contract = {
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
        status: 1,
        model: formData.get("model").trim(),
        contractor: formData.get("contractor").trim(),
        documentType: formData.get("documentType").trim(),
        document: formData.get("document").trim(),
        phone: formData.get("phone").trim(),
        email: formData.get("email").trim(),
        zipCode: formData.get("zipCode").trim(),
        address: formData.get("address").trim(),
        number: formData.get("number").trim(),
        district: formData.get("district").trim(),
        city: formData.get("city").trim(),
        state: formData.get("state").trim().toUpperCase(),
        paragraphs: formData.get("paragraphs").split("\n").filter(Boolean)
        };

        const validation = validateContract(contract);

        if (!validation.isValid) {
            alert("Por favor, corrija os seguintes erros:\n\n" + validation.errors.join("\n"));
            return;
        }

        onSave(contract);
        closeContractForm();
    };
}

export function closeContractForm() {
    const modal = document.querySelector("#new-contract-modal");
    modal.innerHTML = "";
}

function maskCPF(value) {
    return value
    .replace(/\D/g, "") 
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    .substring(0, 14);
}

function maskCNPJ(value) {
    return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
}

function maskPhone(value) {
    return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2") 
    .substring(0, 15);
}

function maskCEP(value) {
    return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .substring(0, 9);
}