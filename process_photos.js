const fs = require('fs/promises');
const path = require('path');
const imghash = require('imghash');
const sharp = require('sharp');
const os = require('os');

const IMAGES_DIR = path.join(__dirname, 'images');
const PHOTOS_DIR = path.join(__dirname, 'Фото');
const OUTPUT_DIR = path.join(PHOTOS_DIR, 'Готовые фото');
const MATCH_THRESHOLD = 5; // Max bit differences

function hexToBin(hexString) {
    let bin = '';
    for (let i = 0; i < hexString.length; i++) {
        bin += parseInt(hexString[i], 16).toString(2).padStart(4, '0');
    }
    return bin;
}

function hammingDistance(hash1, hash2) {
    const b1 = hexToBin(hash1);
    const b2 = hexToBin(hash2);
    let diff = 0;
    for (let i = 0; i < b1.length; i++) {
        if (b1[i] !== b2[i]) diff++;
    }
    return diff;
}

async function getFiles(dir) {
    let results = [];
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const file of list) {
        if (file.isDirectory()) {
            if (file.name !== 'Готовые фото') {
                results = results.concat(await getFiles(path.join(dir, file.name)));
            }
        } else {
            const ext = path.extname(file.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                results.push(path.join(dir, file.name));
            }
        }
    }
    return results;
}

async function main() {
    console.log('Индексация папки images...');
    const imageFiles = await getFiles(IMAGES_DIR);
    const db = [];
    
    // Concurrency limiter function
    const concurrencyLimit = os.cpus().length;
    const executeWithLimit = async (tasks, limit) => {
        const results = [];
        const executing = new Set();

        for (const task of tasks) {
            const p = task().then(result => {
                executing.delete(p);
                return result;
            });
            executing.add(p);
            results.push(p);

            if (executing.size >= limit) {
                await Promise.race(executing);
            }
        }

        return Promise.all(results);
    };

    const indexTasks = imageFiles.map(file => async () => {
        try {
            const hash = await imghash.hash(file, 8); // 8x8 block
            db.push({ file, name: path.basename(file), hash });
        } catch (e) {
            // Ignore non-image files or errors
        }
    });

    await executeWithLimit(indexTasks, concurrencyLimit);

    console.log(`Проиндексировано ${db.length} изображений в базе.`);

    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    console.log('Поиск исходников в папке Фото...');
    const sourceFiles = await getFiles(PHOTOS_DIR);
    console.log(`Найдено ${sourceFiles.length} исходников.`);

    let processedCount = 0;

    const processTasks = sourceFiles.map(file => async () => {
        try {
            const sourceHash = await imghash.hash(file, 8);
            
            let bestMatch = null;
            let minDistance = Infinity;

            for (const entry of db) {
                const distance = hammingDistance(sourceHash, entry.hash);
                if (distance < minDistance) {
                    minDistance = distance;
                    bestMatch = entry;
                }
            }

            if (bestMatch && minDistance <= MATCH_THRESHOLD) {
                console.log(`Совпадение: ${path.basename(file)} -> ${bestMatch.name} (разница: ${minDistance})`);
                
                // Process image
                const targetName = path.parse(bestMatch.name).name + '.webp';
                const outputPath = path.join(OUTPUT_DIR, targetName);

                await sharp(file)
                    .resize({
                        width: 1080,
                        height: 1080,
                        fit: sharp.fit.cover,
                        position: sharp.strategy.entropy // or center
                    })
                    .webp({ quality: 85 })
                    .toFile(outputPath);
                    
                processedCount++;
            } else {
                console.log(`Совпадение не найдено для: ${path.basename(file)} (мин разница: ${minDistance})`);
            }
        } catch (e) {
            console.error(`Ошибка при обработке ${path.basename(file)}:`, e.message);
        }
    });

    await executeWithLimit(processTasks, concurrencyLimit);

    console.log(`Успешно обработано: ${processedCount} фотографий.`);
}

main().catch(console.error);
