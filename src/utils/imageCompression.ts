import imageCompression from 'browser-image-compression';

export const compressImage = async (
    file: File,
    quantity: number = 80,
    width: number,
) => {
    try {
        const compressedFile = await imageCompression(file, {
            fileType: 'image/webp',
            initialQuality: quantity * 0.01,
            maxWidthOrHeight: width,
            alwaysKeepResolution: true,
        });
        return compressedFile;
    } catch {
        return false;
    }
};
