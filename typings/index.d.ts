declare module '@fortawesome/react-fontawesome';
declare module 'mobx-wiretap/mst';
declare module 'evergreen-ui';

declare type ElementEventTemplate<E> = {
  target: E;
} & Event;

declare type InputEvent = ElementEventTemplate<HTMLInputElement>;
