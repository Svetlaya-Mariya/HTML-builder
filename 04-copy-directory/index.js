const path = require('path');
const { mkdir, copyFile, readdir, rm} = require('fs/promises');

async function copyDir(dir, dirCopy){
    const dirPath = path.join(__dirname, dir);
    const dirCopyPath = path.join(__dirname, dirCopy);
    let dirFilesList = await readdir(dirPath, {withFileTypes: true}, (error, data)=> {
            if (error) throw error;
            console.log(data);
        });
        try {
            await rm(dirCopyPath, {recursive: true});
        }
        catch (err){
            console.log('can not find directory')
        }
     
        await mkdir(dirCopyPath, {recursive: true}, error=> {
            if (error) throw error;
        });
        for (const file of dirFilesList){
            if(file.isDirectory()){
                await copyDir(path.join(dir, file.name), path.join(dirCopy, file.name))
            }
            else {
                const dirFilePath = path.join(dirPath, file.name);
                const dirCopyFilePath = path.join(dirCopyPath, file.name);
                console.log('file copying ' + file.name);
                await copyFile(dirFilePath, dirCopyFilePath);
            }
        }
}

copyDir('files', 'files-copy');
