import React, { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/normalize.css";
import List from "./components/List";
import Alert from "./components/Alert";
import { v4 as uuidv4 } from "uuid";

// local storage validation
// const getLocalstorage = () => {
//   let list = localStorage.getItem("items");
//   if (list) {
//     return (list = JSON.parse(localStorage.getItem("item")));
//   } else {
//     return [];
//   }
// };
// setList(getLocalstorage())

// localstorage validation in terinary operator
let items = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

const App = () => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [list, setList] = useState(items);
  const [isEditing, setisEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [alertMsg, setAlertMsg] = useState({
    show: false,
    type: "",
    msg: "",
  });

  // calling local storage whenever list changes
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(list));
  }, [list]);

  // delete item
  const deleteItem = (id) => {
    const filteredItem = list.filter((item) => item.id !== id);
    setList(filteredItem);
    setAlertMsg({
      show: true,
      msg: "Item Deleted !",
      type: "deleted",
    });
  };

  // clear Item
  const clearItems = () => {
    setList([]);
    setAlertMsg({
      show: true,
      msg: "Items Cleared !",
      type: "clear",
    });
  };

  // edit item
  const editItem = (id) => {
    const itemToEdit = list.find((item) => item.id === id);
    setisEditing(true);
    setEditId(id);
    setItemName(itemToEdit.title);
    setQuantity(itemToEdit.quantity);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!itemName || !quantity) {
      setAlertMsg({
        show: true,
        msg: "Please Enter A Value !",
        type: "danger",
      });
    } else if (itemName && quantity && isEditing) {
      const editList = list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: itemName, quantity: quantity };
        } else {
          return item;
        }
      });
      setList(editList);
      setAlertMsg({
        show: true,
        msg: "Item Edited Successfully !",
        type: "edited",
      });
      setItemName("");
      setQuantity("");
      setisEditing(false);
      setEditId("");
    } else {
      const newItem = { id: uuidv4(), title: itemName, quantity: quantity };
      setList([...list, newItem]);
      setItemName("");
      setQuantity("");
      setAlertMsg({
        show: true,
        msg: "Item Added Successfully !",
        type: "success",
      });
    }
  };

  return (
    <>
      <main>
        <div className="title">
          <h1> 5 Star Hotel 🍕</h1>
        </div>

        <div className="alert-set">
          {alertMsg.show && <Alert {...alertMsg} showAlert={setAlertMsg} />}
        </div>

        <form onSubmit={submitHandler}>
          <div className="form-control">
            <input
              type="text"
              value={itemName}
              placeholder="I like to Eat...😋"
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="number"
              value={quantity}
              placeholder="No of Quantity...⁉"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="btn">
              <button type="submit">{isEditing ? "Update" : "Enter"}</button>
            </div>
          </div>
        </form>

        {list.length > 0 && (
          <div className="list-container">
            <div className="order">
              <p>Your Orders:</p>
            </div>

            <List items={list} deleteItem={deleteItem} editItem={editItem} />
            <div className="btn">
              <button id="clr" type="button" onClick={clearItems}>
                Clear All
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
