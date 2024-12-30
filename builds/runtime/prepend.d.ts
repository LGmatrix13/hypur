import { Grain } from "./grain";
declare function grain<TState extends Record<string, any> = Record<string, any>, EState extends Record<string, any> = Record<string, any>>(target: Grain<TState>, element: Grain<EState>, content: EState): void;
declare function hypermedia<TState extends Record<string, any> = Record<string, any>, EState extends Record<string, any> = Record<string, any>>(target: Grain<TState>, element: Grain<EState>, content: string): void;
export declare const prepend: {
    grain: typeof grain;
    hypermedia: typeof hypermedia;
};
export {};
