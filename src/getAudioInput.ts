export default (audio: HTMLAudioElement, fftSize: number = 2048) => {
  const ac = new AudioContext();
  const analyser = ac.createAnalyser();
  analyser.fftSize = fftSize;
  const source = ac.createMediaElementSource(audio);
  source.connect(analyser);
  source.connect(ac.destination);
  return analyser;
};
