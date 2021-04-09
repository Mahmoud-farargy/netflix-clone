import React, { Fragment, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import "./FAQ.scss";
import FAQsArray from "../../../Fixtures/faqs.json";

import { FaTimes, FaPlus } from "react-icons/fa";
import MembershipForm from "../../../Components/Generic/MembershipForm/MembershipForm";
import HeroText from "../../../Fixtures/hero.json";

const FAQAccordion = () => {
  const [currentId, setCurrentId] = useState(null);
  return (
    <Fragment>
       <div className="page--boundaries">
        <div
          id="faqsContainer"
          className="flex-column inner--container card__text card--padding"
        >
          <h2 className="faq__title">Fraquently asked questions</h2>
          <Accordion onSelect={(id) => setCurrentId(id)}>
            {FAQsArray &&
              FAQsArray.length > 0 &&
              FAQsArray.map((item, i) => {
                return (
                  <Card key={item.id || i} className="faq__card">
                    <Accordion.Toggle
                      className="faq__card__header flex-row"
                      as={Card.Header}
                      variant="link"
                      eventKey={item.id}
                    >
                      <h3>{item.header}</h3>
                      <span>
                        {currentId === item.id ? <FaTimes /> : <FaPlus />}
                      </span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={item.id}>
                      <Card.Body className="faq__card__body">
                        {item.body}
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                );
              })}
          </Accordion>
          <MembershipForm miniTitle={HeroText[0].miniTitle} titlePosition="above" />
        </div>
      </div>
    </Fragment>
  );
};
export default FAQAccordion;
