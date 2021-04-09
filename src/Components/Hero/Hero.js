import React, { Fragment } from "react";
import "./Hero.scss";
import Header from "../../Components/Header/Header";
import HeroText from "../../Fixtures/hero.json";
import MemForm from "../Generic/MembershipForm/MembershipForm";

const Hero = () => {
  return (
    <Fragment>
      <section id="mainHero">
      <div className="page--boundaries">
        <Header />
        <div className="main__hero__inner flex-column">
          <div className="main__hero__box flex-column">
            <div className="hero__container">
              <div className="hero__card">
                <h1 className="card__title">{HeroText[0].title}</h1>
                <h2 className="card__subtitle">{HeroText[0].subtitle}</h2>
              </div>

              <div className="mt-4">
                <MemForm miniTitle={HeroText[0].miniTitle} />
              </div>
              
            </div>
          </div>
        </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Hero;
