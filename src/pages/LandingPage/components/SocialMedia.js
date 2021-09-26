import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Button from "./Button";
import "./SocialMedia.css";

import { IconContext } from "react-icons/lib";

function SocialMedia() {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff", sixe: 64 }}>
        <div>
          <div className="socialmedia__section">
            <div className="socialmedia__wrapper">
              <h1 className="socialmedia__heading">&copy;Anemo</h1>
              <div className="socialmedia__container">
                <Link to="/sign-up" classname="socialmedia__container-card">
                  <div className="socialmedia__container-cardInfo">
                    <div className="icon">
                      <FaTwitter size="48px" />
                    </div>
                    <h3>Twitter</h3>

                    <ul
                      id="twitter-text"
                      className="socialmedia__container-features"
                    >
                      <li>Know our latest endeavours.</li>
                      <li>Grow With Us!</li>
                    </ul>
                  </div>
                </Link>

                <Link to="/sign-up" classname="socialmedia__container-card">
                  <div className="socialmedia__container-cardInfo">
                    <div className="icon">
                      <FaLinkedinIn size="48px" />
                    </div>
                    <h3>LinkedIn</h3>

                    <ul
                      id="linkedin-text"
                      className="socialmedia__container-features"
                    >
                      <li>Stay In touch with us.</li>
                      <li>Work together.</li>
                    </ul>
                  </div>
                </Link>

                <Link to="/sign-up" classname="socialmedia__container-card">
                  <div className="socialmedia__container-cardInfo">
                    <div className="icon">
                      <FaInstagram size="48px" />
                    </div>
                    <h3>Instagram</h3>

                    <ul
                      id="instagram-text"
                      className="socialmedia__container-features"
                    >
                      <li>What's your hustle?</li>
                      <li>Show the world!</li>
                    </ul>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default SocialMedia;
