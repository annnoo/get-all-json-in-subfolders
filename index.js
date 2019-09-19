const fs = require('fs');

const defaultOptions = {
    encoding:'utf-8'
}
/**
 * @type 
 * @param  {string} path
 * @param  {any} options
 */
function getAllJsonInFolder (path, options = defaultOptions) {
    
    let jsons = [];
    const allFiles = fs
    .readdirSync(path, { withFileTypes: true }); 

allFiles.forEach((file) => {
    if(file.isDirectory()){
        const folderPath = path + '\\' + file.name;
        const allJsons = getAllJsonInFolder(folderPath,options);
       
        jsons.push(...allJsons);
        
    }
    else {
        if(file.name.toLowerCase().endsWith('.json')){
       
    
            jsons.push({
                json: JSON.parse(fs.readFileSync(path + '\\' + file.name)),
                name: file,
                path: filePath
            } 
           );

        }
    }
})
    
    const folders = allFiles
                .filter((f) => f.isDirectory())
                .map((f) => f.name);
    const files = allFiles
                .filter((f) => f.isFile())
                .map((f) => f.name);
    const jsonFiles = files.filter((f) => f.toLocaleLowerCase().endsWith(".json"))
    jsonFiles.forEach((file) => {
        const filePath = path + '\\' + file;
        try{
            const data = fs.readFileSync(filePath);
            const obj = {
                json: JSON.parse(data),
                name: file,
                path: filePath
            } 
           
    
            jsons.push(obj);
    
        }
        catch {

        }
    })
                
   
    folders.forEach((folder) => {
        const folderPath = path + '\\' + folder;
        const allJsons = getAllJsonInFolder(folderPath,options);
       
       jsons =  jsons.concat(allJsons);
        
    })
    

    return jsons;
}


module.exports = {getAllJsonInFolder}