import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism'; 


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

  return (
    <SyntaxHighlighter language={mappedLang} style={coy} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
