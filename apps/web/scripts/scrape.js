import { readFile, writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { glob } from "glob";

const _read = promisify(readFile);

async function main() {
	const files = await glob("apps/web/src/app/(site)/**/page.tsx");
	let content = "";

	for (const file of files) {
		const fileContent = await readFile(file, "utf-8");
		// a very simple sanitizer to remove JSX tags and other syntax
		// (match single chars only so a single pass strips all tags;
		//  "<" and ">" are stripped individually, which is safe because
		//  this is only used to flatten page source for the chat index)
		const textContent = fileContent
			.replace(/[<>]/g, "")
			.replace(/import[^;]+;/g, "");
		content += `${textContent}\\n`;
	}

	await writeFile("apps/web/src/app/api/chat/data.txt", content);
}

main();
