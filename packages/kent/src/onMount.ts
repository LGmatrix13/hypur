export function onMount(logic: () => void) {
  document.addEventListener("DOMContentLoaded", logic);
}
