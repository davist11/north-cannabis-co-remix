type Categories = {
    [key: string]: string
}

export const categories: Categories = {
    accessories: "ACCESSORIES",
    apparel: "APPAREL",
    cbd: "CBD",
    clones: "CLONES",
    concentrates: "CONCENTRATES",
    edibles: "EDIBLES",
    flower: "FLOWER",
    orals: "ORALS",
    "pre-rolls": "PRE_ROLLS",
    seeds: "SEEDS",
    tinctures: "TINCTURES",
    topicals: "TOPICALS",
    vaporizers: "VAPORIZERS",
};

// TODO: could capitalize here
export const formatCategoryForDisplay = (category: string) =>
    category ? category.replace(/[_-]/g, " ").toLowerCase() : '';

export const getCategorySlug = (value: string) =>  Object.keys(categories).find(key => categories[key] === value) ?? '';
