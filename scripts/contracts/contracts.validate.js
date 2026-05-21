const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_CEP = /^\d{5}-\d{3}$/;
const REGEX_CPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const REGEX_CNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{0,4}-\d{2}$/;
const REGEX_PHONE = /^\(\d{2}\) \d{5}-\d{4}$/;

export function validateContract(contract) {
  const errors = [];

  if (!contract.model) errors.push("O campo 'Modelo' é obrigatório.");
  if (!contract.contractor) errors.push("O campo 'Contratante' é obrigatório.");
  if (!contract.address) errors.push("O campo 'Endereço' é obrigatório.");
  if (!contract.number) errors.push("O campo 'Número' é obrigatório.");
  if (!contract.district) errors.push("O campo 'Bairro' é obrigatório.");
  if (!contract.city) errors.push("O campo 'Cidade' é obrigatório.");

  if (!contract.state || contract.state.length !== 2) {
    errors.push("O campo 'UF' deve conter exatamente 2 letras.");
  }

  if (!REGEX_EMAIL.test(contract.email)) {
    errors.push("Formato de E-mail inválido.");
  }

  if (!REGEX_CEP.test(contract.zipCode)) {
    errors.push("Formato de CEP inválido. Use XXXXX-XXX.");
  }

  if (contract.phone && !REGEX_PHONE.test(contract.phone)) {
    errors.push("Formato de telefone inválido. Use (XX) XXXXX-XXXX.");
  }

  if (contract.documentType === "CPF") {
    if (!REGEX_CPF.test(contract.document)) {
      errors.push("Formato de CPF inválido. Use XXX.XXX.XXX-XX.");
    }
  } else if (contract.documentType === "CNPJ") {
    if (!REGEX_CNPJ.test(contract.document)) {
      errors.push("Formato de CNPJ inválido. Use XX.XXX.XXX/XXXX-XX.");
    }
  } else {
    errors.push("Selecione um tipo de documento válido (CPF/CNPJ).");
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}