// 견적서/거래명세서 자동계산: 수량×단가=금액, 합계(공급가액)·부가세(10%)·합계금액.
// 편집 엔진(editor.js)과 함께 동작하며, 품목표가 없는 페이지에서는 아무 일도 하지 않습니다.
const table = document.querySelector(".trade-table");

if (table) {
  const digits = (el) => Number((el?.textContent || "").replace(/[^\d]/g, "")) || 0;
  const fmt = (n) => (n ? n.toLocaleString("ko-KR") : "");
  const fmtZero = (n) => n.toLocaleString("ko-KR");

  const amtCells = [...document.querySelectorAll("[data-trade-amt]")];
  const numInputs = [...document.querySelectorAll(".trade-num")];

  function setAll(selector, text) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = text;
    });
  }

  function recalc() {
    let supply = 0;
    amtCells.forEach((cell) => {
      const row = cell.getAttribute("data-trade-amt");
      const qty = digits(document.querySelector(`[data-field="qty${row}"]`));
      const price = digits(document.querySelector(`[data-field="price${row}"]`));
      const amt = qty * price;
      cell.textContent = fmt(amt);
      supply += amt;
    });
    const vat = Math.round(supply * 0.1);
    const total = supply + vat;
    setAll("[data-trade-supply]", fmtZero(supply));
    setAll("[data-trade-vat]", fmtZero(vat));
    setAll("[data-trade-total]", fmtZero(total));
  }

  numInputs.forEach((el) => {
    el.addEventListener("input", recalc);
    // 단가는 칸을 벗어날 때 천 단위 콤마로 정리(계산은 콤마를 무시하므로 안전)
    if (el.dataset.field && el.dataset.field.startsWith("price")) {
      el.addEventListener("blur", () => {
        const n = digits(el);
        if (n) el.textContent = fmtZero(n);
        recalc();
      });
    }
  });

  recalc();
}
