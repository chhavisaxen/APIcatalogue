// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CataloguePage = () => {
//   const navigate = useNavigate();

//   const apiCards = [
//     { name: "Access Token API", id: "accessToken" },
//     { name: "User Details API", id: "userDetails" },
//     { name: "Sales Data API", id: "salesData" },
//     { name: "Service Info API", id: "serviceInfo" },
//     { name: "Security API", id: "security" },
//   ];

//   const handleNavigation = (apiId) => {
//     console.log("Navigating to: ", `/api-details?api=${apiId}`); // Debugging Log
//     alert(`Navigating to: /api-details?api=${apiId}`); // Check Click Event
//     navigate(`/api-details?api=${apiId}`);
//   };

//   return (
//     <div className="container">
//       <h1>API Catalogue</h1>
//       <div className="card-container">
//         {apiCards.map((api) => (
//           <div
//             key={api.id}
//             className="card"
//             onClick={() => handleNavigation(api.id)}
//             style={{ cursor: "pointer", padding: "10px", border: "1px solid black", margin: "10px" }}
//           >
//             {api.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CataloguePage;
