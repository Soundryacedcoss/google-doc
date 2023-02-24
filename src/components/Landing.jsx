import React, { useContext, useEffect, useState } from "react";
import { Document } from "./Document";
import { documentContext } from "../App";
import "./Landing.css";
export const Landing = () => {
  const [document, setDocuments] = useState([]);
  const documentArr = useContext(documentContext);
  const [title, setTitle] = useState("");
  console.log(documentArr);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("Documents") !== null)) {
      setDocuments(JSON.parse(localStorage.getItem("Documents")));
    }
  }, []);
  const ClickHandler = (e) => {
    documentArr.documentArr.forEach((element) => {
      console.log(typeof JSON.stringify(e), typeof JSON.stringify(element.id));
     

      if (JSON.stringify(element.id) === JSON.stringify(e)) {
        console.log("dhd");
        setTitle(element.title);
      }
    });
  };
  console.log("tiitle", title);
  return (
    <div>
      <h2>Docs Clone</h2>
      <button
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add a document
      </button>
      <hr />
      {JSON.parse(localStorage.getItem("Documents"))!==null 
      ?  documentArr.documentArr.map((val) => (
            <div className="document_card mt-3">
              <Document content={val.content} title={val.title} id={val.id} />
            </div>
          ))
      :""}
    </div>
  );
};
