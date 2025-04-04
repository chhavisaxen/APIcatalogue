const apiData = {
  accessToken: {
    title: "Access Token API",
    method: "POST",
    endpoint: "/api/access-token",
    headers: ["Authorization: Bearer {token}", "Content-Type: application/json"],
    body: [
      { name: "client_id", type: "string", required: true },
      { name: "client_secret", type: "string", required: true }
    ],
    response: { token: "xyz123", expires_in: 3600 }
  },

  salesData: {
    title: "Sales Data API",
    method: "GET",
    endpoint: "/api/sales-data",
    headers: ["Authorization: Bearer {token}"],
    response: { totalSales: 5000, currency: "USD" }
  },

  serviceInfo: {
    title: "Service Info API",
    method: "GET",
    endpoint: "/api/service-info",
    headers: ["Authorization: Bearer {token}"],
    response: { lastServiceDate: "2024-03-01", nextServiceDue: "2024-06-01" }
  },

  adhocInfo: {
    title: "Adhoc API",
    method: "POST",
    endpoint: "/api/adhoc-info",
    headers: ["Authorization: Bearer {token}", "Content-Type: application/json"],
    body: [
      { name: "request_id", type: "string", required: true },
      { name: "data_type", type: "string", required: false }
    ],
    response: { status: "success", message: "Adhoc data processed" }
  },

  security: {
    title: "Security API",
    method: "POST",
    endpoint: "/api/encrypt-decrypt",
    headers: ["Authorization: Bearer {token}", "Content-Type: application/json"],
    body: [
      { name: "data", type: "string", required: true },
      { name: "operation", type: "string", required: true }
    ],
    response: { encryptedData: "a1b2c3d4" }
  }
};

export default apiData;
