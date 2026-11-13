# Autollenado de Evaluación Docente (SIM)

Script de JavaScript para ejecutar desde la consola del navegador que **rellena automáticamente los menús desplegables** de la Evaluación Docente del SIM (Instituto Tecnológico de Morelia, TecNM). Selecciona un valor aleatorio dentro de un rango configurable (por defecto de 1 a 5) en cada menú y avanza de paso en paso hasta llegar al final.

> El script **no envía** la evaluación: se detiene en el último paso para que revises y confirmes tú.

## ¿Cómo funciona?

La página está construida con **Laravel Livewire** y usa elementos `<select>` nativos (`wire:model`). El script:

1. Busca todos los `<select>` cuyo nombre empieza con `ratings.`.
2. Asigna un valor aleatorio entre `MIN` y `MAX`.
3. Dispara los eventos `input` y `change` para que Livewire registre la selección.
4. Pulsa el botón **Siguiente** y repite hasta que ya no exista.

## Instructivo de uso

### Antes de empezar

- Usa **Google Chrome**, Edge o Firefox en una computadora (no funciona desde el celular).
- Ten una conexión estable a internet.
- Inicia sesión en el SIM y entra a **Evaluación Docente**, en el **Paso 1 de 11**.

### Paso 1: Abrir la consola

1. Con la página de la evaluación abierta, presiona **F12** (o clic derecho → **Inspeccionar**).
2. Entra a la pestaña **Console** (Consola).

### Paso 2: Aceptar la advertencia de pegado (si aparece)

Chrome y Firefox bloquean el pegado la primera vez como medida de seguridad:

1. Escribe a mano: `allow pasting`
2. Presiona **Enter**.

Si no aparece ninguna advertencia, omite este paso.

### Paso 3: Pegar y ejecutar el script

1. Copia **todo** el script, desde `(async () => {` hasta `})();`.
2. Pégalo en la consola (`Ctrl + V`).
3. Presiona **Enter**.

### Paso 4: Dejarlo trabajar

- Verás cómo se rellenan los menús y la página avanza sola de paso en paso.
- **No cierres ni recargues la pestaña** y no hagas clic en la página mientras corre. Al recargar se pierde todo el progreso.
- Cada paso tarda unos 2 segundos; los 11 pasos toman alrededor de 25 a 30 segundos.

### Paso 5: Revisar y enviar

1. El script termina cuando aparece en consola el mensaje: *"Listo. Revisa el último paso..."*.
2. Revisa el último paso (comentarios/opinión) y escríbelos tú si lo deseas.
3. Presiona el botón final de la página para **enviar** la evaluación. El script no lo hace por ti.

## Configuración

Al inicio del script puedes modificar:

| Variable | Qué hace | Ejemplo |
|---|---|---|
| `MIN`, `MAX` | Rango de calificaciones | `MIN = 3, MAX = 5` para notas de 3 a 5 |
| `ESPERA` | Tiempo entre pasos (ms) | `3000` si tu internet es lento |

### Rellenar solo el paso actual

Si solo quieres llenar la pantalla en la que estás, usa únicamente esta parte:

```javascript
const MIN = 1, MAX = 5;
document.querySelectorAll('select[name^="ratings."]').forEach(sel => {
  sel.value = String(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN);
  sel.dispatchEvent(new Event('input',  { bubbles: true }));
  sel.dispatchEvent(new Event('change', { bubbles: true }));
});
```

## Solución de problemas

| Problema | Solución |
|---|---|
| No pasa nada al pegar | Escribe `allow pasting` y vuelve a intentar |
| Se queda en un paso | Sube `ESPERA` a 3000 o más |
| Aparece un error rojo | Revisa el mensaje; suele deberse a que el HTML de la página cambió |
| Se recargó la página | Debes empezar de nuevo desde el Paso 1 |
| Aparece la alerta de "progreso no se guardará" al entrar | Es normal; acéptala y continúa |

## Recomendaciones

- Haz una **prueba en el Paso 1** primero con la versión de "solo el paso actual".
- Si quieres calificar a algún docente con una nota específica, hazlo a mano y evita ejecutar el script sobre esos menús.

## Aviso

Este proyecto es solo con fines educativos y de automatización personal. Las calificaciones aleatorias **no reflejan tu opinión real**, y la institución utiliza estas evaluaciones para valorar a los docentes. Úsalo bajo tu propia responsabilidad y respeta los reglamentos y términos de uso de tu institución. No está afiliado al TecNM ni al Instituto Tecnológico de Morelia.

Si el sitio cambia su estructura (nombres de campos o botones), el script podría dejar de funcionar y habría que ajustar los selectores.
