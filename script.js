// Todos os dados dos gráficos são fictícios, apenas para demonstração.
const en = document.documentElement.lang === "en";

const T = en
  ? {
      barsTitle: "Claims by line (thousands)",
      lineTitle: "Actual vs budget (monthly EBITDA, index)",
      a: "Actual", b: "Budget",
      names: ["Auto", "Life", "Home", "Business"],
      themeDark: "Dark", themeLight: "Light",
    }
  : {
      barsTitle: "Sinistros por ramo (milhares)",
      lineTitle: "Realizado vs orçado (EBITDA mensal, índice)",
      a: "Realizado", b: "Orçado",
      names: ["Auto", "Vida", "Residencial", "Empresarial"],
      themeDark: "Escuro", themeLight: "Claro",
    };

const sales = { q1: [120, 95, 60, 40], q2: [150, 110, 85, 45], q3: [170, 140, 120, 50] };
const bars = document.getElementById("bars");
const totalEl = document.getElementById("total");
document.getElementById("bars-title").textContent = T.barsTitle;

function render(period) {
  const data = sales[period];
  const max = Math.max(...Object.values(sales).flat());
  bars.innerHTML = "";
  data.forEach((v, i) => {
    const row = document.createElement("div");
    row.className = "bar";
    row.innerHTML = `<span>${T.names[i]}</span><div><i style="width:0"></i></div><b>${v}</b>`;
    bars.appendChild(row);
    requestAnimationFrame(() => (row.querySelector("i").style.width = (v / max) * 100 + "%"));
  });
  totalEl.textContent = data.reduce((a, b) => a + b, 0);
}
document.querySelectorAll(".seg button").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".seg button").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    render(b.dataset.p);
  })
);
render("q1");

// Gráfico de linha: realizado vs orçado
const real = [40, 44, 52, 49, 58, 63, 60, 70, 74, 72];
const prev = [42, 45, 50, 52, 56, 61, 64, 68, 72, 76];
const W = 320, H = 150, P = 12, lo = 30, hi = 80;
const pts = (arr) =>
  arr.map((v, i) => {
    const x = P + (i / (arr.length - 1)) * (W - 2 * P);
    const y = H - P - ((v - lo) / (hi - lo)) * (H - 2 * P);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
document.getElementById("line").innerHTML =
  `<polyline fill="none" style="stroke:var(--text)" stroke-width="2.5" points="${pts(real)}"/>` +
  `<polyline fill="none" style="stroke:var(--chart2)" stroke-width="2.5" stroke-dasharray="5 4" points="${pts(prev)}"/>`;
document.getElementById("line-title").textContent = T.lineTitle;
document.getElementById("lg-a").textContent = T.a;
document.getElementById("lg-b").textContent = T.b;

document.getElementById("y").textContent = new Date().getFullYear();

// Modo escuro: segue o sistema por padrão; o botão guarda a escolha.
const root = document.documentElement;
const isDark = () =>
  root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
const btn = document.querySelector(".theme");
const label = () => btn && (btn.textContent = isDark() ? T.themeLight : T.themeDark);
if (btn) {
  label();
  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });
}
