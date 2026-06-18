import './style.css';

console.log('Khoobneek loaded.');

function replaceTextInNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const originalText = node.nodeValue;
    let newText = originalText;
    if (originalText.includes('Dreelio')) {
      newText = newText.replace(/Dreelio/g, 'Khoobneek');
    }
    if (originalText.includes('dreelio')) {
      newText = newText.replace(/dreelio/g, 'khoobneek');
    }
    if (originalText.includes('Freelio')) {
      newText = newText.replace(/Freelio/g, 'Khoobneek');
    }
    if (originalText.includes('freelio')) {
      newText = newText.replace(/freelio/g, 'khoobneek');
    }
    if (newText !== originalText) {
      node.nodeValue = newText;
    }
  } else {
    // Prevent recursion in tags that we shouldn't edit
    if (node.nodeName === 'SCRIPT' || node.nodeName === 'STYLE') {
      return;
    }
    for (let child of node.childNodes) {
      replaceTextInNode(child);
    }
  }
}

function updateTitle() {
  if (document.title.includes('Dreelio')) {
    document.title = document.title.replace(/Dreelio/g, 'Khoobneek');
  }
  if (document.title.includes('Freelio')) {
    document.title = document.title.replace(/Freelio/g, 'Khoobneek');
  }
}

// Add title update to the main replacement function
function runReplacement() {
  replaceTextInNode(document.body);
  updateTitle();
}

// Run initially
runReplacement();

// 2. Create observer to watch for React hydration updates and dynamically replace brand name
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      for (const addedNode of mutation.addedNodes) {
        replaceTextInNode(addedNode);
      }
    }
    if (mutation.type === 'characterData') {
      replaceTextInNode(mutation.target);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true
});

// 3. Fallback interval just in case React forces updates without childList mutations on some elements
setInterval(runReplacement, 500);
