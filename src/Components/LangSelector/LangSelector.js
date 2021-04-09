import React, { useState} from "react";
import "./LangSelector.scss";
import { TiWorld } from "react-icons/ti";

const LangSelector = () => {
  const [langs] = useState(["English", "العربية"]);

  return (
    <span
      className="footer--lang--selector">
      <TiWorld />
      <select>
        <option disabled={true}>Select</option>
        {langs.map((el, i) => (
          <option key={i}>{el}</option>
        ))}
      </select>
    </span>
  );
};

export default LangSelector;
