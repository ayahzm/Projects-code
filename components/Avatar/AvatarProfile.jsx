import React from 'react';
import Avatar from '@mui/material/Avatar';

export const AvatarProfile = ({name, avatar,sx, style, size }) => {
  return (
    <div style={{ textAlign: 'center', ...style }}>
      {avatar ? (
        <Avatar alt={name} src={avatar}  sx={{ width: 50, height: 50, ...sx }} />
      ) : (
        <Avatar alt="Profile Picture" sx={{ width: 50, height: 50 , ...sx}} />
      )}
    </div>
  );
};

export default AvatarProfile;