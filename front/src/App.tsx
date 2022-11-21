import React, { useEffect, useState } from "react";
import Button from "./components/Button/button";
import Input from "./components/Input/Input";
import List from "./components/List";

function App() {
  const [value, setValue] = useState<string>("");
  const [values, setValues] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  return (
    <div>
      <div className="flex justify-center space-x-5 mt-3">
        <Input
          value={value}
          setValue={setValue}
          label="input"
          placeholder="placeholder"
        />
        <Button
          text="Add"
          onClick={() => {
            setValues([...values, value]);
            setValue("");
          }}
        />
      </div>
      <div className="flex flex-col">
        <List
          title="todos"
          values={values}
          setValues={setValues}
          setFavorites={setFavorites}
        />
        <List title="favorites" values={favorites} setValues={setFavorites} />
      </div>
    </div>
  );
}

export default App;
