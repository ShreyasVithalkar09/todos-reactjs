import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBBadge,
  MDBTooltip,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBRipple,
  MDBIcon,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import "./App.css";

const getLocalTodos = () => {
  let savedTodos = localStorage.getItem("todosList");

  if (!savedTodos) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("todosList"));
  }
};

const Todo = ({ isDarkMode, setIsDarkMode }) => {
  const [todoData, setTodoData] = useState("");
  const [isImp, setIsImp] = useState(false);

  const [todos, setTodos] = useState(getLocalTodos());

  useEffect(() => {
    localStorage.setItem("todosList", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoData !== "") {
      setTodos([
        ...todos,
        {
          id: new Date().getTime().toString(),
          text: todoData,
          isImp: Boolean(isImp),
        },
      ]);
    }
    setTodoData("");
    setIsImp(false);
  };

  const deleteTodo = (id) => {
    if (confirm("Are you sure you want to delete?")) {
      const updatedTodos = todos.filter((todo) => {
        return todo.id !== id;
      });

      setTodos(updatedTodos);
    }
  };

  const updateTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, isComplete: !todo.isComplete }
        : { ...todo };
    });

    setTodos(updatedTodos);
  };

  return (
    <>
      <div className="container  py-3" style={{ width: "80%" }}>
        <div className="mb-3 d-flex justify-content-between">
          <MDBTypography tag="h3">Todos App</MDBTypography>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between flex-wrap mb-3">
            <div style={{ width: "80%" }}>
              <MDBInput
                className="mb-3 "
                type="text"
                id="form1Example2"
                label="Enter     Todo:"
                name="todoData"
                value={todoData}
                required
                onChange={(e) => setTodoData(e.target.value)}
              />
            </div>

            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Mark as Important"
              onChange={(e) => setIsImp(e.target.checked)}
              checked={isImp}
            />
          </div>

          <MDBBtn type="submit" className="bg-primary bg-gradient text-white">
            Add Todo
          </MDBBtn>
        </form>
      </div>

      <div className="mt-4 mb-2 mx-auto" style={{ width: "80%" }}>
        <hr />
        <MDBTypography tag="h4">Your todos</MDBTypography>

        <section
          className="table-scroll-y my-custom-scrollbar"
          style={{ backgroundColor: "white", overflowX: "auto" }}
        >
          {todos.length > 0 ? (
            <MDBTable hover bordered className="">
              <MDBTableHead className="">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Task</th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              {todos &&
                todos.map((todo, index) => (
                  <>
                    <MDBTableBody key={index}>
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <div className="d-inline-flex">
                            {todo && todo.isComplete ? (
                              <MDBTypography tag="s">
                                {" "}
                                {todo.text}
                              </MDBTypography>
                            ) : (
                              <MDBTypography>{todo.text}</MDBTypography>
                            )}
                            {todo.isImp ? (
                              <span>
                                <MDBTooltip
                                  tag="a"
                                  wrapperProps={{ href: "/" }}
                                  title="Important task"
                                >
                                  <MDBBadge className="ms-2" color="danger">
                                    !
                                  </MDBBadge>
                                </MDBTooltip>
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex justify-cntent-start flex-wrap">
                            <MDBBtn
                              size="sm"
                              color={todo.isComplete ? "dark" : "success"}
                              floating
                              tag="a"
                              className="me-3 mb-2"
                              onClick={() => updateTodo(todo.id)}
                            >
                              <MDBIcon fas icon="check" color="light" />
                            </MDBBtn>

                            <MDBBtn
                              size="sm"
                              color="danger"
                              floating
                              tag="a"
                              className=""
                              onClick={() => deleteTodo(todo.id)}
                            >
                              <MDBIcon fas icon="trash" color="light" />
                            </MDBBtn>
                          </div>
                        </td>
                      </tr>
                    </MDBTableBody>
                  </>
                ))}
            </MDBTable>
          ) : (
            <p> No todos to show, Add one!!!</p>
          )}
        </section>
      </div>
    </>
  );
};

export default Todo;
