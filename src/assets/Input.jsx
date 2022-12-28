import { Fragment } from "react";

const Input = (props) => {
  return (
    <Fragment>
      <input
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.onChange}
        style={{
          minWidth: "400px",
        }}
      />
    </Fragment>
  );
};

export default Input;
