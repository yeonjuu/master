import { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

const ErrorContainer = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

interface ITodo {
  text: string;
  category: "toDo" | "doing" | "done";
  date: Date;
}

interface IForm {
  toDo: string;
  extraError?: string;
}

function ToDoList() {
  const [todo, setTodo] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const onValid = (data: IForm) => {
    if (data.toDo.length < 2) {
      setError("extraError", {
        type: "manual",
        message: "To do must be at least 1 characters long",
      });
    }

    setTodo((prev) => [data.toDo, ...prev]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", {
            required: true,
            validate: {
              notEmpty: (value) => value.trim() !== "",
            }, // trim을 사용하여 공백을 제거한 후 체크
          })}
          placeholder="Write a to do..."
        />
        {errors.toDo && <ErrorContainer>This field is required</ErrorContainer>}
        {errors.extraError && <ErrorContainer>{errors.extraError.message}</ErrorContainer>}
        <button>Add</button>
      </form>
      <hr />
      <h1>To Do List</h1>
      <ul>
        {todo.map((item, index) => (
          <li key={index}>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ToDoList };
