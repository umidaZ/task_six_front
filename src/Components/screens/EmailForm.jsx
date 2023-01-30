import React, { useState } from "react";
import { Container } from "reactstrap";
import { useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { baseUrl } from "../../base-url";

const genId = () => {
  return uuidv4();
};

function EmailForm() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [all_users, setAllUser] = useState([]);
  const [toggledContainer, setToggledContainer] = useState(true);
  const [filtered_users, setFilteredUsers] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [senderObj, setSenderObj] = useState("");
  const [messageToggle, setMessageToggle] = useState(false);

  const location = useLocation();
  localStorage.setItem("name", location.state.name);
  let userName = localStorage.getItem("name");

  const fetchData = async () => {
    await axios
      .get(baseUrl + "/get_users")
      .then((res) => setAllUser(res.data))

      .catch((err) => console.log(err));
  };

  const fetchSender = async () => {
    await axios
      .post(baseUrl + "/sender", { name: localStorage.getItem("name") })
      .then((res) => {
        setSenderObj(res.data);
        setSender(res.data[0]["name"]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    fetchSender();
  }, []);

  useLayoutEffect(() => {
    fetchData();
    fetchSender();
  }, []);

  const submitForm = (e) => {
    e.prevent.default();

    setName("");
    setTitle("");
    setText("");
  };

  const updateRecipient = async () => {
    let email = {
      title,
      text,
      reciever: recipient,
      sender: sender,
      status: true,
      customId: genId(),
    };

    await axios
      .patch(baseUrl + "/receiver", {
        recipient: String(name),
        email: email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSender = async () => {
    let email = {
      title,
      text,
      reciever: recipient,
      sender: userName,
      status: true,
      customId: genId(),
    };

    await axios
      .patch(baseUrl + "/sender", {
        sender: String(email.sender),
        email: email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let email = {
    title,
    text,
    reciever: recipient,
    sender: location.state.name,
    status: true,
    customId: genId(),
  };
  return (
    <Container className="m-3 p-3">
      <div className="m-5 p-5">
        <fieldset className="m-5" disabled="">
          <center>
            <h1 className="form-label" htmlFor="disabledInput">
              Send Message
            </h1>
            <form onSubmit={submitForm}>
              <input
                className="form-control mt-5"
                id="disabledInput"
                type="text"
                placeholder="Name"
                disabled=""
                value={name}
                onBlur={() => setToggledContainer(false)}
                onFocus={() => {
                  setMessageToggle(true);
                }}
                onChange={(e) => {
                  setToggledContainer(true);
                  setName(e.target.value);
                  setFilteredUsers(
                    all_users.filter((user) => {
                      return user.name.includes(e.target.value);
                    })
                  );
                  console.log(filtered_users);
                  setRecipient(
                    all_users.filter((el) => {
                      return el.name.includes(e.target.value);
                    })[0]["name"]
                  );
                }}
              />
              {name.length > 0 ? (
                <Container
                  className={`py-3 ${toggledContainer ? "" : "d-none"}`}
                >
                  <div className=" p-1">
                    {filtered_users.map((user, index) => {
                      return (
                        <h5
                          key={index}
                          onClick={() => {
                            setName(user.name);
                            setToggledContainer(false);
                          }}
                        >
                          {user.name}
                        </h5>
                      );
                    })}
                  </div>
                </Container>
              ) : (
                ""
              )}
              <input
                className="form-control mt-5"
                id="disabledInput"
                type="text"
                placeholder="Title"
                disabled=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="form-control mt-5"
                id="exampleTextarea"
                placeholder="Text"
                rows="3"
                style={{ height: "94px" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>

              <div className="btn-group-vertical mt-4">
                <button
                  onClick={async () => {
                    if (text.length > 0 && name.length > 0) {
                      alert("Message is saved");
                      updateRecipient();
                      updateSender();

                      setTimeout(() => {}, 3500);

                      await axios
                        .post(baseUrl + "/new_message", {
                          email,
                        })
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));
                    } else {
                      alert("Please fill the form!!!");
                    }
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Send
                </button>
              </div>
            </form>
          </center>
        </fieldset>

        {messageToggle ? (
          <Container
            className="rounded-3 my-4 p-4"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
            }}
          >
            <div className="d-flex flex-column justify-content-start align-items-center">
              <h4 className="m-3 text-primary">Recieved messages</h4>
              {Object.keys(senderObj).length > 0 &&
                senderObj[0].received.map((element, i) => (
                  <div
                    key={i}
                    className="alert my-2 alert-light w-100 card text-white bg-primary mb-3"
                    role="alert"
                  >
                    <Container className="d-flex justify-content-between">
                      <h5>
                        <span className="fs-5 mx-2 ">From:</span>
                        {element.sender}
                        {console.log(senderObj)}
                      </h5>
                      <br />
                      <br />

                      <h5>
                        <span className="fs-5"></span> {element.status}
                      </h5>
                    </Container>
                    <Container className="px-4">
                      <strong>
                        <span>Title: {element.title}</span>
                      </strong>
                      <p className="m-0 text-dark">Message:</p>
                      <div
                        style={{
                          border: "1.5px solid #d9534f",
                        }}
                        className="bg-white rounded-1 px-3 py-1 text-dark"
                      >
                        <p className="m-0">{element.text}</p>
                      </div>
                    </Container>
                  </div>
                ))}
            </div>
          </Container>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
}
export default EmailForm;
