declare module 'turndown' {
  /** Minimal ambient typing for turndown used by cn-editor. */
  export type Plugin = unknown;
  export class TurndownService {
    constructor(opts?: unknown);
    use(plugin: Plugin | Plugin[]): void;
    turndown(input: string | Element | DocumentFragment): string;
  }
  export default TurndownService;
}
