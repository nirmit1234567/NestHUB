// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const UserProfile = () => {
//   const { userId } = useParams(); // Use userId from the route parameters
//   const [userData, setUserData] = useState(null);
//   const [editing, setEditing] = useState(false);
//   const [updatedData, setUpdatedData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user data when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       console.log(`Fetching user from: http://localhost:3001/users/${userId}/profile`);
//       try {
//         const response = await fetch(`http://localhost:3001/users/${userId}/profile`);
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         setUserData(data);
//         setUpdatedData(data); // Initialize updatedData with fetched data
//         setLoading(false); // Turn off loading
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setError(error.message);
//         setLoading(false); // Turn off loading even if there's an error
//       }
//     };

//     fetchUserData();
//   }, [userId]);

//   const handleEdit = () => {
//     setEditing(true);
//   };

//   const handleSave = () => {
//     fetch(`http://localhost:3001/users/${userId}/profile`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUserData(data);
//         setEditing(false);
//       })
//       .catch((error) => console.error("Error updating user:", error));
//   };

//   const handleDelete = () => {
//     fetch(`http://localhost:3001/users/${userId}/profile`, {
//       method: "DELETE",
//     })
//       .then(() => {
//         alert("User deleted successfully!");
//         window.location.href = "/"; // Redirect to home after deletion
//       })
//       .catch((error) => console.error("Error deleting user:", error));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
//   if (!userData) return <div>User not found</div>;

//   return (
//     <div>
//       <h2>User Profile</h2>
//       {editing ? (
//         <div>
//           <input
//             type="text"
//             value={updatedData.firstName || ""}
//             onChange={(e) => setUpdatedData({ ...updatedData, firstName: e.target.value })}
//           />
//           <input
//             type="text"
//             value={updatedData.lastName || ""}
//             onChange={(e) => setUpdatedData({ ...updatedData, lastName: e.target.value })}
//           />
//           <input
//             type="email"
//             value={updatedData.email || ""}
//             onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
//           />
//           <button onClick={handleSave}>Save</button>
//         </div>
//       ) : (
//         <div>
//           <p>First Name: {userData.firstName}</p>
//           <p>Last Name: {userData.lastName}</p>
//           <p>Email: {userData.email}</p>
//           {userData.profileImagePath && <img src={userData.profileImagePath} alt="Profile" />}
//         </div>
//       )}
//       <button onClick={handleEdit}>Edit</button>
//       <button onClick={handleDelete}>Delete Account</button>
//     </div>
//   );
// };

// export default UserProfile;















import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${userId}/profile`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setUpdatedData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [userId]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/users/${userId}/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setEditing(false);
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/users/${userId}/profile`, {
      method: "DELETE",
    })
      .then(() => {
        alert("User deleted successfully!");
        window.location.href = "/"; 
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!userData) return <div>User not found</div>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2>User Profile</h2>
      {editing ? (
        <div>
          <input
            type="text"
            value={updatedData.firstName || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, firstName: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            value={updatedData.lastName || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, lastName: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="email"
            value={updatedData.email || ""}
            onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
            style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <button onClick={handleSave} style={{ padding: "10px 20px", border: "none", borderRadius: "4px", backgroundColor: "#28a745", color: "#fff", cursor: "pointer" }}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      )}
      <button onClick={handleEdit} style={{ padding: "10px 20px", marginTop: "10px", border: "none", borderRadius: "4px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>
        Edit
      </button>
      <button onClick={handleDelete} style={{ padding: "10px 20px", marginLeft: "10px", border: "none", borderRadius: "4px", backgroundColor: "#dc3545", color: "#fff", cursor: "pointer" }}>
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;
