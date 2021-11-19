export declare const getUserInput: (fftSize: number) => Promise<AnalyserNode>;
export declare const createKickDetector: (analyser: AnalyserNode) => {
    threshold: number;
    up: number;
    smooth: number;
    onKick: () => void;
} & {
    listen: () => void;
    stop: () => void;
};
