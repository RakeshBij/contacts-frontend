import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createContact, updateContact } from "./request";
import { useNavigate } from "react-router-dom";

const Modal = ({ setIsOpen, contact, isAdd }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  useEffect(() => {
    if (!isAdd) {
      setName(contact.name || "");
      setPhone(contact.phone || "");
      setEmail(contact.email || "");
    }
  }, []);
  async function createContactHandler() {
    // const form = new FormData(e.target);
    const payload = { name, phone, email };
    if (!name) {
      toast.error("Please enter the name");
    }
    if (!phone) {
      toast.error("Please enter the number");
    }
    const { message, err } = isAdd
      ? await createContact(payload)
      : await updateContact(contact._id, payload);
    if (message) {
      toast.success(message);
      setIsOpen(false);
    } else if (err) {
      toast.error(err);
    }
  }
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpen(false)} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Add New Contact</h5>
          </div>
          <button className="closeBtn" onClick={() => setIsOpen(false)}>
            {/* <RiCloseLine style={{ marginBottom: "-3px" }} /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <rect width="10" height="10" fill="none"></rect>
              <line
                x1="200"
                y1="56"
                x2="56"
                y2="200"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></line>
              <line
                x1="200"
                y1="200"
                x2="56"
                y2="56"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="16"
              ></line>
            </svg>
          </button>
          <div className="modalContent">
            <form onSubmit={createContactHandler}>
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              />
              <input
                type="tel"
                placeholder="Phone No"
                required
                maxLength="10"
                name="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
              />
              <input
                type="email"
                placeholder="Email (optional)"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </form>
          </div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                type="button"
                className="saveBtn"
                onClick={createContactHandler}
              >
                Save
              </button>
              <button className="cancelBtn" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
