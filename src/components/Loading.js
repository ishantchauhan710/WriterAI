import React from "react";
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
    <div className="writerai-loading-component">
      <CircularProgress size="4rem" color="secondary" />
    </div>
  );
};
