const fs = require('fs');
const path = require('path');

const levelDir = '../../src/honu/static/levels';

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  const dir = fs.opendirSync(levelDir);
  let file_names = [];
  let dirent;
  while ((dirent = dir.readSync()) !== null) {
    if (dirent.isFile() && dirent.name.endsWith('.json')) {
      console.log(dirent.name)
      file_names.push(dirent.name);
    }
  }
  dir.closeSync();
  
  for (let file_name of file_names) {
    console.log("SFFF"+fs.readFileSync(path.join(levelDir,file_name)));
    const jsonDoc = JSON.parse(fs.readFileSync(path.join(levelDir,file_name), "utf-8"));
    
    console.log("step2 "+require.resolve('./src/templates/LevelDescriptionPage.js'));
    createPage({
      // path: element.path,
      path: `/levels/${jsonDoc.id}`,
      // component: require.resolve(path.join('.','src','templates','LevelDescriptionPage.tsx')),
      // component: require.resolve('./src/templates/LevelDescriptionPage.tsx'),
      component: require.resolve('./src/templates/LevelDescriptionPage.js'),

      context: {
        levelContent: jsonDoc,
        // links: element.links,
        links: [],
      },
    });
  }
}