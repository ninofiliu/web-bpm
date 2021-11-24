# WebBPM

Compute beats per minute and register listeners on kick from an audio input

## API

WebBPM computes BPM and detects kicks based on [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) objects. WebBPM provides several functions to obtain such an object from audio sources: `getUserInput`, `getAudioInput`, and `getUrlInput`. You're not required to use them, but they come in handy.

In all of these functions, `fftSize` is passed to [`AnalyserNode.fftSize`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) and thus should be a power of two between 2^5 and 2^15.

Once the analyser is obtained, it can get passed to sound processing entities, like `createKickDetector`.

### getUserInput

Gets an analyser from the browser's microphone audio stream

You might see the browser asking the user for audio recording permission on the first function call

```ts
import { getUserInput } from 'web-bpm';
(async () => {
  const analyser = await getUserInput(512);
})();
```

### getAudioInput

Gets an analyser from an `<audio>` element

```html
<audio src="/some-file.mp3">
```
```ts
import { getAudioInput } from 'web-bpm';
const audio = document.querySelector('audio');
const analyser = getAudioInput(audio, 512);
```

### getUrlInput

Gets an analyser from an URL on the web

```ts
import { getUrlInput } from 'web-bpm';
(async () => {
  const analyser = await getUrlInput('/some-file.mp3', 512);
})();
```

### createKickDetector

Triggers a listener on kick

This doesn't analyses BPM, but rather measures the average rise of volume over all frequencies, [exponentially smoothes it out](https://en.wikipedia.org/wiki/Exponential_smoothing) (`smooth = 0` for no smoothing, `smooth = 1` for constant output), stores in it `up`, and if it's greater than `threshold`, calls back `onKick`.

`listen()` starts listening, `stop()` stops listening.

```ts
import { getUserInput, createKickDetector } from 'web-bpm';

(async () => {
  const analyser = await getUserInput(512);
  const kickDetector = createKickDetector(analyser);
  kickDetector.threshold = 0.01;
  kickDetector.smooth = 0.8;
  kickDetector.onKick = () => console.log('kick');
  kickDetector.listen();
  setTimeout(() => kickDetector.stop(), 10000);
})();
```
