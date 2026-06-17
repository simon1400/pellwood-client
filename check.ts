const fs = require('fs');
const path = require('path');

const dirsToScan = ['components', 'pages', 'layout'];
const results: { file: string, content: string }[] = [];

function scanDir(dir: string) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            scanDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Remove comments and find multiline p tags
            // Extremely basic regex, just looking for <p...> ... <div ...
            // We use simple string searching instead of regex to avoid complexity
            
            // Remove self-closing elements and simple tags to simplify
            let index = 0;
            while ((index = content.indexOf('<p', index)) !== -1) {
                const closeIndex = content.indexOf('</p>', index);
                if (closeIndex !== -1) {
                    const pContent = content.substring(index, closeIndex);
                    if (pContent.includes('<div') || pContent.includes('<p') && pContent.indexOf('<p') !== 0) {
                        results.push({ file: fullPath, content: pContent });
                    }
                }
                index += 2;
            }
        }
    }
}

for (const dir of dirsToScan) {
    scanDir(dir);
}

console.log(JSON.stringify(results, null, 2));
