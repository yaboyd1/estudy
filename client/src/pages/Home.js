import React from 'react';

function Home() {
  return (
    <div className="home text-white">
      <h1 className="head-1">New way of learning!</h1>
      <div className="container-fluid">
        <h2 className="header text-center">Welcome to e-Study!</h2>
        <div className="content d-flex flex-row justify-content-center">
          <p className="w-25 p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            assumenda modi sapiente totam? Soluta asperiores a unde molestias
          </p>
          <img
            className="img-section w-25 p-2 rounded border border-secondary"
            src={require('../imgs/online_education.png')}
            alt="online education"
          />
        </div>
        <br />
        <div className="content d-flex flex-row-reverse justify-content-center">
          <p className="w-25 p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            assumenda modi sapiente totam? Soluta asperiores a unde molestias
            veritatis pariatur tempora quisquam doloribus, incidunt, molestiae
            quaerat aliquam saepe consectetur ipsam.
          </p>
          <img
            className="img-section w-25 p-2 rounded border border-secondary"
            src={require('../imgs/online_education2.png')}
            alt="online education"
          />
        </div>
        <br />
        <div className="content d-flex justify-content-center">
          <p className="text-center w-25 p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            assumenda modi sapiente totam? Soluta asperiores a unde molestias
          </p>
          <img
            className="img-section w-25  p-2 rounded border border-secondary"
            src={require('../imgs/online_education3.png')}
            alt="online education"
          />
        </div>
        <br />
        <br />
        <figcaption className="text-center">
          {' '}
          Photos Designed by pch.vector / Freepik
        </figcaption>
      </div>
    </div>
  );
}

export default Home;
