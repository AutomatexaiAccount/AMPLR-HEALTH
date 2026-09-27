const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "src");

function processFile(filePath) {
    if (!filePath.endsWith(".jsx")) return;
    let content = fs.readFileSync(filePath, "utf8");
    if (!content.includes("MessageCircle") && !content.includes("whatsapp")) return;

    let modified = false;

    // Replace MessageCircle with WhatsAppIcon
    if (content.includes("<MessageCircle")) {
        content = content.replace(/<MessageCircle/g, "<WhatsAppIcon");
        modified = true;
        
        // Add import if missing
        if (!content.includes("import WhatsAppIcon")) {
             let relativePath = path.relative(path.dirname(filePath), path.join(srcDir, "components", "WhatsAppIcon")).replace(/\\/g, '/');
             if (!relativePath.startsWith(".")) {
                 relativePath = "./" + relativePath;
             }
             content = `import WhatsAppIcon from '${relativePath}';\n` + content;
        }
    }

    // Replace btn-primary with btn-whatsapp for whatsapp buttons
    // Only in specific files where the WhatsApp button is red
    // E.g. "Book on WhatsApp"
    if (content.includes("Book on WhatsApp") || content.includes("Book Instant on WhatsApp")) {
        content = content.replace(/className="([^"]*)btn-primary([^"]*)"([^>]*)>\s*<WhatsAppIcon/g, 'className="$1btn-whatsapp$2"$3>\n                <WhatsAppIcon');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
    }
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
