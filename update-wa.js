const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function processFile(filePath) {
    if (!filePath.endsWith(".jsx")) return;
    let content = fs.readFileSync(filePath, "utf8");
    if (!content.includes("MessageCircle") && !content.includes("whatsapp")) return;

    // Check if we need to replace MessageCircle -> WhatsAppIcon
    if (content.includes("<MessageCircle")) {
        content = content.replace(/<MessageCircle/g, "<WhatsAppIcon");
        // Calculate relative path for import
        const relativePath = path.relative(path.dirname(filePath), path.join(srcDir, "components", "WhatsAppIcon")).replace(/\\/g, '/');
        
        if (!content.includes("import WhatsAppIcon")) {
             const lines = content.split('\n');
             const lastImportIndex = lines.findLastIndex(l => l.startsWith("import "));
             lines.splice(lastImportIndex + 1, 0, `import WhatsAppIcon from '${relativePath}';`);
             content = lines.join('\n');
        }
    }

    // Replace btn-primary with btn-whatsapp for whatsapp buttons
    content = content.replace(/className="([^"]*)btn-primary([^"]*)"([^>]*)>\s*<WhatsAppIcon/g, 'className="$1btn-whatsapp$2"$3>\n                <WhatsAppIcon');

    fs.writeFileSync(filePath, content);
}

function traverse(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverse(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

traverse(srcDir);
console.log("Updated files");
