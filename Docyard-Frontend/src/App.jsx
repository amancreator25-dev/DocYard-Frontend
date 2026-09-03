import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <h1>DocYard</h1>
            <p>Document management platform</p>
          </div>
        }
      />
    </Routes>
  );
}

export default App;