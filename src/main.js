import Worker from './render.worker';

const worker = new Worker();

function render() {
  const canvas = document.querySelector('#canvas');
  const offscreenCanvas = canvas.transferControlToOffscreen();

  let samplesPerPixel = document.querySelector('#spp').value;
  let depth = document.querySelector('#depth').value;

  samplesPerPixel = samplesPerPixel ? samplesPerPixel : 4;
  depth = depth ? depth : 50;

  worker.postMessage({
      msg: 'render',
      canvas: offscreenCanvas,
      payload: {
        samplesPerPixel,
        depth
      }
    },
    [offscreenCanvas]
  );

  worker.addEventListener('message', (ev) => {
    console.log('window', ev);
  });
}

window.render = render;