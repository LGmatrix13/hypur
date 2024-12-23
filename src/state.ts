export function state<T>(initialValue: T, singal?: (newValue: T) => void) {
  let value = initialValue;

  function set(newValue: T) {
    value = newValue;
    if (singal) {
      singal(newValue);
    }
  }

  function get() {
    return value;
  }

  return {
    get,
    set,
  };
}
