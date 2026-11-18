// Dados fictícios apenas para demonstração
const sales = {
  q1: { Site: 120, Marketplace: 95, Instagram: 60, Loja: 40 },
  q2: { Site: 150, Marketplace: 110, Instagram: 85, Loja: 45 },
  q3: { Site: 170, Marketplace: 140, Instagram: 120, Loja: 50 },
};

const bars = document.getElementById("bars");
const totalEl = document.getElementById("total");

function render(period) {
  const data = sales[period];
  const max = Math.max(...Object.values(sales).flatMap(Object.values));
  bars.innerHTML = "";
  let total = 0;
  for (const [name, v] of Object.entries(data)) {
    total += v;
    const row = document.createElement("div");
    row.className = "bar";
    row.innerHTML = `<span>${name}</span><div><i style="width:0"></i></div><b>${v}</b>`;
    bars.appendChild(row);
    requestAnimationFrame(() => {
      row.querySelector("i").style.width = (v / max) * 100 + "%";
    });
  }
  totalEl.textContent = "R$ " + total + " mil";
}

document.querySelectorAll(".seg button").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".seg button").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    render(b.dataset.p);
  })
);
render("q1");

// Gráfico de linha: real vs previsto
const real = [40, 44, 52, 49, 58, 63, 60, 70, 74, 72];
const prev = [42, 45, 50, 52, 56, 61, 64, 68, 72, 76];
const W = 320, H = 150, P = 12;
const lo = 30, hi = 80;
const pts = (arr) =>
  arr
    .map((v, i) => {
      const x = P + (i / (arr.length - 1)) * (W - 2 * P);
      const y = H - P - ((v - lo) / (hi - lo)) * (H - 2 * P);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
document.getElementById("line").innerHTML =
  `<polyline fill="none" stroke="#111" stroke-width="2.5" points="${pts(real)}"/>` +
  `<polyline fill="none" stroke="#8a8a8a" stroke-width="2.5" stroke-dasharray="5 4" points="${pts(prev)}"/>`;

document.getElementById("y").textContent = new Date().getFullYear();
