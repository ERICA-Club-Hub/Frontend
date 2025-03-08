export const calculateFormDataSize = (formData: FormData): number => {
    let totalSize = 0;

    for (const pair of formData.entries()) {
        const value = pair[1];
        if (value instanceof File) {
            totalSize += value.size;
        } else if (typeof value === 'string') {
            totalSize += new Blob([value]).size;
        }
    }
    return totalSize;
};
