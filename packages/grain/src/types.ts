export type Action<TEvent extends Event, TState extends Record<string, any>> = (
  event: TEvent,
  state: TState
) => void;

export type Listeners<
  TState extends Record<string, any> | Record<string, any>
> = {
  eventType: string;
  action: Action<Event, TState>;
}[];
