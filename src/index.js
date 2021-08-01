window.canvas = document.querySelector('#canvas');
window.c = canvas.getContext('2d');

import { clear } from './utils';
import Terrain from './terrain';

const terrain = new Terrain();

const update = () => {
  clear();

  terrain.render();

  requestAnimationFrame(update);
};

update();
