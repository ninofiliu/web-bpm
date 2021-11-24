export default (analyser: AnalyserNode) => {
  let kicking = false;
  let listening = false;

  const self = {
    threshold: Infinity,
    up: 0,
    smooth: 0.8,
    onKick: () => {},
  };

  const listen = () => {
    if (listening)return;
    listening = true;
    const data = new Uint8Array(analyser.frequencyBinCount);
    const loop = () => {
      if (!listening)return;
      const last = new Uint8Array(data);
      analyser.getByteFrequencyData(data);
      let newUp = 0;
      for (let f = 0; f < data.length; f++) newUp += Math.max(0, data[f] - last[f]) / data.length / 256;
      self.up = self.smooth * self.up + (1 - self.smooth) * newUp;
      if (self.up > self.threshold) {
        if (!kicking) {
          kicking = true;
          self.onKick();
        }
      } else {
        kicking = false;
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  const stop = () => {
    listening = false;
    self.up = 0;
  };

  return Object.assign(self, { listen, stop });
};
