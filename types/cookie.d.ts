// types/cookie.d.ts
declare module "cookie" {
  export function parse(str: string, options?: any): { [key: string]: string };
  export function serialize(name: string, val: string, options?: any): string;
}
