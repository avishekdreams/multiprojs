import { useRef, useState } from "react";
import "./../../style/travel.css";

export default function TravelList() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  }

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  const handleToggleItem = (id) => {
    setItems((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item));
  }

  const handleClearList = () => {
    const confirmed = window.confirm("Are you sure you want to delete all items?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return <h1>FAR AWAY</h1>
}

function Form({ onAddItems }) {
  const quantity = useRef("");
  const description = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.current.value === "" || quantity.current.value === "") {
      alert("Please fill the details")
      return;
    }

    const newItem = {
      id: Date.now(),
      description: description.current.value,
      quantity: quantity.current.value,
      packed: false,
    }
    onAddItems(newItem);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Things you need for your trip?</h3>
      <input type="number" id="quantity" ref={quantity} />
      <input type="text" placeholder="Item..." id="description" ref={description} />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems && sortedItems.map((itm) => (
          <Item key={itm.id} item={itm} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description of the item</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="footer">
        <em>Start adding some items to your packing list ... 🚀</em>
      </p>
    )
  }
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = (numPacked / numItems) * 100;
  return (
    <footer>
      <em>
        {percentage === 100 ? "You got everything ready to go...✈" : `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage})`}
      </em>
    </footer>
  );
}
