import _ from 'lodash';

export default class Terrain {
  constructor() {
    this.heightMap = this._generateHeightMap();
  }

  render() {
    this._renderLayers({
      xSpacing: 50,
    });
  }

  _generateHeightMap(options) {
    // Defaults
    const defaults = {
      startY: 400,
      endY: 400,
      length: 30,
      peaks: 2,
      startAmp: 200,
      ampMultiplier: 0.4,
    };
    const genOptions = _.defaultsDeep(_.cloneDeep(options), defaults);

    // Peaks
    const peaks = [];
    const startAvg = (genOptions.startY + genOptions.endY) / 2;
    for (let i = 0; i < genOptions.peaks; i++) {
      const randomAmp = Math.random() * genOptions.startAmp * 2 - genOptions.startAmp;
      peaks.push(startAvg + randomAmp);
    }

    // Generation
    const heightMap = [genOptions.startY, ...peaks, genOptions.endY];
    let amp = genOptions.startAmp;

    while (heightMap.length < genOptions.length) {
      for (let i = 1; i < heightMap.length; i += 2) {
        const left = heightMap[i - 1];
        const right = heightMap[i];
        const avg = (left + right) / 2;
        const randomAmp = Math.random() * amp * 2 - amp;
        const height = Math.max(Math.round(avg + randomAmp), 0);
        heightMap.splice(i, 0, height);
      }

      amp *= genOptions.ampMultiplier;
    }

    return heightMap.slice(0, genOptions.length);
  }

  _renderLayers(options) {
    // Defaults
    const defaults = {
      xSpacing: 10,
      startX: 0,
      color: 'green',
    };
    const renderOptions = _.defaultsDeep(_.cloneDeep(options), defaults);

    // Setup
    c.save();
    c.fillStyle = renderOptions.color;
    c.translate(renderOptions.startX, canvas.height);
    c.beginPath();

    // Path
    const canvasHeightMap = this.heightMap.map((height) => -height);
    c.moveTo(0, canvasHeightMap[0]);
    for (let i = 1; i < this.heightMap.length; i++) {
      c.lineTo(i * renderOptions.xSpacing, canvasHeightMap[i]);
    }
    c.lineTo((this.heightMap.length - 1) * renderOptions.xSpacing, 0);
    c.lineTo(0, 0);

    // Render
    c.closePath();
    c.fill();
    c.restore();
  }
}
