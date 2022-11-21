import React from "react";
import Button from "../Button/button";

export interface Row {
  value: string;
  onClick: () => void;
  setFavorite?: () => void;
}

const Row = ({ value, onClick, setFavorite }: Row) => {
  return (
    <div className="m-auto space-x-2">
      <span>{value}</span>
      <Button text="remove" onClick={onClick} />
      {setFavorite && <Button text="favorite" onClick={setFavorite} />}
    </div>
  );
};

export default Row;
