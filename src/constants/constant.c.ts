export const defaultWallpaperUrl: string = "https://img.alicdn.com/bao/uploaded/i3/695099440/O1CN01N5zsiy2JbZi03VVDe_!!695099440.png";


export const defaultPublishUserID: number = 1;
export const defaultPublishUserName: string = "轻叶";

export const generateRandomId = (min: number = 100000, max: number = 999999): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

