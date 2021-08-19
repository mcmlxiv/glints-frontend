import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { TextField } from "@material-ui/core";

const Cross = (props) => {
  return (
    <div
      onClick={() => {
        props.onClose();
      }}
      className={"self-end  p-3 transform-translate-y-5 cursor-pointer"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        display="block"
        id="Cross"
      >
        <path d="M20 20L4 4m16 0L4 20" />
      </svg>
    </div>
  );
};
const WorkModal = (props) => {
  const companyInputRef = useRef(null);
  const titleInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  let startDate;
  let endDate;

  const submitHandler = () => {
    console.log(
      companyInputRef.current.value,
      titleInputRef.current.value,
      startDate,
      endDate,
      descriptionInputRef.current.value
    );
    props.onAddJob(
      companyInputRef.current.value,
      titleInputRef.current.value,
      startDate,
      endDate,
      descriptionInputRef.current.value
    );
  };
  const updateHandler = () => {
    props.onUpdateJob(
      props.id,
      companyInputRef.current.value,
      titleInputRef.current.value,
      startDate,
      endDate,
      descriptionInputRef.current.value
    );
  };
  const deleteHandler = () => {
    props.onDeleteJob(props.id);
  };

  const [showDate, setShowDate] = useState(true);
  const handleChange = () => {
    setShowDate(!showDate);
  };
  if (!showDate) endDate = "Now";

  const closeOnEscapeKey = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  });

  if (!props.showIn) return null;

  return ReactDOM.createPortal(
    <>
      <div className={"fixed bg-black opacity-50 w-screen h-full z-20"} />
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed py-4 lg:py-8  pb-12 px-2 lg:px-12 bg-white rounded-2xl shadow-xl z-20 transform translate-y-20"
      >
        <div className={"flex flex-col justify-center items-center"}>
          <Cross onClose={props.onClose} />
          <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
            {props.title}
          </h1>
          <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
            {props.message}
          </p>
        </div>
        <div className="space-y-4">
          <input
            ref={companyInputRef}
            type="text"
            defaultValue={props.company}
            placeholder={props.company || "Company"}
            className="block text-sm py-3 px-4 rounded-lg w-full border focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
          <input
            ref={titleInputRef}
            type="text"
            defaultValue={props.jobTitle}
            placeholder={props.jobTitle || "Job Title"}
            className="block text-sm py-3 px-4 rounded-lg w-full border focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          />
          <div className={"flex items-center"}>
            <input
              onChange={handleChange}
              type="checkbox"
              className={
                "form-checkbox h-5 w-5 text-gray-600 focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              }
            />
            <label className="ml-2 text-gray-700">I currently work here</label>
          </div>
          <div className={"flex space-x-4"}>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              format="DD/MM/YYYY"
              defaultValue={props.startDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                startDate = event.target.value;
              }}
            />

            {showDate && (
              <TextField
                id="date"
                label="End Date"
                type="date"
                format="DD/MM/YYYY"
                defaultValue={props.endDate}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  endDate = event.target.value;
                }}
              />
            )}
          </div>
          <div className="mb-6">
            <textarea
              ref={descriptionInputRef}
              rows={5}
              name="message"
              id="message"
              defaultValue={props.jobDescription}
              placeholder={props.jobDescription || "Job Description"}
              className="block text-sm w-full px-3 py-2  border  rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              required
            />
          </div>
        </div>
        <div className="text-center mt-6">
          {!props.update && (
            <button
              onClick={() => {
                props.onClose();
                submitHandler();
              }}
              className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
            >
              {props.buttonText}
            </button>
          )}
          {props.update && (
            <div className={"flex items-center justify-between space-x-1"}>
              <button
                onClick={() => {
                  props.onClose();
                  deleteHandler();
                }}
                className="p-2  rounded-xl text-sm md:text-base hover:border-red-400"
              >
                Delete 🗑️
              </button>
              <button
                onClick={() => {
                  props.onClose();
                  updateHandler();
                }}
                className="p-2 border border-2 border-blue-400 rounded-xl text-sm md:text-base     hover:border-green-400"
              >
                Update ✨
              </button>
            </div>
          )}
        </div>
      </div>
    </>,
    document.getElementById("app-root")
  );
};

export default WorkModal;
