import React from 'react';

import Taras from '../../avatars/Taras.jpg';
import Bakov from '../../avatars/Bakov.jpg';
import Balan from '../../avatars/Balan.jpg';
import Butenko from '../../avatars/Butenko.jpg';
import Pastushenko from '../../avatars/Pastushenko.jpeg';
import Nikonenko from '../../avatars/Nikonenko.jpg';
import Romanov from '../../avatars/Romanov.jpg';
import Kovalenko from '../../avatars/Kovalenko.jpg';
import Goma from '../../avatars/Goma.jpg';
import Chenchovii from '../../avatars/Chenchovii.jpg';
import Sharkovsky from '../../avatars/Sharkovsky.jpg';
import Yarotsky from '../../avatars/Yarotsky.jpg';
import Hrevtsova from '../../avatars/Hrevtsova.png';
import classes from './About.module.css';

// import PropTypes from 'prop-types';

function About() {
  return (
    <div className={classes.project}>
      <p className={classes.aboutProject}>It&apos;s our great project team!</p>
      <p className={classes.aboutProject}>
        Collaboration of the best minds of 10th and 11th bootcamps.
      </p>
      <p className={classes.aboutProject}>
        Let&apos;s get to know about us better!
      </p>
      <div className={classes.guru}>
        <div className={classes.mainUnit}>
          <img
            className={classes.avatar}
            src={Taras}
            alt="Taras"
            width="100"
            height="100"
          />
          <h2 className={classes.unitName}>Taras Bannyi</h2>
          <p>Our best tutor in world of code</p>
        </div>
      </div>
      <div className={classes.generationZ}>
        <div className={classes.contactUs}>
          <div className={classes.unitLeft}>
            <img
              className={classes.avatar}
              src={Kovalenko}
              alt="Kovalenko"
              width="100"
              height="100"
            />
            <h2 className={classes.unitName}>Valerii Kovalenko</h2>
            <p>text</p>
          </div>
          <div className={classes.navContact}>
            <div className={classes.unitLeft}>
              <img
                className={classes.avatar}
                src={Butenko}
                alt="Butenko"
                width="100"
                height="100"
              />
              <h2 className={classes.unitName}>Aleksandra Butenko</h2>
              <p>text</p>
            </div>
            <div className={classes.unitRight}>
              <img
                className={classes.avatar}
                src={Nikonenko}
                alt="Nikonenko"
                width="100"
                height="100"
              />
              <h2 className={classes.unitName}>Dmitrii Nikonenko</h2>
              <p>text</p>
            </div>
          </div>
        </div>
        <div className={classes.registration}>
          <div className={classes.unit}>
            <img
              className={classes.avatar}
              src={Pastushenko}
              alt="Pastushenko"
              width="100"
              height="100"
            />
            <h2 className={classes.unitName}>Pavel Pastushenko</h2>
            <p>text</p>
          </div>
          <div className={classes.login}>
            <div className={classes.unit}>
              <img
                className={classes.avatar}
                src={Balan}
                alt="Balan"
                width="100"
                height="100"
              />
              <h2 className={classes.unitName}>Marian Balan</h2>
              <p>text</p>
            </div>
          </div>
        </div>
        <div className={classes.profile}>
          <div className={classes.unit}>
            <img
              className={classes.avatar}
              src={Goma}
              alt="Goma"
              width="100"
              height="100"
            />
            <h2 className={classes.unitName}>Vladislav Goma</h2>
            <p>text</p>
          </div>
        </div>
        <div className={classes.homePage}>
          <div className={classes.unit}>
            <img
              className={classes.avatar}
              src={Bakov}
              alt="Bakov"
              width="100"
              height="100"
            />
            <h2 className={classes.unitName}>Aleksandr Bakov</h2>
            <p>Mastermind of this project</p>
          </div>
          <div className={classes.headerFooter}>
            <div className={classes.unit}>
              <img
                className={classes.avatar}
                src={Hrevtsova}
                alt="Hrevtsova"
                width="100"
                height="100"
              />
              <h2 className={classes.unitName}>Aleksandra Hrevtsova</h2>
              <p>did something...</p>
            </div>
          </div>
        </div>
        <div className={classes.scores}>
          <div className={classes.unitRight}>
            <img
              className={classes.avatar}
              src={Romanov}
              alt="Romanov"
              width="100"
              height="100"
            />
            <h2 className={classes.unitName}>Rodion Romanov</h2>
            <p>text</p>
          </div>
          <div className={classes.scoresTeam}>
            <div className={classes.unitLeft}>
              <img
                className={classes.avatar}
                src={Chenchovii}
                alt="Chenchovii"
                width="100"
                height="100"
              />
              <h2 className={classes.unitName}>Vitalii Chenchovii</h2>
              <p>text</p>
            </div>
            <div className={classes.unit}>
              <img
                className={classes.avatar}
                src={Sharkovsky}
                alt="Sharkovsky"
                width="100"
                height="100"
              />
              <h2 className={classes.unitName}>Aleksei Sharkovsky</h2>
              <p>text</p>
            </div>
            <div className={classes.unitRight}>
              <img
                className={classes.avatar}
                src={Yarotsky}
                alt="Yarotsky"
                width="100"
                height="100"
              />
              <h2 className={classes.unitName}>Sergei Yarotskii</h2>
              <p>text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

About.propTypes = {};

export default About;
