export const sortByOrderAndDate = (a: any , b: any ) => {
    const orderA = a.metadata.display_order ?? Infinity;
    const orderB = b.metadata.display_order ?? Infinity;

    // Primary sort: by order number
    if (orderA !== orderB) {
        return orderA - orderB;
    }

    // Secondary sort: by date (descending)
    const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
    const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;

    // Handle potential invalid dates
    if (isNaN(dateA) && isNaN(dateB)) return 0;
    if (isNaN(dateA)) return 1;
    if (isNaN(dateB)) return -1;
    return dateB - dateA; // Descending date order
};

