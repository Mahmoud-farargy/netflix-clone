import React, { Fragment } from "react";
import { IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";
import "./Membership.scss";
import { withRouter } from "react-router";
import * as ROUTEPATHS from "../../../Pages/RoutePaths";

const MembershipForm = (props) => {

  return (
    <Fragment>
      <div id="membershipForm" className="d-flex hero__card" style={{flexDirection: props.titlePosition === "above" ? "column": "column-reverse"}}>
        <form onSubmit={() => props.history.push(ROUTEPATHS.PROFILES)} className="hero__email flex-row" style={{marginTop: props.titlePosition === "above" ? "70px": "0"}}>
          <input type="email" required placeholder="Email address" />
          <button type="submit" className="mx-btn">
            get started <IoIosArrowForward />
          </button>
          
        </form>
        <h3 className="card__mini__title" style={{padding: props.titlePosition === "above" ?  "15px 0 0 0" : "0 0 20px 0"}}>{props.miniTitle}</h3>
      </div>
    </Fragment>
  );
};

MembershipForm.propTypes = {
  miniTitle: PropTypes.string,
  titlePosition: PropTypes.string,
  history: PropTypes.object.isRequired
}

export default withRouter(MembershipForm);
