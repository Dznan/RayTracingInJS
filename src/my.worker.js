addEventListener('message', (ev) => {
  postMessage({received: true});
});
console.log('loaded');