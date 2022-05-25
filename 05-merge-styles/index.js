const fs = require('fs');
const path = require('path');

const stylesDir = (path.join(__dirname, 'styles'))
const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(stylesDir, (err, data) => {
    data.forEach((files) => {
      if (path.extname(files) === '.css') {
        const stylesCss = fs.createReadStream(path.join(__dirname, 'styles', files),'utf8' );  
        stylesCss.pipe(bundle);
      } else if (err) {
        console.log('Error ', err)
      }  
    });
    console.log('Style files are copy to bundle.css')
  });
  