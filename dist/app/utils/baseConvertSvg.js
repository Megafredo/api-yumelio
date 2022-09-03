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
export { baseConvertSvg };
//# sourceMappingURL=baseConvertSvg.js.map