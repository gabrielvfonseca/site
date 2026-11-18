export interface BioImage {
	readonly src: string;
	readonly alt: string;
	readonly caption?: string;
	readonly width?: number;
	readonly height?: number;
	readonly blurDataURL?: string;
}
