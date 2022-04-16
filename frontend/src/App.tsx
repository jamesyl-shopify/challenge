import { useEffect, useState } from "react";
import {
  deleteItem,
  getItems,
  postItem,
  putItem,
  ResponseItem,
} from "./services/service";

const App = () => {
  const [items, setItems] = useState<ResponseItem[]>([]);
  const [submitItem, setSubmitItem] = useState({
    name: "",
    desc: "",
    currLocation: "",
    totalItems: "",
  });
  const [updateItem, setUpdateItem] = useState({
    name: "",
    desc: "",
    currLocation: "",
    totalItems: "",
    id: "",
  });
  useEffect(() => {
    getItems().then((res) => {
      setItems(res);
    });
  }, []);
  const delItem = (id: string) => () => {
    deleteItem(id);
    setItems(items.filter((item) => item.id !== id));
  };
  const addItem = () => {
    let totalItems = parseInt(submitItem.totalItems);
    if (!(totalItems > 0)) totalItems = 1;
    postItem({ ...submitItem, totalItems }).then((res) => {
      setItems([...items, res]);
    });
  };
  const update =
    (
      id: string,
      name: string,
      desc: string | undefined,
      currLocation: string,
      totalItems: number
    ) =>
    () => {
      setUpdateItem({
        id,
        name,
        desc: desc ? desc : "",
        currLocation,
        totalItems: `${totalItems}`,
      });
    };
  const onUpdateItem = () => {
    let totalItems = parseInt(updateItem.totalItems);
    if (!(totalItems > 0)) totalItems = 1;
    const res = { ...updateItem, totalItems, id: undefined };
    putItem(res, updateItem.id)
      .then(() => {
        getItems().then((data) => setItems(data));
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      List of items:
      {items.map(({ id, name, desc, currLocation, totalItems }) => (
        <div key={id}>
          <div>
            ID: {id}, Name: {name}, {desc ? `Description: ${desc}, ` : ""}
            Location: {currLocation}, Total items: {totalItems}
          </div>
          <button onClick={delItem(id)}> Delete</button>
          <button onClick={update(id, name, desc, currLocation, totalItems)}>
            Update
          </button>
        </div>
      ))}
      <br />
      <br />
      <div>
        Add items:
        <br />
        <label htmlFor="name">Item name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={submitItem["name"]}
          onChange={(e) => {
            setSubmitItem({ ...submitItem, name: e.target.value });
          }}
        />
        <br />
        <label htmlFor="desc">Item Description:</label>
        <input
          type="text"
          id="desc"
          name="desc"
          value={submitItem["desc"]}
          onChange={(e) => {
            setSubmitItem({ ...submitItem, desc: e.target.value });
          }}
        />
        <br />
        <label htmlFor="loc">Item Location:</label>
        <input
          type="text"
          id="loc"
          name="loc"
          value={submitItem["currLocation"]}
          onChange={(e) => {
            setSubmitItem({
              ...submitItem,
              currLocation: e.target.value,
            });
          }}
        />
        <br />
        <label htmlFor="tot">Total Items:</label>
        <input
          type="text"
          min={1}
          id="tot"
          name="tot"
          value={submitItem["totalItems"]}
          onChange={(e) => {
            setSubmitItem({
              ...submitItem,
              totalItems: e.target.value,
            });
          }}
        />
        <br />
        <button onClick={addItem}>Submit</button>
      </div>
      {updateItem.id && (
        <div>
          <br />
          <label htmlFor="id">Item ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={updateItem["id"]}
            disabled
          />
          <br />
          <label htmlFor="name">Item name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updateItem["name"]}
            onChange={(e) => {
              setUpdateItem({ ...updateItem, name: e.target.value });
            }}
          />
          <br />
          <label htmlFor="desc">Item Description:</label>
          <input
            type="text"
            id="desc"
            name="desc"
            value={updateItem["desc"]}
            onChange={(e) => {
              setUpdateItem({ ...updateItem, desc: e.target.value });
            }}
          />
          <br />
          <label htmlFor="loc">Item Location:</label>
          <input
            type="text"
            id="loc"
            name="loc"
            value={updateItem["currLocation"]}
            onChange={(e) => {
              setUpdateItem({
                ...updateItem,
                currLocation: e.target.value,
              });
            }}
          />
          <br />
          <label htmlFor="tot">Total Items:</label>
          <input
            type="text"
            min={1}
            id="tot"
            name="tot"
            value={updateItem["totalItems"]}
            onChange={(e) => {
              setUpdateItem({
                ...updateItem,
                totalItems: e.target.value,
              });
            }}
          />
          <br />
          <button onClick={onUpdateItem}>Update</button>
          <button
            onClick={() => {
              setUpdateItem({ ...updateItem, id: "" });
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
export default App;
