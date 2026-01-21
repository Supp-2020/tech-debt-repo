import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import uuid from "uuid/v4";

function Home() {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log("API Error:", err?.message || err));
  }, []);

  return (
    <div>
      <h2>Home</h2>

      <button
        onClick={() => {
          alert("Session id: " + uuid());
        }}
      >
        Generate Session ID
      </button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name}{" "}
            <button onClick={() => history.push(`/user/${u.id}`)}>View</button>
          </li>
        ))}
      </ul>

      <Link to="/about">About</Link>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <Link to="/">Back</Link>
    </div>
  );
}

function UserDetails({ match }) {
  return (
    <div>
      <h2>User Details</h2>
      <p>User ID: {match.params.id}</p>
      <Link to="/">Back</Link>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/user/:id" component={UserDetails} />
      </Switch>
    </Router>
  );
}
