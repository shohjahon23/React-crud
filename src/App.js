import React, { useState, useRef } from "react";
import "./App.css";

function App() {
  let [email, setEmail] = useState("efe");
  let [password, setPassword] = useState("");
  let [data, setData] = useState([]);

  let watchUpdate = 0;

  email = useRef();
  password = useRef();

  const addUser = (e) => {
    e.preventDefault();

    if (email.current.value === "" && password.current.value === "") {
      alert("Iltimos inputlarni to`ldiring!");
      return;
    }

    if (watchUpdate !== 0) {
      let findData = data.find((user) => user.id == watchUpdate);
      findData.email = email.current.value;
      findData.password = password.current.value;

      setData([...data]);
    }
    if (watchUpdate === 0) {
      let newUser = {
        id: data.length + 1,
        email: email.current.value,
        password: password.current.value,
      };

      data.push(newUser);
      setData([...data]);
      email.current.value = "";
      password.current.value = "";
    }
  };
  const deleteData = (id) => {
    data = data.filter((user) => user.id !== id);
    setData([...data]);
  };

  const updateData = (id) => {
    const findData = data.find((user) => user.id == id);
    email.current.value = findData.email;
    password.current.value = findData.password;
    watchUpdate = findData.id;
  };

  return (
    <div className="container">
      <div className="row">
        <form className="col-md-6 mt-2" onSubmit={addUser}>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              ref={email}
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              ref={password}
              type="password"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="name"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
        <div className="col-md-6 mt-2">
          <h3>
            {data.length == 0
              ? "Hozircha userlar yoq!"
              : "Umumiy userlar soni:" + data.length}
          </h3>
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">#Id:</th>
                <th scope="col">Email</th>
                <th scope="col">Password</th>
                <th scope="col">Update</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => updateData(user.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
