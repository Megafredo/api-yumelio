//& Convert logo Fetch all categories
function baseConvertSvg(categories: object) {
  const convert = [];
  for (let [k, value] of Object.entries(categories)) {
    const id = value.id;
    const name = value.name;
    const logo = Buffer.from(value.logo, 'base64').toString('utf-8');
    convert.push({ id, name, logo });
  }
  return convert;
}

interface Categories {
  categories: object;
}

//& Convert svg for Fetch all categories by article || project
function baseConvertSvgByElement(projectData: object[] | any) {
  let projects = [];
  let { categories }: Categories = projectData[0];

  const convert = [];
  for (let [k, value ] of Object.entries(categories)) {
    const id = value.id;
    const name = value.name;
    const color = value.color;
    const logo = Buffer.from(value.logo, 'base64').toString('utf-8');
    convert.push({ id, name, logo, color });
  }

  projectData[0] = { ...projectData[0], categories: convert };
  projects.push(projectData[0]);

  return projects;
}

export { baseConvertSvg, baseConvertSvgByElement };
