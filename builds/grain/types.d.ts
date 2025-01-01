export type Listeners = {
    eventType: string;
    logic: (event: Event) => void;
}[];
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
