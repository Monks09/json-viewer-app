import React from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

function Text(props) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    try {
      const text = JSON.parse(e.target.value);
      dispatch({
        type: "UPDATE_JSON_DATA",
        payload: text,
      });
    } catch (err) {
      //   console.log(err);
      dispatch({
        type: "SET_INVALID_TRUE",
      });
    }
  };
  return (
    <div className="text-tab">
      <div className="buttons">
        <Button variant={"ghost"} size={"xs"}>
          Paste
        </Button>
        <Button variant={"ghost"} size={"xs"}>
          Copy
        </Button>
        <Button variant={"ghost"} size={"xs"}>
          Format
        </Button>
        <Button variant={"ghost"} size={"xs"}>
          Remove white space
        </Button>
        <Button variant={"ghost"} size={"xs"}>
          Clear
        </Button>
        <Button variant={"ghost"} size={"xs"}>
          Load JSON data
        </Button>
      </div>
      <div className="json-text">
        <textarea
          name=""
          id=""
          cols="30"
          rows="17"
          placeholder="Paste the JSON code here"
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
}

export default Text;
