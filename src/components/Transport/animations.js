import React from 'react';
import './style.css';

export const MountainTop = () => (
  <div className="mountain-top">
    <div className="mountain-cap-1" />
    <div className="mountain-cap-2" />
    <div className="mountain-cap-3" />
  </div>
);

export const trainAnimation = () => (
  <div className="animation">
    <div className="cloudSmall" />
    <div className="cloudBig" />
    <div className="cloudBig cloud2" />
    <img className="trainAnimation" alt="trainAnimation" src="./images/transport/train.png" />
    <div className="tree">
      <div className="tronco" />
    </div>
    <div className="grass" />
    <div className="rails" />
  </div>
);

export const planeAnimation = () => (
  <div className="animation">
    <div className="cloudSmall" />
    <div className="cloudBig" />
    <div className="cloudBig cloud2" />
    <img className="planeAnimation" alt="planeAnimation" src="./images/transport/plane.png" />

    <div className="mountain">
      <MountainTop />
    </div>
    <div className="mountain mountain-two">
      <MountainTop />
    </div>
  </div>
);

export const carAnimation = () => (
  <div className="animation">
    <div className="cloudBig" />
    <div className="cloudBig cloud2" />
    <img
      className="carAnimation"
      src="./images/transport/car.png"
      alt="car"
      width="70"
      height="36"
    />

    <div className="mountain">
      <MountainTop />
    </div>
    <div className="mountain mountain-two">
      <MountainTop />
    </div>
  </div>
);
