declare global {
  interface Window {
    HYPUR: {
      LOADING: boolean;
    };
  }
}
window.HYPUR = {
  LOADING: false,
};

function start() {
  window.HYPUR.LOADING = true;
}

function end() {
  window.HYPUR.LOADING = false;
}

export const loading = {
  start,
  end,
};
