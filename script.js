const pascals = {
    input: [
      { class: "rows", span: "Number of Rows", type: "number", value: 5 },
      { class: "delay", span: "image", type: "number", value: 1 },
    ],
    colors: ["red", "yellow", "green", "blue"],
    button: ["start", "stop"],
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    function createOptions() {
      const options = document.querySelector(".options");
      const controls = document.createElement("div");
      controls.className = "choices";
  
      pascals.input.forEach((item) => {
        if (item.span === "image") {
          const img = document.createElement("img");
          img.src = "https://w7.pngwing.com/pngs/180/766/png-transparent-stopwatch-timer-time-miscellaneous-angle-time-thumbnail.png"; // Replace with the correct path if necessary
          img.alt = "Delay Icon";
          img.style.height = "20px";
          img.style.width = "20px";
          controls.append(img);
        } else {
          const span = document.createElement("span");
          span.innerHTML = item.span;
          controls.append(span);
        }
  
        const input = document.createElement("input");
        input.className = item.class;
        input.type = item.type;
        input.value = item.value;
        controls.append(input);
      });
  
      options.append(controls);
  
      const outputFlex = document.createElement("div");
      outputFlex.className = "output-flex";
      options.append(outputFlex);
  
      const colors = document.createElement("div");
      colors.className = "colors";
  
      pascals.colors.forEach((color) => {
        const input = document.createElement("input");
        input.className = "color-radio";
        input.type = "radio";
        input.name = "color";
        input.value = color;
        input.style.backgroundColor = color;
  
        colors.append(input);
      });
  
      options.append(colors);
  
      const startButton = document.createElement("button");
      startButton.textContent = "Start";
      startButton.addEventListener("click", startDrawing);
      options.append(startButton);
  
      const stopButton = document.createElement("button");
      stopButton.textContent = "Stop";
      stopButton.addEventListener("click", stopDrawing);
      options.append(stopButton);
    }
  
    function createTriangle(n) {
      const outputFlex = document.querySelector(".output-flex");
      outputFlex.innerHTML = "";
  
      for (let i = 0; i < n; i++) {
        const row = document.createElement("div");
        row.className = "row";
        const circlesInRow = 2 * i + 1;
        const spacesBefore = (2 * n - 1 - circlesInRow) / 2;
  
        for (let k = 0; k < spacesBefore; k++) {
          const spacer = document.createElement("div");
          spacer.className = "spacer";
          row.appendChild(spacer);
        }
  
        for (let j = 0; j < circlesInRow; j++) {
          const circle = document.createElement("div");
          circle.className = "circle";
          row.appendChild(circle);
        }
        for (let k = 0; k < spacesBefore; k++) {
          const spacer = document.createElement("div");
          spacer.className = "spacer";
          row.appendChild(spacer);
        }
  
        outputFlex.appendChild(row);
      }
    }
  
    let intervalId;
  
    function startDrawing() {
      const rows = document.querySelector(".rows").value;
      const delay = document.querySelector(".delay").value * 100;
      const color =
        document.querySelector('input[name="color"]:checked')?.value || "#f06529";
      const outputFlex=document.querySelector('.output-flex');
      outputFlex.style.position='relative';
      createTriangle(rows);
      colorRows(color, delay);
    }
  
    function colorRows(color, delay) {
      const rows = document.querySelectorAll(".row");
      let currentRow = 0;
  
      intervalId = setInterval(() => {
        rows.forEach((row) => {
          row.childNodes.forEach((circle) => (circle.style.backgroundColor = ""));
        });
  
        if (currentRow < rows.length) {
          rows[currentRow].childNodes.forEach(
            (circle) => (circle.style.backgroundColor = color)
          );
          currentRow++;
        } else {
          currentRow = 0;
        }
      }, delay);
    }
  
    function stopDrawing() {
      clearInterval(intervalId);
    }
  
    createOptions();
  });
  