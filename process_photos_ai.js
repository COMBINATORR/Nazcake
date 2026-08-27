require('dotenv').config();
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const IMAGES_DIR = path.join(process.cwd(), 'images');
const PHOTOS_DIR = path.join(process.cwd(), 'Фото');
const OUTPUT_DIR = path.join(PHOTOS_DIR, 'Готовые фото');

// 1. Get the list of all known products (from the images folder)
async function getKnownProducts() {
    const files = await fs.promises.readdir(IMAGES_DIR);
    return files.filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));
}

// 2. Recursively find all JPG/PNG/WEBP files in the source directory
function getSourceFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of list) {
        if (file.isDirectory()) {
            if (file.name !== 'Готовые фото') {
                results = results.concat(getSourceFiles(path.join(dir, file.name)));
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

async function fileToGenerativePart(filePath) {
    let mimeType = 'image/jpeg';
    if (filePath.toLowerCase().endsWith('.png')) mimeType = 'image/png';
    if (filePath.toLowerCase().endsWith('.webp')) mimeType = 'image/webp';
    return {
        inlineData: {
            mimeType,
            data: Buffer.from(await fs.promises.readFile(filePath)).toString("base64")
        }
    };
}

async function processImage(sourceFile, knownProducts, processedCache) {
    const fileName = path.basename(sourceFile);
    const originalBaseName = path.basename(sourceFile, path.extname(sourceFile));
    
    // Check if we already processed this image to save API calls
    if (processedCache) {
        const existing = processedCache.find(f => f.endsWith(`_${originalBaseName}.webp`));
        if (existing) {
            console.log(`\nSkipping: ${fileName} (already processed as ${existing})`);
            return;
        }
    }

    console.log(`\nAnalyzing: ${fileName}`);
    
    const prompt = `You are a product recognition assistant for a bakery/cake shop.
Here is a list of valid product filenames currently used on the website:
${knownProducts.join('\n')}

Look at this image. Which of the products from the list above does it most likely depict?
Consider different angles, slices, and whole cakes.
Respond with ONLY the exact filename from the list.
Do not include any markdown, backticks, quotes, or other words.
If you are completely unsure or it doesn't match anything in the list, respond with "UNKNOWN".`;

    const imagePart = await fileToGenerativePart(sourceFile);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt },
                            imagePart
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        
        if (data.error) {
            console.error(`API Error for ${fileName}:`, data.error.message);
            if (data.error.code === 429 || data.error.message.includes('Quota exceeded')) {
                console.log('Rate limit hit. Waiting 60 seconds before retrying...');
                await new Promise(resolve => setTimeout(resolve, 60000));
                return await processImage(sourceFile, knownProducts, processedCache); // Retry
            }
            return;
        }

        let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        text = text.trim().replace(/`/g, '').replace(/'/g, '').replace(/"/g, '').trim();
        
        console.log(`AI Response for ${fileName}: ${text}`);

        if (text !== 'UNKNOWN' && text !== '' && knownProducts.includes(text)) {
            // Process the file
            const outputBaseName = path.basename(text, path.extname(text));
            const originalBaseName = path.basename(sourceFile, path.extname(sourceFile));
            const outputFileName = `${outputBaseName}_${originalBaseName}.webp`;
            const outputPath = path.join(OUTPUT_DIR, outputFileName);
            
            if (fs.existsSync(outputPath)) {
                console.log(`Skipping ${fileName}, already processed.`);
                return;
            }

            console.log(`Processing and saving as ${outputFileName}...`);
            await sharp(sourceFile)
                .resize({
                    width: 1080,
                    height: 1080,
                    fit: sharp.fit.cover,
                    position: sharp.strategy.entropy
                })
                .webp({ quality: 90 })
                .toFile(outputPath);
            console.log(`Saved ${outputFileName}`);
            if (processedCache) processedCache.push(outputFileName);
        } else {
            console.log(`Skipped ${fileName}, AI could not confidently match (or returned invalid file).`);
        }
    } catch (error) {
        console.error(`Error analyzing ${fileName}:`, error.message);
    }
}

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const processedCache = [];
    if (fs.existsSync(OUTPUT_DIR)) {
        processedCache.push(...fs.readdirSync(OUTPUT_DIR));
    }

    const knownProducts = await getKnownProducts();
    console.log(`Found ${knownProducts.length} known products in images folder.`);
    
    const sourceFiles = getSourceFiles(PHOTOS_DIR);
    console.log(`Found ${sourceFiles.length} source images in Фото folder.`);
    
    const testMode = process.argv.includes('--test');
    const startIndex = testMode ? Math.floor(sourceFiles.length / 2) : 0;
    const limit = testMode ? 5 : sourceFiles.length;
    
    const CONCURRENCY_LIMIT = 5;
    const tasks = sourceFiles.slice(startIndex, startIndex + limit);
    let currentIndex = 0;

    const worker = async () => {
        while (currentIndex < tasks.length) {
            const taskIndex = currentIndex++;
            const file = tasks[taskIndex];
            await processImage(file, knownProducts, processedCache);
            // Delay to avoid rate limits
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    };

    const workers = [];
    for (let i = 0; i < CONCURRENCY_LIMIT; i++) {
        workers.push(worker());
    }
    await Promise.all(workers);
    
    console.log("Done.");
}

if (require.main === module) {
    main();
}

module.exports = {
    getKnownProducts,
    getSourceFiles,
    processImage,
    main
};
