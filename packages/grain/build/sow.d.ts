import type { Method } from "./types";
export declare class Sow {
    static within(element: HTMLElement, name: string): HTMLElement;
    static last(name: string): HTMLElement;
    static first(name: string): HTMLElement;
    static all(name: string): HTMLElement[];
    static append(element: HTMLElement, otherElement: HTMLElement): void;
    static prepend(element: HTMLElement, otherElement: HTMLElement): void;
    static clone(element: HTMLElement): HTMLElement;
    static spread(element: HTMLElement, content: Record<string, any>): void;
    static remove(element: HTMLElement): void;
    private static fetcher;
    static delete(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static put(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static post(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static get(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static hypermedia(url: string, method: Method, data: Record<string, any>, logic?: (text: string) => void | Promise<void>): Promise<void>;
}
