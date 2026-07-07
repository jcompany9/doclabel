import { track } from "./analytics.js";

// A4 시트 위 contenteditable 칸을 편집/스타일링하고 인쇄로 연결하는 엔진.
// 시트(#printSheet)나 편집 칸이 없는 페이지에서는 아무 일도 하지 않습니다.
const fields = [...document.querySelectorAll("[data-field]")];
const printSheet = document.getElementById("printSheet");

if (printSheet && fields.length) {
  const fieldToolbar = document.getElementById("fieldToolbar");
  const fontFamilySelect = document.getElementById("fontFamilySelect");
  const boldToggle = document.getElementById("boldToggle");
  const fontSizeInput = document.getElementById("fontSizeInput");
  const letterSpacingInput = document.getElementById("letterSpacingInput");
  const printButton = document.querySelector('[data-action="print"]');
  const templateTabs = [...document.querySelectorAll("[data-template-tab]")];

  // 세션 동안 한 번이라도 편집된 필드를 기록해 중복 이벤트를 막습니다.
  const editedFields = new Set();

  let activeField = null;
  let fieldStyles = {};

  function rememberValue(field) {
    field.dataset.lastValidValue = field.textContent;
  }

  function getDefaultStyleForField(field) {
    if (field.classList.contains("title-input")) {
      return { fontFamily: "'Pretendard', sans-serif", fontWeight: "500", fontSize: "42", letterSpacing: "8" };
    }
    if (field.classList.contains("main-title-input")) {
      return { fontFamily: "'Pretendard', sans-serif", fontWeight: "700", fontSize: "42", letterSpacing: "8" };
    }
    if (field.classList.contains("year-chip-input") || field.classList.contains("project-input") || field.classList.contains("company-input")) {
      return { fontFamily: "'Pretendard', sans-serif", fontWeight: "500", fontSize: "22", letterSpacing: "0" };
    }
    if (field.classList.contains("split-year-input")) {
      return { fontFamily: "'Pretendard', sans-serif", fontWeight: "500", fontSize: "40", letterSpacing: "10" };
    }
    if (field.classList.contains("spine-title-input")) {
      return { fontFamily: "'Pretendard', sans-serif", fontWeight: "500", fontSize: "34", letterSpacing: "4" };
    }
    return { fontFamily: "'Pretendard', sans-serif", fontWeight: "500", fontSize: "18", letterSpacing: "0" };
  }

  function getFieldKey(field) {
    return field.dataset.field;
  }

  function getFieldStyle(field) {
    return {
      ...getDefaultStyleForField(field),
      ...(fieldStyles[getFieldKey(field)] || {}),
    };
  }

  function applyStyleToField(field, style) {
    field.style.fontFamily = style.fontFamily;
    field.style.fontWeight = style.fontWeight;
    field.style.fontSize = `${style.fontSize}px`;
    field.style.letterSpacing = `${Number(style.letterSpacing) / 40}em`;
  }

  function applyAllFieldStyles() {
    fields.forEach((field) => {
      applyStyleToField(field, getFieldStyle(field));
    });
  }

  function fieldOverflows(field) {
    const tolerance = 1;
    return (
      field.scrollWidth > field.clientWidth + tolerance ||
      field.scrollHeight > field.clientHeight + tolerance
    );
  }

  function clampFieldValue(field) {
    if (!field) {
      return false;
    }

    // 줄바꿈이 실제로 있을 때만 textContent를 손댑니다. 매 입력마다 재할당하면
    // 커서가 맨 앞으로 튀어(글자 역순 입력) 한글 IME 조합도 깨지기 때문입니다.
    const cleaned = field.textContent.replace(/\n/g, "");
    if (cleaned !== field.textContent) {
      field.textContent = cleaned;
      placeCaretAtEnd(field);
    }

    if (!fieldOverflows(field)) {
      rememberValue(field);
      return false;
    }

    field.textContent = field.dataset.lastValidValue || "";
    placeCaretAtEnd(field);
    return true;
  }

  function updateTextControls() {
    const disabled = !activeField;
    fieldToolbar.hidden = disabled;
    fontFamilySelect.disabled = disabled;
    boldToggle.disabled = disabled;
    fontSizeInput.disabled = disabled;
    letterSpacingInput.disabled = disabled;

    if (disabled) {
      return;
    }

    const style = getFieldStyle(activeField);
    fontFamilySelect.value = style.fontFamily;
    boldToggle.checked = style.fontWeight === "700";
    fontSizeInput.value = style.fontSize;
    letterSpacingInput.value = style.letterSpacing;
  }

  function positionFieldToolbar() {
    if (!activeField || fieldToolbar.hidden) {
      return;
    }

    const rect = activeField.getBoundingClientRect();
    const toolbarRect = fieldToolbar.getBoundingClientRect();
    const top = Math.max(12, rect.top - toolbarRect.height - 10);
    const left = Math.min(Math.max(12, rect.left), window.innerWidth - toolbarRect.width - 12);

    fieldToolbar.style.top = `${top}px`;
    fieldToolbar.style.left = `${left}px`;
  }

  function setActiveField(field) {
    activeField = field;
    fields.forEach((item) => item.classList.remove("active-field"));

    if (field) {
      field.classList.add("active-field");
    }

    updateTextControls();
    requestAnimationFrame(positionFieldToolbar);
  }

  function fillFields() {
    fields.forEach((field) => {
      field.textContent = "";
      rememberValue(field);
    });
  }

  function applyInitialState() {
    fillFields();
    fieldStyles = {};
    printSheet.dataset.template = printSheet.dataset.template || "single";
    templateTabs.forEach((tab) => {
      tab.setAttribute("aria-pressed", String(tab.dataset.templateTab === (printSheet.dataset.template || "single")));
    });
    applyAllFieldStyles();
    fields.forEach((field) => {
      clampFieldValue(field);
      rememberValue(field);
    });
    updateTextControls();
  }

  function placeCaretAtEnd(element) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function handleInput(event) {
    const field = event.currentTarget;
    if (clampFieldValue(field)) {
      return;
    }
    const key = getFieldKey(field);
    if (!editedFields.has(key)) {
      editedFields.add(key);
      track("field_edit", { field: key, edited_fields_count: editedFields.size });
    }
  }

  function updateActiveFieldStyle(updater) {
    if (!activeField) {
      return;
    }

    const key = getFieldKey(activeField);
    const nextStyle = { ...getFieldStyle(activeField) };
    updater(nextStyle);
    fieldStyles[key] = nextStyle;
    applyStyleToField(activeField, nextStyle);
    clampFieldValue(activeField);
    updateTextControls();
  }

  function activeFieldKey() {
    return activeField ? getFieldKey(activeField) : "";
  }

  fields.forEach((field) => {
    rememberValue(field);
    field.addEventListener("beforeinput", (event) => {
      if (event.inputType === "insertParagraph") {
        event.preventDefault();
        return;
      }
      rememberValue(field);
    });
    field.addEventListener("input", handleInput);
    field.addEventListener("focus", () => setActiveField(field));
    field.addEventListener("click", () => setActiveField(field));
  });

  fontFamilySelect.addEventListener("change", () => {
    updateActiveFieldStyle((style) => {
      style.fontFamily = fontFamilySelect.value;
    });
    track("style_change", { style_type: "font_family", value: fontFamilySelect.value, field: activeFieldKey() });
  });

  boldToggle.addEventListener("change", () => {
    updateActiveFieldStyle((style) => {
      style.fontWeight = boldToggle.checked ? "700" : "500";
    });
    track("style_change", { style_type: "bold", value: boldToggle.checked ? "on" : "off", field: activeFieldKey() });
  });

  fontSizeInput.addEventListener("input", () => {
    updateActiveFieldStyle((style) => {
      style.fontSize = fontSizeInput.value;
    });
  });

  fontSizeInput.addEventListener("change", () => {
    track("style_change", { style_type: "font_size", value: fontSizeInput.value, field: activeFieldKey() });
  });

  letterSpacingInput.addEventListener("input", () => {
    updateActiveFieldStyle((style) => {
      style.letterSpacing = letterSpacingInput.value;
    });
  });

  letterSpacingInput.addEventListener("change", () => {
    track("style_change", { style_type: "letter_spacing", value: letterSpacingInput.value, field: activeFieldKey() });
  });

  templateTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const template = tab.dataset.templateTab;
      printSheet.dataset.template = template;
      templateTabs.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === tab));
      });
      setActiveField(null);
      track("template_switch", { template });
    });
  });

  printButton.addEventListener("click", () => {
    track("print", {
      template: printSheet.dataset.template || "single",
      edited_fields_count: editedFields.size,
    });
    window.print();
  });

  document.addEventListener("click", (event) => {
    const clickedField = event.target.closest("[data-field]");
    const clickedToolbar = event.target.closest("#fieldToolbar");

    if (!clickedField && !clickedToolbar) {
      setActiveField(null);
    }
  });

  window.addEventListener("resize", positionFieldToolbar);
  window.addEventListener("scroll", positionFieldToolbar, true);

  // ===== 날짜 선택(달력) → 칸에 형식화된 날짜 입력 (직접 타이핑도 그대로 가능) =====
  function formatPickedDate(value, format) {
    if (!value) return "";
    const [y, m, d] = value.split("-");
    if (format === "korean") return `${Number(y)}년 ${Number(m)}월 ${Number(d)}일`;
    return `${y}.${m}.${d}`; // dot 형식 (ISO 부분이 이미 0 채움)
  }

  function setFieldText(field, text) {
    field.textContent = text;
    clampFieldValue(field);
    const key = getFieldKey(field);
    if (!editedFields.has(key)) {
      editedFields.add(key);
      track("field_edit", { field: key, edited_fields_count: editedFields.size });
    }
  }

  const dateHiddenInputs = [...document.querySelectorAll(".date-input-hidden")];
  const fieldByKey = (key) => fields.find((f) => getFieldKey(f) === key);
  const findDateInput = (target, range) =>
    dateHiddenInputs.find((i) => i.dataset.target === target && (i.dataset.range || "") === (range || ""));

  document.querySelectorAll(".date-pick").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = findDateInput(btn.dataset.target, btn.dataset.range);
      if (!input) return;
      try {
        input.showPicker();
      } catch {
        input.focus();
        input.click();
      }
    });
  });

  dateHiddenInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const field = fieldByKey(input.dataset.target);
      if (!field) return;

      if (input.dataset.range) {
        // 재직기간: 시작 ~ 종료 (종료 미선택 시 '현재')
        const startVal = findDateInput(input.dataset.target, "start")?.value;
        const endVal = findDateInput(input.dataset.target, "end")?.value;
        if (!startVal && !endVal) {
          setFieldText(field, "");
          return;
        }
        const startTxt = formatPickedDate(startVal, "dot");
        const endTxt = endVal ? formatPickedDate(endVal, "dot") : "현재";
        setFieldText(field, startTxt ? `${startTxt} ~ ${endTxt}` : `~ ${endTxt}`);
      } else {
        setFieldText(field, formatPickedDate(input.value, input.dataset.format));
      }
    });
  });

  // ===== 날짜 칸 직접 입력 시 자동 형식화 (칸을 벗어날 때) =====
  // "2026.6.29", "2026-6-29", "2026 6 29", "20260629" 등 어떻게 입력하든
  // 그 칸의 형식(년 월 일 / 점)에 맞춰 정리합니다.
  function dateMetaForField(key) {
    const inputs = dateHiddenInputs.filter((i) => i.dataset.target === key);
    if (!inputs.length) return null;
    const isRange = inputs.some((i) => i.dataset.range);
    return { isRange, format: isRange ? "dot" : inputs[0].dataset.format || "dot" };
  }

  function formatDatePieces(y, m, d, format) {
    if (!y) return "";
    if (format === "korean") {
      let s = `${Number(y)}년`;
      if (m) s += ` ${Number(m)}월`;
      if (d) s += ` ${Number(d)}일`;
      return s;
    }
    let s = y.padStart(4, "0");
    if (m) s += `.${m.padStart(2, "0")}`;
    if (d) s += `.${d.padStart(2, "0")}`;
    return s;
  }

  function normalizeOneDate(text, format) {
    const t = text.trim();
    if (!/\d/.test(t)) return t; // 숫자가 없으면(예: '현재') 그대로 둡니다.
    const groups = t.match(/\d+/g) || [];
    let y = "";
    let m = "";
    let d = "";
    if (groups.length === 1 && groups[0].length >= 5) {
      const g = groups[0]; // 구분자 없이 붙여 쓴 경우
      y = g.slice(0, 4);
      m = g.slice(4, 6);
      d = g.slice(6, 8);
    } else {
      y = (groups[0] || "").slice(0, 4);
      m = (groups[1] || "").slice(0, 2);
      d = (groups[2] || "").slice(0, 2);
    }
    return formatDatePieces(y, m, d, format);
  }

  function normalizeDateField(field) {
    const meta = dateMetaForField(getFieldKey(field));
    if (!meta) return;
    const text = field.textContent;
    let out;
    if (meta.isRange) {
      const idx = text.indexOf("~");
      const leftRaw = idx >= 0 ? text.slice(0, idx) : text;
      const rightRaw = idx >= 0 ? text.slice(idx + 1) : "";
      const left = normalizeOneDate(leftRaw, "dot");
      const right = /\d/.test(rightRaw) ? normalizeOneDate(rightRaw, "dot") : rightRaw.trim();
      out = right ? `${left} ~ ${right}` : left;
    } else {
      out = normalizeOneDate(text, meta.format);
    }
    if (out && out !== text) {
      setFieldText(field, out);
    }
  }

  fields.forEach((field) => {
    if (dateMetaForField(getFieldKey(field))) {
      field.addEventListener("blur", () => normalizeDateField(field));
    }
  });

  // ===== 직인(인감) 이미지 첨부 — 브라우저 안에서만 처리, 인쇄 시 함께 출력 =====
  document.querySelectorAll("[data-seal]").forEach((seal) => {
    const fileInput = seal.querySelector(".seal-file");
    const img = seal.querySelector(".seal-img");
    const removeBtn = seal.querySelector(".seal-remove");
    if (!fileInput || !img) return;

    seal.addEventListener("click", (event) => {
      if (event.target.closest(".seal-remove")) return;
      fileInput.click();
    });

    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
        seal.classList.add("has-seal");
        track("seal_attach", {});
      };
      reader.readAsDataURL(file);
    });

    if (removeBtn) {
      removeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        img.removeAttribute("src");
        fileInput.value = "";
        seal.classList.remove("has-seal");
      });
    }
  });

  applyInitialState();
}
