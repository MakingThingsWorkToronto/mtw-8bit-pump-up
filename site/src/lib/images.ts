import images from '../data/source-images.json';
export function findSourceImage(kind:string,id:string){const image=(images as Record<string,any>)[kind+'/'+id];if(!image)throw Error('Missing registered source image '+kind+'/'+id);return image;}
