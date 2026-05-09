import { glob } from 'glob';
import { readFile, writeFile } from 'fs/promises';
import { promisify } from 'util';

const read = promisify(readFile);

async function main() {
  const files = await glob('apps/web/src/app/(site)/**/page.tsx');
  let content = '';

  for (const file of files) {
    const fileContent = await readFile(file, 'utf-8');
    // a very simple regex to remove JSX tags and other syntax
    const textContent = fileContent.replace(/<[^>]*>/g, '').replace(/import[^;]+;/g, '');
    content += textContent + '\\n';
  }

  await writeFile('apps/web/src/app/api/chat/data.txt', content);
}

main();
