const fs = require('fs');

const defaultOptions = {
    encoding: 'utf-8'
};
/**
 * @type
 * @param  {string} path
 * @param  {any} options
 */
function getAllJsonInFolder(path, options = defaultOptions) {
    let jsons = [];
    const allFiles = fs.readdirSync(path, { withFileTypes: true }).forEach((file) => {
        if (file.isDirectory()) {
            const folderPath = path + '\\' + file.name;
            const allJsons = getAllJsonInFolder(folderPath, options);

            jsons.push(...allJsons);
        } else {
            if (file.name.toLowerCase().endsWith('.json')) {
                try {

                    jsons.push({
                        json: JSON.parse(fs.readFileSync(path + '\\' + file.name)),
                        name: file.name,
                        path: path + '\\' + file.name
                    });
                }
                catch {
                    
                }
            }
        }
    });

    return jsons;
}

module.exports = { getAllJsonInFolder };
