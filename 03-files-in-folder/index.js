const { stat } = require('fs/promises');
const { readdir } = require('fs/promises');
const path = require('path');

async function fileInfo(){
    const pathToDir = path.join(__dirname, 'secret-folder');
    try{
        const files = await readdir(pathToDir);
        for (let file of files){
            const filePath = path.join(pathToDir, file);
            const currentFile = await stat(filePath);
            if (currentFile.isFile()){
                const fileName = file.slice(0, file.indexOf('.'));
                const fileExt = path.extname(filePath).slice(1);
                const fileSize = currentFile.size;
                console.log(fileName + ' - ' + fileExt + ' - ' + fileSize + ' B');
            }
        }
    } catch (err){
        console.log('Error', err.message);
        return;
    }
}
fileInfo();