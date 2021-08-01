export const clear = () => {
  c.save();
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.restore();
};
