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

            gridCell.addEventListener("mouseenter", () => {
                paintCell(gridCell);
            });

            col.appendChild(gridCell);
        };
    });
};

let paintCell = (cell) => {
    cell.classList.toggle("painted");
    if(cell.classList.contains("painted"))
        cell.setAttribute("style", "background: blue;" )
    else
        cell.setAttribute("style", "background: white;" )
};

let resize = () => {
    const resizeBtn = document.querySelector(".resize");
    resizeBtn.addEventListener("click", () => {
        let widthSize = prompt("Please enter the width for the grid: ");
        widthSize = parseInt(widthSize);

        if (!isNaN(widthSize) && widthSize > 0) {
            let heightSize = prompt("Please enter the height for the grid: ");
            heightSize = parseInt(heightSize);

            if (!isNaN(heightSize) && heightSize > 0) {
                const body = document.querySelector("body");
                const container = document.querySelector(".container");

                if (container) {
                    container.remove();  // Remove the entire container
                }

                createGrid(widthSize, heightSize);  // Create new grid
            } else {
                alert("Please enter a valid number for height.");
            }
        } else {
            alert("Please enter a valid number for width.");
        }
    });
};

createGrid(16, 16);
resize();