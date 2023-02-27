import React, { useContext, useEffect, useState } from "react";
import { Document } from "./Document";
import { documentContext } from "../App";
import "./Landing.css";
export const Landing = () => {
  const [document, setDocuments] = useState([]);
  const documentArr = useContext(documentContext);
  const [emptyMsg, setEmptyMsg] = useState("");
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Documents") !== null)) {
      setDocuments(JSON.parse(localStorage.getItem("Documents")));
    }
  }, [documentArr]);
  useEffect(() => {
    // empty msg
    setEmptyMsg("There is no document available please create");
  }, []);
  // delete functionality
  const DeleteHandler = (e) => {
    for (let i = 0; i < document.length; i++) {
      if (document[i].id === e) {
        documentArr.documentArr.splice(i, 1);
      }
    }
    documentArr.setDocumentArr([...documentArr.documentArr]);
    localStorage.setItem("Documents", JSON.stringify(documentArr.documentArr));
  };
  return (
    <div className="App">
      <h2>Docs Clone</h2>
      <button
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add a document
      </button>
      <hr />
      {document.length === 0 ? <p className="Empty">{emptyMsg}</p> : ""}
      <div className="Document_container">
        {document.map((val) => (
          <div className="document_card mt-3 p-3 w-25">
            <Document content={val.content} title={val.title} id={val.id} />
            <i
              class="fas fa-trash-alt"
              style={{ fontSize: "30px", color: "red", marginTop: "4%" }}
              value={val.id}
              onClick={() => DeleteHandler(val.id)}
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
};
