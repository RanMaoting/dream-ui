export { default as withInstall } from './withinstall';
export function kebabCase(s: string) {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}
