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

    field.textContent = field.textContent.replace(/\n/g, "");

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

  applyInitialState();
}
