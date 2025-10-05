// Script insert dynamically

export const injectScript = (code) => {
    const temp = document.createElement("div");
    temp.innerHTML = code.trim();
  
    Array.from(temp.childNodes).forEach(node => {
      if (node.tagName === "SCRIPT") {
        const script = document.createElement("script");
        if (node.src) {
          script.src = node.src;
        } else {
          script.textContent = node.textContent;
        }
        document.head.appendChild(script);
      } else if (node.tagName === "META") {
        document.head.appendChild(node);
      }
    });
  };
  