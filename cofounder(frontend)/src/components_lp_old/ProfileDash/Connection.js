import React from "react";
import { Avatar, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material"; // Importing PersonAdd icon from @mui/icons-material

const SuggestedConnection = ({ profilePicture, name, headline }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center">
        <Avatar alt={name} src={profilePicture} />
        <div className="ml-4">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-gray-500 text-sm">{headline}</p>
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

const SuggestedConnectionsContainer = ({ connections }) => {
  return (
    <div className="mt-2">
      <h2 className="text-xl font-semibold mb-4">Suggested Connections</h2>
      {connections && connections.length > 0 ? (
        connections.map((connection, index) => (
          <SuggestedConnection key={index} {...connection} />
        ))
      ) : (
        <p>No suggested connections available</p>
      )}
    </div>
  );
};

export default SuggestedConnectionsContainer;
