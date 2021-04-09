import React, {PureComponent, Fragment} from "react";
import Hero from "../../Components/Hero/Hero";
import MainJubmo from "../../Components/Jumbo/Jumbo";
import "./Home.scss";
import FAQAccordion from  "./Accordion/FAQAccordion";

class Home extends PureComponent {
    render(){
        return (
            <Fragment>
                <section id="Home">
                    <Hero />
                    <MainJubmo />
                    <FAQAccordion />                    
                </section>
               
            </Fragment>
        )
    }
}
export default Home;