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
