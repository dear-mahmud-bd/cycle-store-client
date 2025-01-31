import "./App.css";
import { decrement, increment } from "./redux/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  console.log(count);

  return (
    <>
      <div className="card">
        <button onClick={() => dispatch(increment())}>increment </button>
        <p>{count}</p>
        <button onClick={() => dispatch(decrement())}>decrement </button>
      </div>
    </>
  );
}

export default App;
