import React from 'react';

const PersonIcon = (
  width,
  height
) => (
  <div
    className="rounded-5 border border-3 mt-4 bg-light"
    style={{ width: '200px', height: '300px' }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      style={{ transform: 'scale(1.4) translateY(25px)'}}
    >
      <style>{".s0{fill:rgb(53, 151, 181)"}</style>
      <path
        id="Shape 1"
        className="s0"
        d="M199.5 187c-41.2 0-74.5-33.3-74.5-74.5S158.3 38 199.5 38 274 71.3 274 112.5 240.7 187 199.5 187z"
      />
      <path
        id="Shape 2"
        className="s0"
        d="M200 531c-69.7 0-126-74-126-165.5S130.3 200 200 200s126 74 126 165.5S269.7 531 200 531z"
      />
    </svg>
  </div>
)

export default PersonIcon
