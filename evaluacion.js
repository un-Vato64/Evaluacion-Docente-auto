(async () => {
  const MIN = 1, MAX = 5;          // rango de calificación (ej. 4 y 5 si prefieres notas altas)
  const ESPERA = 1500;             // ms para que Livewire cargue el siguiente paso

  const aleatorio = () => Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  const dormir = ms => new Promise(r => setTimeout(r, ms));

  const llenarPaso = () => {
    document.querySelectorAll('select[name^="ratings."]').forEach(sel => {
      sel.value = String(aleatorio());
      sel.dispatchEvent(new Event('input',  { bubbles: true }));
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    });
  };

  const botonSiguiente = () =>
    [...document.querySelectorAll('button[type="submit"]')]
      .find(b => b.textContent.trim().toLowerCase().includes('siguiente'));

  while (true) {
    llenarPaso();
    await dormir(500);                       // deja que wire:model sincronice
    const btn = botonSiguiente();
    if (!btn) break;                         // último paso: ya no hay "Siguiente"
    btn.click();
    await dormir(ESPERA);
  }
  console.log('Listo. Revisa el último paso (comentarios) y envía manualmente.');
})();