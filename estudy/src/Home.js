import React from 'react';

function Home() {
  return (
    <div className="home mx-auto my-0 h-80 text-white w-1/2">
      <h1 className="head-1 text-5xl">New way of learning!</h1>
      <br />
      <br />

      <div className="flex">
        <div className="text">
          <h1>Welcome to E-study</h1>
          <br />
          <p className="leading-9 pr-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            assumenda modi sapiente totam? Soluta asperiores a unde molestias
          </p>
        </div>
        <img
          className="rounded w-1/2"
          src={require('./imgs/online_education.png')}
          alt="online education"
        />
      </div>
      <br />
      <div className="flex flex-row-reverse">
        <div className="text">
          <p className="leading-9 pr-1 flex">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            assumenda modi sapiente totam? Soluta asperiores a unde molestias
            veritatis pariatur tempora quisquam doloribus, incidunt, molestiae
            quaerat aliquam saepe consectetur ipsam.
          </p>
        </div>
        <img
          className="rounded w-1/2"
          src={require('./imgs/online_education2.png')}
          alt="online education"
        />
      </div>
      <br />
      <div className="flex">
        <div className="text">
          <h1>Welcome to E-study</h1>
          <br />
          <p className="leading-9 pr-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            assumenda modi sapiente totam? Soluta asperiores a unde molestias
          </p>
        </div>
        <img
          className="rounded w-1/2"
          src={require('./imgs/online_education3.png')}
          alt="online education"
        />
      </div>
      <br />
      <br />
      <figcaption> Photos Designed by pch.vector / Freepik</figcaption>
    </div>
  );
}

export default Home;
