(() => {
  document.documentElement.classList.add("js");
  const store = {
    get(k, d) { try { const v = localStorage.getItem("stillrolling:" + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("stillrolling:" + k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem("stillrolling:" + k); } catch {} },
  };

  // Niggle picker: highlight matching exercises and reveal their tweaks.
  const chips = [...document.querySelectorAll(".chip[data-niggle]")];
  let picked = new Set(store.get("niggles", []));
  const apply = () => {
    chips.forEach((c) => c.setAttribute("aria-pressed", picked.has(c.dataset.niggle) ? "true" : "false"));
    document.querySelectorAll("[data-for]").forEach((el) => {
      const ids = el.dataset.for.split(" ");
      el.classList.toggle("match", ids.some((i) => picked.has(i)));
    });
    document.documentElement.classList.toggle("has-picks", picked.size > 0);
    const labels = chips.filter((c) => picked.has(c.dataset.niggle)).map((c) => c.querySelector("strong").textContent);
    document.querySelectorAll("[data-joint]").forEach((th) => {
      const i = +th.dataset.joint;
      th.textContent = (labels[i] || "Joint " + (i + 1)) + " pain";
    });
    document.querySelectorAll(".swap[data-niggle]").forEach((el) => el.classList.toggle("match", picked.has(el.dataset.niggle)));
  };
  chips.forEach((c) =>
    c.addEventListener("click", () => {
      const id = c.dataset.niggle;
      picked.has(id) ? picked.delete(id) : picked.add(id);
      store.set("niggles", [...picked]);
      apply();
    })
  );
  apply();

  // Persist checkboxes and inputs (mat prep ticks and the weekly log).
  const fields = document.querySelectorAll("[data-key]");
  const data = store.get("fields", {});
  fields.forEach((f) => {
    const k = f.dataset.key;
    if (k in data) f.type === "checkbox" ? (f.checked = !!data[k]) : (f.value = data[k]);
    f.addEventListener(f.type === "checkbox" ? "change" : "input", () => {
      data[k] = f.type === "checkbox" ? f.checked : f.value;
      store.set("fields", data);
    });
  });
  document.querySelectorAll("[data-reset]").forEach((b) =>
    b.addEventListener("click", () => {
      const prefix = b.dataset.reset + "-";
      fields.forEach((f) => {
        if (!f.dataset.key.startsWith(prefix)) return;
        f.type === "checkbox" ? (f.checked = false) : (f.value = "");
        delete data[f.dataset.key];
      });
      store.set("fields", data);
    })
  );
})();
