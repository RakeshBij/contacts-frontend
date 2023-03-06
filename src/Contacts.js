import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { deleteContact, getContacts } from "./request";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const Contacts = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [contact, setContact] = useState({});
  const [isAdd, setIsAdd] = useState(true);
  const [key, setKey] = useState(Math.random().toString());
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getAllContacts();
  }, [isOpen]);
  const alphaArr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  async function getAllContacts() {
    const { message, err, data } = await getContacts();

    setContacts(data.data);
  }

  function logoutHandler() {
    Cookies.remove("token");
    localStorage.clear();
    window.location.reload();
  }

  async function deleteHandler(id) {
    const { message, err } = await deleteContact(id);
    if (message) {
      toast.success(message);
    } else if (err) {
      toast.error(err);
    }
    await getAllContacts();
  }

  function redirectContact(c) {
    navigate(
      `/contacts/${c._id}?name=${c.name}&phone=${c.phone}&email=${c.email}`
    );
  }
  return (
    <>
      {contacts.length ? (
        <>
          <div className="s-cont">
            <div>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search ..."
                  required
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
              <button className="search-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="#fff"
                  viewBox="0 0 256 256"
                >
                  <rect width="256" height="256" fill="none"></rect>
                  <circle
                    cx="116"
                    cy="116"
                    r="84"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="28"
                  ></circle>
                  <line
                    x1="175.4"
                    y1="175.4"
                    x2="224"
                    y2="224"
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="28"
                  ></line>
                </svg>
              </button>
            </div>
            <button className="logout" onClick={logoutHandler}>
              logout
            </button>
          </div>

          {contacts
            .filter((c) => {
              return (
                c.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                c.phone.toLowerCase().includes(search.toLocaleLowerCase())
              );
            })
            .map((c) => {
              return (
                <div className="contacts" key={c.phone}>
                  <div
                    className="c-name"
                    onClick={redirectContact.bind(this, c)}
                  >
                    {c.name}
                  </div>
                  <div
                    className="c-num"
                    onClick={redirectContact.bind(this, c)}
                  >
                    {c.phone}
                  </div>
                  <div className="c-icons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      viewBox="0 0 256 256"
                      className="c-edit"
                      onClick={() => {
                        setIsOpen(true);
                        setContact(c);
                        setIsAdd(false);
                      }}
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <path
                        d="M92.7,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4l-120,120A7.9,7.9,0,0,1,92.7,216Z"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></path>
                      <line
                        x1="136"
                        y1="64"
                        x2="192"
                        y2="120"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></line>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      fill="#000000"
                      viewBox="0 0 256 256"
                      style={{ display: "none" }}
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <polyline
                        points="216 184 216 40 72 40"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></polyline>
                      <rect
                        x="40"
                        y="72"
                        width="144"
                        height="144"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></rect>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      fill="#000000"
                      viewBox="0 0 256 256"
                      onClick={deleteHandler.bind(this, c._id)}
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <line
                        x1="216"
                        y1="56"
                        x2="40"
                        y2="56"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></line>
                      <line
                        x1="104"
                        y1="104"
                        x2="104"
                        y2="168"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></line>
                      <line
                        x1="152"
                        y1="104"
                        x2="152"
                        y2="168"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></line>
                      <path
                        d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></path>
                      <path
                        d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"
                        fill="none"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      ></path>
                    </svg>
                  </div>
                </div>
              );
            })}
        </>
      ) : (
        <div className="contact-div">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            width="647.63626"
            height="100"
            viewBox="0 0 647.63626 632.17383"
            //   xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#f2f2f2"
            />
            <path
              d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#3f3d56"
            />
            <path
              d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#ff416c"
            />
            <circle cx="190.15351" cy="24.95465" r="20" fill="#ff416c" />
            <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" />
            <path
              d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#e6e6e6"
            />
            <path
              d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#3f3d56"
            />
            <path
              d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
              transform="translate(-276.18187 -133.91309)"
              fill="#ff416c"
            />
            <circle cx="433.63626" cy="105.17383" r="20" fill="#ff416c" />
            <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff" />
          </svg>
        </div>
      )}

      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          contact={contact}
          key={key}
          isAdd={isAdd}
        />
      )}
      <div
        className="add"
        onClick={() => {
          setIsOpen(true);
          setIsAdd(true);
          setKey(Math.random().toString());
        }}
      >
        +
      </div>
    </>
  );
};
