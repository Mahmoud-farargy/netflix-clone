import React from "react";
import Auxiliary from "../HOC/Auxiliary";
import jumbo from "../../Fixtures/jumbo.json";
// import test from "../../Assets/images/misc/home-mobile.jpg";
const Jumbo = () => {
    return (
        <Auxiliary>
            <section>
                <div className="page--boundaries">
                    {
                        jumbo.map(item => {
                            return (
                                <div key={item.id}  className="jumbo--container ">
                                    <div className="jumbo--inner d-flex card--padding" style={{flexDirection: item.direction}}>
                                        <div className="jumbo--left">
                                            <h1 className="jumbo__title">{item.title}</h1>
                                            <h3 className="jumbo__subtitle">{item.subTitle}</h3>
                                        </div>
                                        <div className="jumbo--right">
                                            <img loading="lazy" src={item.image} alt={item.alt}/>
                                        </div> 
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </Auxiliary>
    )
}
export default Jumbo;