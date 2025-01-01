import { Grain, ReactiveGrain } from "./grain";
declare function reactiveGrain(target: Grain, element: ReactiveGrain, content: Record<string, string>): HTMLElement;
declare function grain(target: Grain, element: Grain, content: Record<string, any>): void;
export declare const prepend: {
    reactiveGrain: typeof reactiveGrain;
    grain: typeof grain;
};
export {};
