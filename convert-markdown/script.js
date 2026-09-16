const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");
const copyBtn = document.getElementById("copy-btn");
const clearBtn = document.getElementById("clear-btn");

// Starter sample Markdown text for instant visualization
const sampleMarkdown = `# Welcome to Markdown Studio!

## Easy Formatting
Write **bold text**, *italic text*, or [links](https://google.com).

### Blockquotes & Media
> "Markdown makes writing for the web clean and simple."

![Sample Image](https://picsum.photos/400/200)`;

function convertMarkdown() {
  const input = markdownInput.value;

  const html = input
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
    .replace(/!\[([^\]]*)\]\(([^)]*)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/(\*\*|__)(.*?)\1/g, "<strong>$2</strong>")
    .replace(/(\*|_)(.*?)\1/g, "<em>$2</em>");

  return html;
}

function updateOutput() {
  const convertedHTML = convertMarkdown();
  htmlOutput.textContent = convertedHTML;
  preview.innerHTML = convertedHTML;
}

// Event Listeners
markdownInput.addEventListener("input", updateOutput);

// Copy HTML button feature
copyBtn.addEventListener("click", () => {
  const textToCopy = htmlOutput.textContent;
  if (!textToCopy) return;

  navigator.clipboard.writeText(textToCopy).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "Copied!";
    copyBtn.style.backgroundColor = "#22c55e";

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.backgroundColor = "";
    }, 1800);
  });
});

// Clear input button
clearBtn.addEventListener("click", () => {
  markdownInput.value = "";
  updateOutput();
  markdownInput.focus();
});

// Load default sample markdown on startup
window.addEventListener("DOMContentLoaded", () => {
  markdownInput.value = sampleMarkdown;
  updateOutput();
});
