import { useState } from "react";
import { initialFriends } from "./static";

export default function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [friendsList, setFriendsList] = useState(initialFriends);

  function handleShowAddFrom() {
    setShowAddForm((show) => !show);
  }

  function handleAddFriend(newF) {
    setFriendsList((f) => [...f, newF]);
    handleShowAddFrom();
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friendsList} />
        {showAddForm && <AddFriedForm onAddFriend={handleAddFriend} />}
        <Button onButtonClick={handleShowAddFrom}>{showAddForm ? "Close" : "Add Friend"}</Button>
      </div>
      <SplitBillForm />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendCard friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function FriendCard({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name} </h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
}

function Button({ children, onButtonClick }) {
  return (
    <button className="button" onClick={onButtonClick}>
      {children}
    </button>
  );
}

function AddFriedForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleOnSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = { name, image: `${image}?=${id}`, balance: 0, id };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleOnSubmit}>
      <label>Friend Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

      <label>Image Url</label>
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  );
}

function SplitBillForm() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with</h2>

      <label>Bill Value</label>
      <input type="text" />

      <label>Your Expenses</label>
      <input type="text" />

      <label>'s expense</label>
      <input type="text" disabled />

      <label>Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend"></option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
