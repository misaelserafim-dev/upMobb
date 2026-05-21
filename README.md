# UPMOBB — Teste Frontend

Tela administrativa de contratos desenvolvida com HTML, CSS e JavaScript puro, conforme especificado no teste técnico.

---

## Como rodar

1. Abra o projeto no **VS Code**
2. Instale a extensão **Live Server**
3. Clique com o botão direito em `pages/contracts/list.html`
4. Selecione **"Open with Live Server"**

> Não há build, instalação de dependências ou backend. Tudo roda diretamente no navegador via módulos ES.

---

## Estrutura de arquivos

```
UPMOBB/
├── assets/
│   ├── ico.png
│   ├── logomarca.png
│   └── trash.png
├── pages/
│   └── contracts/
│       └── list.html           # Entrada da aplicação
├── scripts/
│   └── contracts/
│       ├── list.js             # Orquestração da tela (filtros, ordenação, eventos)
│       ├── contracts.list.js   # Renderização dos cards e paginação
│       ├── contracts.pagination.js  # Lógica de paginação
│       ├── contracts.form.js   # Modal de criação de contrato
│       ├── contracts.preview.js # Modal de prévia do contrato
│       ├── contracts.requests.js # Camada de dados (mock de getContracts)
│       ├── contracts.mock.js   # Dados mockados (15 contratos)
│       └── contracts.validate.js # Validação dos campos do formulário
└── style/
    └── contracts.css           # Estilos da aplicação
```

---

## Funcionalidades implementadas

- **Listagem** de contratos com modelo, contratante, documento, endereço e status
- **Busca** por contratante, documento e modelo (tempo real)
- **Filtro** por status (Não enviado, Aguardando assinatura, Assinado, Cancelado)
- **Ordenação** por data de criação (mais recente / mais antigo)
- **Paginação** com 6 itens por página e botões numerados
- **Estados de feedback**: carregando, vazio e erro
- **Prévia do contrato** — modal que renderiza parágrafos com suporte a negrito (`**texto**`) e listas (`- item`)
- **Formulário de criação** com validação dos campos obrigatórios
- **Remoção** de contratos com confirmação

---

Os dados são mockados em `contracts.mock.js` com 15 contratos.

A camada `contracts.requests.js` simula uma operação assíncrona.

- **Módulos ES** (`import`/`export`) — sem bundler, sem transpilação
- **Sem frameworks ou bibliotecas externas** — HTML, CSS e JS puro conforme as regras do teste