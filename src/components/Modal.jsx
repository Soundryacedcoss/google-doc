import { TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { documentContext } from "../App";

export const Modal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const documentArr = useContext(documentContext);
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const contentHandler = (e) => {
    setContent(e.target.value);
  };
  const saveHandler = () => {
    var obj = {
      title: title,
      content: content,
      id: Math.floor(Math.random()*1000),
    };
    data.push(obj);
    setData([...data]);
    localStorage.setItem("Documents", JSON.stringify(data));
    documentArr.setDocumentArr(data);
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
                id="outlined-multiline-flexible"
                label="Title"
                multiline
                maxRows={4}
                onChange={titleHandler}
                fullWidth
              />
              <div className="mt-4">
                <TextField
                  id="outlined-multiline-static"
                  label="Content"
                  multiline
                  rows={4}
                  onChange={contentHandler}
                  fullWidth
                />
              </div>
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
