import { Grain } from "./grain";
import type { Method } from "./types";
export declare class StatefulGrain<TState extends Record<string, any> = Record<string, any>> extends Grain {
    state: TState;
    constructor();
    delete(url: string, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    put(url: string, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    post(url: string, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    get(url: string, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    hypermedia(url: string, method: Method, logic?: (text: string) => void | Promise<void>): Promise<void>;
}
