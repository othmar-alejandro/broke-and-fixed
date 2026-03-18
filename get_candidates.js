import fs from 'fs';
import path from 'path';

const publicDir = './public';
const folders = fs.readdirSync(publicDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== 'services')
  .map(d => d.name);

const candidates = {};

folders.forEach(folder => {
  const dirPath = path.join(publicDir, folder);
  const files = fs.readdirSync(dirPath)
    .filter(f => f.match(/\.(jpg|jpeg|png)$/i));
  
  if (!files.length) return;

  const stats = files.map(f => ({
    file: f,
    path: path.join(dirPath, f).replace(/\\/g, '/').replace('public/', '/'), // Format for React src
    time: fs.statSync(path.join(dirPath, f)).birthtime.getTime()
  })).sort((a,b) => a.time - b.time);

  candidates[folder] = {
    firsts: stats.slice(0, 2).map(s => s.path),
    lasts: stats.slice(-3).map(s => s.path) // Grab last 3 to have options
  };
});

console.log(JSON.stringify(candidates, null, 2));
