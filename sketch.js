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
    const colorPicker = document.querySelector("#colorPicker"); 
    const selectedColor = colorPicker.value;
    let opacity = parseFloat(cell.style.opacity) || 0;

    // Helper function to convert hex to RGB
    //https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    /* Right shifting each color value by 16, 8, and 0 bits respectively then performing an AND operation with the max rbg value of 255 translates HEX to RGB*/
    const hexToRgb = (hex) => {
        let bigint = parseInt(hex.slice(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    };

    let currentColor = cell.style.backgroundColor;  // Get current background color in RGB format
    let selectedColorRgb = hexToRgb(selectedColor); // Convert color picker value to RGB for comparison

    if (!cell.classList.contains("painted")) {
        // Initialize the painted cell with opacity 0.1
        cell.classList.add("painted");
        opacity = 0.1;
        cell.setAttribute("style", `background: ${selectedColor}; opacity: ${opacity};`);
    } else if (cell.classList.contains("painted")) {
        // Reset opacity if the current color does not match the color picker value
        if (currentColor !== selectedColorRgb) {
            opacity = 0.1;
        }
        if (opacity < 1.0) {
            opacity = Math.min(opacity + 0.1, 1.0);
        }
        cell.setAttribute("style", `background: ${selectedColor}; opacity: ${opacity};`);
    }
};


let resize = () => {
    const resizeBtn = document.querySelector(".resize");
    resizeBtn.addEventListener("click", () => {
        let widthSize = prompt("Please enter the width for the grid: ");
        widthSize = parseInt(widthSize);

        if (!isNaN(widthSize) && widthSize > 0 && widthSize <= 100) {
            let heightSize = prompt("Please enter the height for the grid: ");
            heightSize = parseInt(heightSize);

            if (!isNaN(heightSize) && heightSize > 0 && heightSize <= 100) {
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

let clear = () => {
    const clearBtn = document.querySelector(".clear");
    const cells = document.querySelectorAll(".gridCell");
    clearBtn.addEventListener("click", () => {
        cells.forEach((cell) => {
            cell.setAttribute("style", "color: white;");
        })
    })
}

createGrid(16, 16);
resize();
clear();