declare global {
    interface Window {
        HYPUR: {
            LOADING: boolean;
        };
    }
}
declare function start(): void;
declare function end(): void;
export declare const loading: {
    start: typeof start;
    end: typeof end;
};
export {};
