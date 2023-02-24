import { TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { documentContext } from "../App";

export const Document = (props) => {
  const titleRef = useRef(null);
  const ContentRef = useRef(null);
  const [data, setData] = useState([]);
  const documentArr = useContext(documentContext);

  useEffect(() => {
    titleRef.current.value = props.title;
    ContentRef.current.value = props.content;
  }, []);
  const titleHandler = (e) => {
    titleRef.current.value = e.target.value;
  };
  const contentHandler = (e) => {
    ContentRef.current.value = e.target.value;
  };
  const EditHandler = (e) => {
    let document = JSON.parse(localStorage.getItem("Documents"));
    console.log(document);
    for (let i = 0; i < documentArr.documentArr.length; i++) {
      if (JSON.parse(e.target.value) === documentArr.documentArr[i].id) {
        var obj = {
          content: ContentRef.current.value,
          title: titleRef.current.value,
          id: documentArr.documentArr[i].id,
        };
        documentArr.documentArr[i] = obj;
        console.log(documentArr.documentArr[i]);
        // data.push(obj);
        setData([...documentArr.documentArr, document[i]]);
        console.log(data);
      }
    }
    localStorage.setItem("Documents", JSON.stringify(data));
  };
  return (
    <div>
      <button
        className="btn btn-info"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${props.id}`}
      >
        {props.title}
      </button>
      <div
        className="modal fade"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        id={`exampleModal${props.id}`}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal titledfghdfhg</h5>
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
                ref={titleRef}
                defaultValue={props.title}
                // value={props.title}
                onChange={titleHandler}
                fullWidth
              />

              <div className="mt-4">
                <TextField
                  id="outlined-multiline-static"
                  label="Content"
                  multiline
                  rows={4}
                  ref={ContentRef}
                  defaultValue={props.content}
                  onChange={contentHandler}
                  fullWidth
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-info"
                onClick={EditHandler}
                value={props.id}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button type="button" className="btn btn-primary">
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
