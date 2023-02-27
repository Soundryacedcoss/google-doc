import { TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { documentContext } from "../App";

export const Document = (props) => {
  // ref for titile box
  const titleRef = useRef(null);
  // ref for content box
  const ContentRef = useRef(null);
  // state for massage
  const [msg, setmsg] = useState("");
  // state for title box
  const [title, setTitle] = useState("");
  const [document1, setDocuments1] = useState([]);
  // fetching documemt array from context
  const documentArr = useContext(documentContext);
  useEffect(() => {
    // fetching array from local storage
    if (JSON.parse(localStorage.getItem("Documents") !== null)) {
      setDocuments1(JSON.parse(localStorage.getItem("Documents")));
    }
    document1.forEach((element) => {
      if (element.id === props.id) {
        setTitle(element.title);
      }
    });
  }, [documentArr, document1.length]);
  useEffect(() => {
    titleRef.current.value = props.title;
    ContentRef.current.value = props.content;
  }, []);
  // title handler
  const titleHandler = (e) => {
    titleRef.current.value = e.target.value;
  };
  // content handler
  const contentHandler = (e) => {
    ContentRef.current.value = e.target.value;
  };
  // Edit button functinality
  const EditHandler = (e) => {
    // validation
    if (titleRef.current.value === "") {
      msg("Please write title");
      titleRef.current.focus();
    } else if (ContentRef.current.value === "") {
     msg("Please write some content");
      ContentRef.current.focus();
    } else {
      // editing document
      for (let i = 0; i < documentArr.documentArr.length; i++) {
        if (JSON.parse(e.target.value) === documentArr.documentArr[i].id) {
          documentArr.documentArr[i].content = ContentRef.current.value;
          documentArr.documentArr[i].title = titleRef.current.value;
          setTitle(titleRef.current.value);
          documentArr.setDocumentArr(documentArr.documentArr);
          setmsg("Edited sucessfully");
        }
        documentArr.setDocumentArr(documentArr.documentArr);
      }
    }
    // after editing again storimg data in local storage
    localStorage.setItem("Documents", JSON.stringify(documentArr.documentArr));
    setDocuments1(JSON.parse(localStorage.getItem("Documents")));
  };
  return (
    <div>
      <button
        className="btn btn-info w-50"
        data-bs-toggle="modal"
        data-bs-target={`#exampleModal${props.id}`}
      >
        {title}
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
