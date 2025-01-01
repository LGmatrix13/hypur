import { ReactiveGrain, Grain } from "./grain";
declare function reactiveGrain(target: Grain, element: ReactiveGrain, content: Record<string, string>): HTMLElement;
declare function grain(target: Grain, element: Grain, content: Record<string, any>): HTMLElement;
export declare const append: {
    reactiveGrain: typeof reactiveGrain;
    grain: typeof grain;
};
export {};
