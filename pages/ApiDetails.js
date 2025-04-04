import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiData from "../apiData";
import CodeSnippet from "../components/CodeSnippet";

import "./ApiDetails.css";

const languages = [
  "cURL", "Python", "JavaScript (jQuery)", "Java", "Kotlin", "Node.js",
  "C#", "Ruby", "PHP", "HTTP", "PowerShell"
];

const standardExamples = (method, endpoint, body) => {
  const bodyObject = body
    ? body.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.required ? `your_${curr.name}` : '' }), {})
    : null;
  const bodyString = bodyObject ? JSON.stringify(bodyObject, null, 2) : '';


    return {
      "cURL": `curl -X ${method} "https://api.example.com${endpoint}" -H "Authorization: Bearer {token}"${body ? ' -H "Content-Type: application/json" -d \'' + bodyString + '\'' : ''}`,
      "Python": `import requests\nrequests.${method.toLowerCase()}("https://api.example.com${endpoint}", headers={"Authorization": "Bearer {token}"${body ? ', "Content-Type": "application/json"' : ''}}${body ? `, json=${bodyString}` : ''})`,
      "JavaScript (jQuery)": `$.ajax({url: "https://api.example.com${endpoint}", type: "${method}", headers: {"Authorization": "Bearer {token}"${body ? ', "Content-Type": "application/json"' : ''}}${body ? `, data: '${bodyString}'` : ''}});`,
      "Node.js": `const axios = require('axios');\naxios.${method.toLowerCase()}("https://api.example.com${endpoint}", {\n  headers: { "Authorization": "Bearer {token}"${body ? ', "Content-Type": "application/json"' : ''} },\n  ${body ? `data: ${bodyString},` : ''}\n}).then(response => console.log(response.data));`,
      "PHP": `$ch = curl_init("https://api.example.com${endpoint}"); curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${method}"); curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: Bearer {token}"${body ? ', "Content-Type: application/json"' : ''}));${body ? ` curl_setopt($ch, CURLOPT_POSTFIELDS, '${bodyString}');` : ''} curl_exec($ch);`,
      "Java": `import java.net.HttpURLConnection;\nimport java.net.URL;\nimport java.io.OutputStream;\nimport java.util.Scanner;\n\npublic class ApiExample {\n    public static void main(String[] args) throws Exception {\n        URL url = new URL("https://api.example.com${endpoint}");\n        HttpURLConnection conn = (HttpURLConnection) url.openConnection();\n        conn.setRequestMethod("${method}");\n        conn.setRequestProperty("Authorization", "Bearer {token}");\n        ${body ? 'conn.setRequestProperty("Content-Type", "application/json");' : ''}\n        conn.setDoOutput(true);\n\n        ${body ? `\n        String jsonInputString = "${bodyString.replace(/"/g, '\\"')}";\n        try(OutputStream os = conn.getOutputStream()) {\n            byte[] input = jsonInputString.getBytes("utf-8");\n            os.write(input, 0, input.length);\n        }` : ''}\n\n        Scanner scanner = new Scanner(conn.getInputStream());\n        while (scanner.hasNext()) {\n            System.out.println(scanner.nextLine());\n        }\n        scanner.close();\n    }\n}`,
      "Kotlin": `import khttp\n\nkhttp.request(\n  method = "${method}",\n  url = "https://api.example.com${endpoint}",\n  headers = mapOf("Authorization" to "Bearer {token}"${body ? ', "Content-Type" to "application/json"' : ''})${body ? `, json = ${bodyString}` : ''}\n)`,
      "C#": `using System;\nusing System.Net.Http;\nusing System.Text;\nusing System.Threading.Tasks;\n\nclass Program {\n    static async Task Main() {\n        var client = new HttpClient();\n        var request = new HttpRequestMessage(HttpMethod.${method}, "https://api.example.com${endpoint}");\n        request.Headers.Add("Authorization", "Bearer {token}");\n        ${body ? `request.Content = new StringContent("${bodyString.replace(/"/g, '\\"')}", Encoding.UTF8, "application/json");` : ''}\n        var response = await client.SendAsync(request);\n        Console.WriteLine(await response.Content.ReadAsStringAsync());\n    }\n}`,
      "PowerShell": `Invoke-RestMethod -Uri "https://api.example.com${endpoint}" -Method ${method} -Headers @{"Authorization"="Bearer {token}"${body ? '; "Content-Type"="application/json"' : ''}}${body ? ` -Body '${bodyString}'` : ''}`,
      "HTTP": `${method} /${endpoint} HTTP/1.1\nHost: api.example.com\nAuthorization: Bearer {token}${body ? '\nContent-Type: application/json\n\n' + bodyString : ''}`,
  
      "Ruby": `require 'net/http'\nrequire 'json'\n\nuri = URI("https://api.example.com${endpoint}")\nrequest = Net::HTTP::${method}.new(uri)\nrequest["Authorization"] = "Bearer {token}"\n${body ? 'request["Content-Type"] = "application/json"\nrequest.body = ' + bodyString : ''}\nresponse = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(request) }\nputs response.body`,
  };

};

const ApiDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [api, setApi] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("cURL");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const apiKey = params.get("api");

    if (apiKey && apiData[apiKey]) {
      setApi(apiData[apiKey]);
    } else {
      setApi(null);
    }
  }, [location.search]);

  if (!api) {
    return <h2 style={{ color: "red", textAlign: "center" }}>❌ API Not Found. Please check the URL.</h2>;
  }

  const codeExamples = standardExamples(api.method, api.endpoint, api.body);

  return (
    <div className="api-details-container">
      <button className="sandbox-button">Test in Sandbox</button>
      <h1>{api.title}</h1>
      <p><strong>Method:</strong> <span className={`method-badge ${api.method.toLowerCase()}`}>{api.method}</span></p>
      <p><strong>Endpoint:</strong> {api.endpoint}</p>
      <p><strong>Headers:</strong> {api.headers.join(", ")}</p>

      <div className="http-response-box">
        <h3>HTTP Response Code</h3>
        <pre>200 OK</pre>
      </div>

      {api.body && (
        <div>
          <h3>Request Body:</h3>
          <ul>
            {api.body.map((param, index) => (
              <li key={index}>
                <strong>{param.name}</strong> ({param.type}) {param.required ? "(Required)" : "(Optional)"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {api.body && (
        <div className="sample-box">
          <h3>Request Sample:</h3>
          <CodeSnippet
            code={JSON.stringify(api.body.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.required ? `your_${curr.name}` : '' }), {}), null, 2)}
            language="json"
          />
        </div>
      )}

      {api.response && (
        <div className="sample-box">
          <h3>Response Sample:</h3>
          <CodeSnippet
            code={JSON.stringify(api.response, null, 2)}
            language="json"
          />
        </div>
      )}

      <div className="language-select">
        <h3>Select Language:</h3>
        <select onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage}>
          {languages.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      <div className="sample-box">
        <h3>{selectedLanguage} Example:</h3>
        <CodeSnippet
          code={codeExamples[selectedLanguage] || `// ${selectedLanguage} example not available`}
          language={selectedLanguage.toLowerCase().includes("javascript") ? "javascript" : selectedLanguage.toLowerCase()}
        />
      </div>

      <button className="catalogue-button" onClick={() => navigate("/", { state: { openPopup: true } })}>
        Back to API Catalogue
      </button>
    </div>
  );
};

export default ApiDetails;
