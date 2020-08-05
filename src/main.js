import Worker from './render.worker';

const worker = new Worker();

let canvas, offscreenCanvas;

function init() {
  canvas = document.querySelector('#canvas');
  offscreenCanvas = canvas.transferControlToOffscreen();

  worker.postMessage({
      msg: 'init',
      canvas: offscreenCanvas,
    },
    [offscreenCanvas]
  );
}

function render() {
  let samplesPerPixel = document.querySelector('#spp').value;
  let depth = document.querySelector('#depth').value;

  samplesPerPixel = samplesPerPixel ? samplesPerPixel : 4;
  depth = depth ? depth : 50;

  worker.postMessage({
      msg: 'render',
      payload: {
        samplesPerPixel,
        depth
      }
    },
  );

  worker.addEventListener('message', (ev) => {
    console.log('window', ev.data.progress);
    if (ev.data.progress) {
      const progressDom = document.querySelector('#progress');
      progressDom.setAttribute('value', ev.data.progress.toString());
    }
  });
}

window.render = render;

window.onload = init;