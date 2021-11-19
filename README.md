# Web BPM

Compute beats per minute and register listeners on kick from an audio input

## API

### getUserInput

```ts
const getUserInput: (fftSize: number) => Promise<AnalyserNode>
```

Captures the browser's microphone audio stream

You might see the browser asking the user for audio recording permission on the first function call

`fftSize` is passed to [`AnalyserNode.fftSize`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/fftSize) and thus should be a power of two between 2^5 and 2^15 

```ts
import { getUserInput } from 'web-bpm';

const analyser = await getUserInput(512);
```

### createKickDetector

```ts
const createKickDetector: (analyser: AnalyserNode) => {
  threshold: number;
  up: number;
  smooth: number;
  onKick: () => void;
  listen: () => void;
  stop: () => void;
}
```

Triggers a listener on kick

This doesn't analyses BPM, but rather measures the average rise of volume over all frequencies, smoothes it out (`smooth = 0` for no smoothing, `smooth = 1` for constant output), stores in it `up`, and if it's greater than `threshold`, calls back `onKick`.

`listen()` starts listening, `stop()` stops listening.

```ts
import { getUserInput, createKickDetector } from 'web-bpm';

const analyser = await getUserInput(512);
const kickDetector = createKickDetector(analyser);
kickDetector.threshold = 0.01;
kickDetector.smooth = 0.8;
kickDetector.onKick = () => console.log('kick');
kickDetector.listen();
setTimeout(() => kickDetector.stop(), 10_000);
```
