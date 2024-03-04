import React from "react";
import style from "./Note.module.css";

export default function Note() {
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">Title</h2>
          <p className={`mb-0 mt-2`}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis, officia.
          </p>
        </div>

        <div className="note-footer">
          <i className="fa-solid fa-pen-to-square pointer me-2"></i>

          <i className="bi bi-archive-fill pointer"></i>
        </div>
      </div>
    </>
  );
}
