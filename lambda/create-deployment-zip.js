// Script to create a deployment zip package
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

console.log('Creating Lambda deployment package...');

// Create output stream
const output = fs.createWriteStream(path.join(__dirname, 'deployment.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Highest compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('✅ Deployment package created successfully!');
  console.log(`📦 Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log('📂 Location: ' + path.join(__dirname, 'deployment.zip'));
});

// Listen for errors
archive.on('error', function(err) {
  console.error('❌ Error creating deployment package:', err);
  process.exit(1);
});

// Pipe archive data to the output file
archive.pipe(output);

// Add all required files
console.log('Adding Lambda function code and dependencies...');

// Add individual files at root level
const filesToInclude = [
  'index.js',
  'package.json',
  'package-lock.json'
];

filesToInclude.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    archive.file(filePath, { name: file });
    console.log(`Added ${file}`);
  } else {
    console.log(`Warning: ${file} not found, skipping`);
  }
});

// Add node_modules directory
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  archive.directory(nodeModulesPath, 'node_modules');
  console.log('Added node_modules directory');
} else {
  console.error('⚠️ Warning: node_modules directory not found! Run npm install first.');
}

// Finalize the archive
archive.finalize(); 