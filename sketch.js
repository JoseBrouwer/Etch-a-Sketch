let createGrid = (width, height) => {
    const body = document.querySelector("body");
    const container = document.createElement("div");
    container.classList.add("container");

    body.appendChild(container);

    for(let i = 0; i < width; i++) {
        const gridColumn = document.createElement("div");
        gridColumn.classList.add("gridColumn");
        container.appendChild(gridColumn);
    };

    const columns = document.querySelectorAll(".gridColumn");

    columns.forEach(col => {
        for(let i = 0; i < height; i++) {
            const gridCell = document.createElement("div");
            gridCell.classList.add("gridCell");

            col.appendChild(gridCell);
        };
    });
};

createGrid(16, 16);