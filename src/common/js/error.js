export function bindOnError() {
  window.addEventListener('error', function(e) {
    console.log('捕获', e)
  }, true)
}