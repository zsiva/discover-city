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
    <div className="cloud cloud-3" />
    <div className="cloud cloud-4" />
    <div className="cloud cloud-2" />
    <div className="cloudBig" />
    <div className="cloudBig cloud2" />
    <img className="trainAnimation" src="./images/transport/train.png" />
    <div className="tree">
      <div className="tronco" />
    </div>
    <div className="grass" />
    <div className="rails" />
  </div>
);

export const planeAnimation = () => (
  <div className="animation">
    <div class="cloud cloud-3" />
    <div class="cloud cloud-4" />
    <div class="cloud cloud-2" />
    <div class="cloudBig" />
    <div class="cloudBig cloud2" />
    <img class="planeAnimation" src="./images/transport/plane.png" />

    <div class="mountain">
      <MountainTop />
    </div>
    <div class="mountain mountain-two">
      <MountainTop />
    </div>
  </div>
);

export const carAnimation = () => (
  <div className="animation">
    <div class="cloud cloud-3" />
    <div class="cloud cloud-4" />
    <div class="cloud cloud-2" />
    <div class="cloudBig" />
    <div class="cloudBig cloud2" />
    <img class="carAnimation" src="./images/transport/car.png" width="70" height="36" />

    <div class="mountain">
      <MountainTop />
    </div>
    <div class="mountain mountain-two">
      <MountainTop />
    </div>
  </div>
);
