import * as File from 'fs';

export default class FileOperation {

    static async readFile(filePath){
        return await new Promise((resolve, reject) => {
            File.readFile(filePath, 'utf8', (error, content) => {
                if(error != null){
                    return reject(error);
                }
                if (content.length === 0)
                    return resolve(null);
                return resolve(JSON.parse(content));
            });
        });
    }

    static async writeFile(filePath, fileName, content){
        let contentAsJSON = JSON.stringify(content);
        File.writeFile(filePath, contentAsJSON, 'utf8', () => console.log(`Pomyślnie zapisano plik ${fileName}!`));
    }
}
