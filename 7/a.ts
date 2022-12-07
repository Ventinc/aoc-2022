const input = await Deno.readTextFile('input.txt');

const lines = input.split('\n');

interface File {
  type: 'DIR' | 'FILE';
  name: string;
  size: number;
  files: File[];
}

const rootDir: File = {
  type: 'DIR',
  name: 'root',
  size: 0,
  files: [],
};

let lastDirs = [rootDir];
let currentDir = rootDir;
const allDirs: File[] = [];
let lastCommand: string = '';

const findOrCreateFolder = (name: string) => {
  let folder = currentDir.files.find(
    (file) => file.type === 'DIR' && file.name === name
  );

  if (!folder) {
    folder = {
      files: [],
      type: 'DIR',
      name: name,
      size: 0,
    };

    currentDir.files.push(folder);
  }

  return folder;
};

for (const line of lines) {
  if (line[0] === '$') {
    const [command, ...args] = line.slice(1).trim().split(' ');

    if (command === 'cd') {
      if (args[0] === '/') {
        lastDirs = [...lastDirs, currentDir];
        currentDir = rootDir;
      } else if (args[0] === '..') {
        const beforeDir = lastDirs.pop();
        if (beforeDir) {
          currentDir = beforeDir;
        }
      } else {
        const folder = findOrCreateFolder(args[0]);

        lastDirs.push(currentDir);
        currentDir = folder;
      }
    }
  } else {
    const [sizeString, name] = line.split(' ');

    if (sizeString === 'dir') {
      findOrCreateFolder(name);
    } else {
      currentDir.files.push({
        type: 'FILE',
        files: [],
        size: parseInt(sizeString, 10),
        name,
      });
    }
  }
}

const sumSize = (currentFolder: File) => {
  let size = 0;
  for (const file of currentFolder.files) {
    if (file.type === 'DIR') {
      file.size = sumSize(file);
      allDirs.push(file);
      size += file.size;
    } else {
      size += file.size;
    }
  }

  return size;
};

rootDir.size = sumSize(rootDir);

console.log(
  allDirs
    .filter((dir) => dir.size <= 100000)
    .reduce((totalSize, currentFolder) => totalSize + currentFolder.size, 0)
);
