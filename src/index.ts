export const getUserInput = async (fftSize: number) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const ac = new AudioContext();
  const source = ac.createMediaStreamSource(stream);
  const analyser = ac.createAnalyser();
  analyser.fftSize = fftSize;
  source.connect(analyser);
  return analyser;
};
