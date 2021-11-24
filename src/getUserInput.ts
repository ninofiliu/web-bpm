export default async (fftSize: number = 2048) => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const ac = new AudioContext();
  const source = ac.createMediaStreamSource(stream);
  const analyser = ac.createAnalyser();
  analyser.fftSize = fftSize;
  source.connect(analyser);
  return analyser;
};
