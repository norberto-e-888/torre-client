export const capitalize = (s: string): string =>
	`${s.charAt(0).toLocaleUpperCase()}${s.slice(1).toLocaleLowerCase()}`;
