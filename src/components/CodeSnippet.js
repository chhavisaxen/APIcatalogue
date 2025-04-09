import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaRegCopy, FaCheck } from "react-icons/fa";

const languageMap = {
  "cURL": "bash",
  "Python": "python",
  "JavaScript (jQuery)": "javascript",
  "Java": "java",
  "Kotlin": "kotlin",
  "Node.js": "javascript",
  "C#": "csharp",
  "Ruby": "ruby",
  "PHP": "php",
  "HTTP": "http",
  "PowerShell": "powershell"
};

const CodeSnippet = ({ code = '', language = 'javascript' }) => {
  const mappedLang = languageMap[language] || 'javascript';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-snippet-wrapper">
      <button className="copy-button" onClick={handleCopy} title="Copy to clipboard">
        {copied ? <FaCheck /> : <FaRegCopy />}
      </button>
      <SyntaxHighlighter language={mappedLang} style={coy} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
