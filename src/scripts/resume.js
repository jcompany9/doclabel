// 이력서 행 추가·삭제. 미리 렌더된 숨은 행(.row-hidden)을 보이거나 숨깁니다.
// 모든 행은 로드 시 editor.js에 연결돼 있어 새로 보인 행도 바로 편집됩니다.
const controls = document.querySelectorAll("[data-add-row], [data-del-row]");

if (controls.length) {
  const rowsOf = (group) => [...document.querySelectorAll(`tr[data-row-group="${group}"]`)];

  document.querySelectorAll("[data-add-row]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hidden = rowsOf(btn.dataset.addRow).find((r) => r.classList.contains("row-hidden"));
      if (hidden) hidden.classList.remove("row-hidden");
    });
  });

  document.querySelectorAll("[data-del-row]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const visible = rowsOf(btn.dataset.delRow).filter((r) => !r.classList.contains("row-hidden"));
      if (visible.length > 1) {
        const last = visible[visible.length - 1];
        last.querySelectorAll("[data-field]").forEach((f) => {
          f.textContent = "";
        });
        last.classList.add("row-hidden");
      }
    });
  });
}
