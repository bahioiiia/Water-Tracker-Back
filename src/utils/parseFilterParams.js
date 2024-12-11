const parseValue = (value) => {
    if(typeof value !== "string") return;
    const isFavourite = (value) => ['true', 'false'].includes(value);
    if (isFavourite(value)) return value;
    return;
};

export const parseFilterParams = (query) => {
    const { isFavourite } = query;
    const parsedIsFavourite = parseValue(isFavourite);
    return {
        isFavourite: parsedIsFavourite,
    };
};