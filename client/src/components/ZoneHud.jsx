import React from 'react';

export default function ZoneHud({ zoneText }) {
  return (
    <div className="zone-hud" id="zoneHud">
      <div className="indicator-dot"></div>
      <span>{zoneText || 'Ground Floor · Grand Entrance Plaza'}</span>
    </div>
  );
}

