import React from "react";
import "./About.css";
import profileImage from "../../assets/images/AhijazPP.jpeg";

export default function About() {
  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-container">
          <img
            src={profileImage}
            alt="Ahijaz - Software Developer"
            className="about__image"
          />
        </div>
        <div className="about__content">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            Hi, I'm Amin Hijaz! I'm a passionate software developer with
            expertise in modern web technologies including React, JavaScript,
            HTML, CSS, and Node.js. I enjoy creating clean, user-friendly
            applications that solve real-world problems.
          </p>
          <p className="about__description">
            I'm currently completing the TripleTen Software Engineering
            Bootcamp, where I've gained hands-on experience building full-stack
            applications. This News Explorer project showcases my skills in
            React development, API integration, responsive design, and
            deployment workflows. Feel free to explore my work and connect with
            me!
          </p>
        </div>
      </div>
    </section>
  );
}
