function baseConvertSvg(categories) {
    const convert = [];
    for (let [k, value] of Object.entries(categories)) {
        const id = value.id;
        const name = value.name;
        const logo = Buffer.from(value.logo, 'base64').toString('utf-8');
        convert.push({ id, name, logo });
    }
    return convert;
}
function baseConvertSvgByElement(categoriesData) {
    let categories = [];
    let { category } = categoriesData[0];
    const convert = [];
    for (let [k, value] of Object.entries(category)) {
        const category_name = value.category_name;
        const logo = Buffer.from(value.logo, 'base64').toString('utf-8');
        convert.push({ category_name, logo });
    }
    categoriesData[0] = { ...categoriesData[0], category: convert };
    categories.push(categoriesData[0]);
    return categories;
}
export { baseConvertSvg, baseConvertSvgByElement };
//# sourceMappingURL=baseConvertSvg.js.map