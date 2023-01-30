// ./lib/loader.ts

interface Props {
    src: any;
    width: any;
    quality: any;
}
  
export default function loader({ src, width, quality }: Props) {
    return `/${src}?w=${width}&q=${quality || 75}`;
}