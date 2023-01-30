import React, { useState } from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../base-url";
const Input = () => {
  const [name, setName] = useState("");
  const [final, setFinal] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(name);
    setName("");
  };

  const saveUser = async () => {
    axios.post(baseUrl + "/user", { name: name }).then((res) => {
      setFinal(name);
      console.log(res);
    });
  };

  return (
    <Container className="m-5 p-5">
      <div className="m-5 p-5">
        <fieldset className="m-5" disabled="">
          <center>
            <h1 className="form-label" htmlFor="disabledInput">
              Please enter your name
            </h1>
            <form onSubmit={submitHandler}>
              <input
                className="form-control mt-5"
                id="disabledInput"
                type="text"
                placeholder="Name"
                disabled=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {console.log(name)}
              <div className="btn-group-vertical mt-4">
                <Link state={{ name }} to="/email_form">
                  <button
                    onClick={saveUser}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </Link>
              </div>
            </form>
          </center>
        </fieldset>
      </div>
    </Container>
  );
};

export default Input;
