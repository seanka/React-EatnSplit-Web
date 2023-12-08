import { useState } from "react";
import { initialFriends } from "./static";

export default function App() {
  const [showAddForm, setShowAddForm] = useState(false);

  function handleShowAddFrom() {
    setShowAddForm((show) => !show);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddForm && <AddFriedForm />}
        <Button handleOnClick={handleShowAddFrom}>{showAddForm ? "Close" : "Add Friend"}</Button>
      </div>
      <SplitBillForm />
    </div>
  );
}

function FriendsList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
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

function Button({ children, handleOnClick }) {
  return (
    <button className="button" onClick={handleOnClick}>
      {children}
    </button>
  );
}

function AddFriedForm() {
  return (
    <form className="form-add-friend">
      <label>Friend Name</label>
      <input type="text" />

      <label>Image Url</label>
      <input type="text" />

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
