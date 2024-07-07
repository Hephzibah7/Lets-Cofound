import React from "react";
import { Avatar, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material"; // Importing PersonAdd icon from @mui/icons-material

const SuggestedConnection = ({ profileImage, name, designation }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center">
        <Avatar alt={name} src={`http://localhost:9002/uploads/${recommendedUser.profileImage}`} />
        <div className="ml-4">
          <h3 className="font-semibold">{recommendedUser.fullName}</h3>
          <p className="text-gray-500 text-sm">{recommendedUser.designation}</p>
        </div>
      </div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PersonAdd />} // Using PersonAdd icon as the start icon of the button
      >
        Connect
      </Button>
    </div>
  );
};

const SuggestedConnectionsContainer = ({ recommendedUsers }) => {
  return (
    <div className="mt-2">
      <h2 className="text-xl font-semibold mb-4">Suggested Connections</h2>
      {recommendedUsers && recommendedUsers.length > 0 ? (
        recommendedUsers.map((recommendedUser, index) => (
          <SuggestedConnection key={index} {...connection} />
        ))
      ) : (
        <p>No suggested connections available</p>
      )}
    </div>
  );
};

export default SuggestedConnectionsContainer;
