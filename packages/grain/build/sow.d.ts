import type { Method } from "./types";
export declare class Sow {
    static within<T extends HTMLElement = HTMLElement>(element: HTMLElement, name: string): T;
    static last<T extends HTMLElement = HTMLElement>(name: string): T;
    static first<T extends HTMLElement = HTMLElement>(name: string): T;
    static all<T extends HTMLElement = HTMLElement>(name: string): T[];
    static append<T extends HTMLElement, K extends HTMLElement>(element: T, otherElement: K): void;
    static prepend<T extends HTMLElement, K extends HTMLElement>(element: T, otherElement: K): void;
    static clone<T extends HTMLElement = HTMLElement>(element: HTMLElement): T;
    static find<T extends HTMLElement = HTMLElement>(name: string): T;
    static snapshot(name: string): void;
    static restore<T extends HTMLElement = HTMLElement>(name: string): T;
    static spread(element: HTMLElement, content: Record<string, any>): void;
    static remove(element: HTMLElement): void;
    private static fetcher;
    static delete(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static put(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static post(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static get(url: string, data: Record<string, any>, logic?: (data: Response) => void | Promise<void>): Promise<void>;
    static hypermedia(url: string, method: Method, data: Record<string, any>, logic?: (text: string) => void | Promise<void>): Promise<void>;
}
