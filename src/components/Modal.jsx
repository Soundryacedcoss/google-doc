import { TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { documentContext } from "../App";

export const Modal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");
  const documentArr = useContext(documentContext);
  useEffect(() => {
    // taking data from local storage
    if (JSON.parse(localStorage.getItem("Documents") !== null)) {
      documentArr.setDocumentArr(JSON.parse(localStorage.getItem("Documents")));
    }
  }, [documentArr]);
  // title handler
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  // content handler
  const contentHandler = (e) => {
    setContent(e.target.value);
  };
  // Save document button functinality
  const saveHandler = () => {
    // validation
    let data = [];
    if (title === "") {
      msg("Plese write title ");
    } else if (content === "") {
      setMsg("Please write content");
    } else {
      var obj = {
        title: title,
        content: content,
        id: Math.floor(Math.random() * 1000),
      };
      if (JSON.parse(localStorage.getItem("Documents") !== null)) {
        data = JSON.parse(localStorage.getItem("Documents"));
      }
      data.push(obj);
      setMsg("Document created !");
      setTitle("");
      setContent("");
      localStorage.setItem("Documents", JSON.stringify(data));
      documentArr.setDocumentArr(data);
    }
  };
  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <TextField
                id="outlined-multiline-flexible title"
                label="Title"
                multiline
                value={title}
                maxRows={4}
                onChange={titleHandler}
                fullWidth
              />
              <div className="mt-4">
                <TextField
                  id="outlined-multiline-static"
                  label="Content"
                  value={content}
                  multiline
                  rows={4}
                  onChange={contentHandler}
                  fullWidth
                />
              </div>
              {msg === "" ? (
                ""
              ) : (
                <div class="alert alert-info" role="alert">
                  {msg}
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    style={{ float: "right" }}
                  ></button>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveHandler}
              >
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
