const path = require('node:path');
const fs = require('node:fs');
const fsPromises = require('node:fs/promises');
// Створити папку "baseFolder".
//
// В ній створити 5 папок
//
// в кожній з яких створити по 5 файлів з розширенням txt.
//
// Вивести в консоль шляхи до кожного файлу чи папки,
// також вивести поряд інформацію про те, чи є це файл чи папка.


const anton = async () => {

    //Базовий фал для копіювання
    const pathToFile = path.join(__dirname, 'file.txt');
    await fsPromises.writeFile(pathToFile, 'Text')

    //Базова папка і зразу виводжу чи це папка
    const baseFolderPath = path.join(__dirname, 'baseFolder');
    await fsPromises.mkdir(baseFolderPath, { recursive: true });
    console.log(`${baseFolderPath} - головна папка`);

    const statBaseFolder = await fsPromises.stat(baseFolderPath)
    console.log(`Чи це папка? - ${statBaseFolder.isDirectory()}`)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    //Перший цикл для додавання папок
    for(let i = 1; i < 6; i++) {
        const insideFolderPath = path.join(baseFolderPath, `folder${i}`)
        await fsPromises.mkdir(path.join(insideFolderPath), {recursive: true});
        console.log(`${insideFolderPath} - папка${i}`)

        const statFolders = await fsPromises.stat(baseFolderPath)
        console.log(`Чи folder${i} папка? - ${statFolders.isDirectory()}`)

        //Другий цикл для файлів
        for(let j = 1; j < 6; j++) {
            const insideFilePath = path.join(insideFolderPath, `file${j}`);
            await fsPromises.copyFile(pathToFile, path.join(insideFilePath))
            console.log(`${insideFilePath} - файл${j} в папці${i}`)

            const statFiles = await fsPromises.stat(insideFilePath)
            console.log(`Чи file${j} файл? - ${statFiles.isFile()}`)
            console.log('----------------------------------------')
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    }
    //Видаляю перший файл, котрий був як приклад
    await fsPromises.unlink(pathToFile);
    
    }
    anton()


