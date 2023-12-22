const fs = require('fs')
const path = require('path')
const copyfiles = require('copyfiles')

function copySCSS(srcDir, destDir) {
  fs.readdir(srcDir, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error(err)
      return
    }

    entries.forEach((entry) => {
      const srcPath = path.join(srcDir, entry.name)
      const destPath = path.join(destDir, entry.name)

      if (entry.isDirectory()) {
        // Recursive call for directories
        copySCSS(srcPath, destPath)
      } else if (path.extname(entry.name) === '.scss') {
        // Copying .scss files
        copyfiles([srcPath, path.dirname(destPath)], { up: true }, (err) => {
          if (err) console.error(err)
        })
      }
    })
  })
}

const srcClientPath = path.join(__dirname, '../src/client')
const libClientPath = path.join(__dirname, '../lib/client')

// Ensure the destination directory exists
if (!fs.existsSync(libClientPath)) {
  fs.mkdirSync(libClientPath, { recursive: true })
}

copySCSS(srcClientPath, libClientPath)
