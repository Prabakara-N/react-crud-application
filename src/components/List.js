import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, deleteItem, editItem }) => {
  return (
    <div>
      {items.map((item) => {
        const { id, title, quantity } = item;
        return (
          <div className="list-items" key={id}>
            <div className="items">
              <p className="itemname">
                {title} <span>- {quantity}</span>
              </p>
            </div>
            <div className="btn-container">
              <FaEdit className="edit-btn" onClick={() => editItem(id)} />
              <FaTrash className="delete-btn" onClick={() => deleteItem(id)} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
