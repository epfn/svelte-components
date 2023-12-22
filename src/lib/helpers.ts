export function generateID(name: string) {
	return `${name}-${Math.round(Math.random() * 100_000).toString()}`;
}
