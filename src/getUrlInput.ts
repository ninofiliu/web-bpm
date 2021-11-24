import getAudioInput from './getAudioInput';

export default async (src: string, fftSize: number = 2048) => {
  const audio = document.createElement('audio');
  audio.src = src;
  await new Promise<any>((r) => { audio.oncanplay = r; });
  audio.play();
  return getAudioInput(audio, fftSize);
};
