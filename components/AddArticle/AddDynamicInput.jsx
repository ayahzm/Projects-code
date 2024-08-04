import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function AddDynamicInput(){
    const [val, setVal] = useState([]);

    const handleAdd = () => {
      const abc = [...val, ""];
      setVal(abc);
    };
  
    const handleChange = (onChangeValue, i) => {
      const inputdata = [...val];
      inputdata[i] = onChangeValue.target.value;
      setVal(inputdata);
    };
  
    const handleDelete = (i) => {
      const deletVal = [...val];
      deletVal.splice(i, 1);
      setVal(deletVal);
    };

    return(
        <>
      <Button sx={{ backgroundColor: "#005077", color: "white", fontSize: 20, bottom: -9, height: "55px", "&:hover": { backgroundColor: "white", color: "#005077"}}}onClick={handleAdd}>+</Button>
     {val.map((data, i) => (
        <div key={i}>
          <TextField
            value={data}
            onChange={(e) => handleChange(e, i)}
            id="outlined-multiline-flexible"
            label="Author"
            multiline
            maxRows={4}
            margin="dense"
          />
          <Button sx={{ backgroundColor: "#005077", color: "white", bottom: -9, height: "55px", "&:hover": { backgroundColor: "white", color: "#005077"} }} onClick={() => handleDelete(i)}>x</Button>
        </div>
      ))}
        </>
    );
}
export default AddDynamicInput;