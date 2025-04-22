// Script to create a deployment zip package
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create output directory if it doesn't exist
const parentDir = path.join(__dirname, '..');
if (!fs.existsSync(parentDir)) {
  fs.mkdirSync(parentDir);
}

// Create a file to stream archive data to
const output = fs.createWriteStream(path.join(parentDir, 'deployment.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Highest compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log(`Deployment package created: ${archive.pointer()} total bytes`);
  console.log('Deployment ZIP file created at ../deployment.zip');
});

// Handle warnings and errors
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Exclude patterns
const excludePatterns = [
  '.git',
  '.env',
  '.env.example',
  'node_modules/ask-sdk-local-debug',
  'create-deployment-zip.js',
  'local-test.js'
];

// Function to check if a path should be excluded
const shouldExclude = (itemPath) => {
  return excludePatterns.some(pattern => 
    itemPath.includes(pattern) || 
    itemPath.startsWith(pattern) || 
    path.basename(itemPath) === pattern
  );
};

// Add files and directories
const addDirectory = (dirPath, archivePath = '') => {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const archiveItemPath = path.join(archivePath, item);
    
    // Skip excluded patterns
    if (shouldExclude(itemPath)) {
      console.log(`Excluding: ${itemPath}`);
      continue;
    }
    
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // For node_modules, add the entire directory at once (significant speed improvement)
      if (item === 'node_modules') {
        console.log('Adding node_modules directory...');
        archive.directory(itemPath, archiveItemPath);
      } else {
        // Regular directory - recurse into it
        addDirectory(itemPath, archiveItemPath);
      }
    } else {
      // Add file
      console.log(`Adding file: ${archiveItemPath}`);
      archive.file(itemPath, { name: archiveItemPath });
    }
  }
};

console.log('Creating deployment package...');
addDirectory(__dirname);

// Finalize the archive
archive.finalize(); 