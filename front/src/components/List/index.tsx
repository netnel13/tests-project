import React from "react";
import Row from "../Row";

export interface List {
  title: string;
  values: string[];
  setValues: React.Dispatch<React.SetStateAction<string[]>>;
  setFavorites?: React.Dispatch<React.SetStateAction<string[]>>;
}

const List = ({ title, values, setValues, setFavorites }: List) => {
  return (
    <div className="mt-4 mx-10">
      <h3>{title}</h3>
      <div className="flex flex-col space-y-2">
        {values.map((value, index) => (
          <Row
            key={index}
            value={value}
            onClick={() => {
              setValues(values.filter((item) => item !== value));
            }}
            setFavorite={
              setFavorites
                ? () => {
                    if (setFavorites) {
                      setFavorites((prev) => [...prev, value]);
                      setValues(values.filter((item) => item !== value));
                    }
                  }
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};

export default List;
