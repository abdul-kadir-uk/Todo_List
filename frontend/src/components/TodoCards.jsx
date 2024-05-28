// TodoCard.jsx

import React from 'react'
import { MdDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";


const TodoCards = ({ title, body, id, delid, display, update_id, tobe_update }) => {

  return (
    <>
      <div className="Todo-card my-3">
        <h2 className='todo-head'>{title}</h2>
        <p>{body}</p>
        <div className="update-delete d-flex">

          <div className="col-6 d-flex justify-content-center align-items-center delete bg-light icons border"
            onClick={() => {
              delid(id);
            }}
          >
            {/* // <!-- Your first item goes here --> */}
            <div className="d-flex justify-content-center align-items-center delete text-danger"> Delete
              <MdDelete className='delete col-lg-6' />

            </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center update bg-light icons border"
            onClick={() => {
              display('block');
              tobe_update(update_id);
            }}
          >
            {/* <!-- Your second item goes here --> */}
            <div className="d-flex justify-content-center align-items-center update text-primary"
            > Update
              <MdEditNote className='update col-lg-6' />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default TodoCards;