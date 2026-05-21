const ITEMS_PER_PAGE = 6;
let currentPage = 1;

export function resetPage() {
    currentPage = 1;
}

export function paginate(items) {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
}

export function renderPagination(container, totalItems, onPageChange) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    document.querySelector("#pagination")?.remove();
    
    if (totalPages <= 1) return;

    const nav = document.createElement("nav");
    nav.id = "pagination";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = "pagination-btn" + (i === currentPage ? " active" : "");

        btn.addEventListener("click", () => {
            currentPage = i;
            onPageChange();
        });
        
        nav.appendChild(btn);
    }

    container.insertAdjacentElement("afterend", nav);
}