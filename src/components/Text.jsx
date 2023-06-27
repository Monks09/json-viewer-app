import React from "react";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

function Text(props) {
  const dispatch = useDispatch();

  const handleChange = () => {
    try {
      const text = JSON.parse(document.getElementById("json-textarea").value);
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

  const copyText = () => {
    const text = document.getElementById("json-textarea");
    text.select();
    navigator.clipboard.writeText(text.value);
    alert("Text Copied");
  };

  const pasteText = async () => {
    await navigator.clipboard.readText().then((clipText) => {
      document.getElementById("json-textarea").value += clipText;
    });
    handleChange();
  };

  const clearText = () => {
    document.getElementById("json-textarea").value = "";
    handleChange();
  };

  return (
    <div className="text-tab">
      <div className="buttons">
        <Button variant={"ghost"} size={"xs"} onClick={pasteText}>
          Paste
        </Button>
        <Button variant={"ghost"} size={"xs"} onClick={copyText}>
          Copy
        </Button>
        <Button variant={"ghost"} size={"xs"}>
          Format
        </Button>
        <Button variant={"ghost"} size={"xs"}>
          Remove white space
        </Button>
        <Button variant={"ghost"} size={"xs"} onClick={clearText}>
          Clear
        </Button>
        <Button variant={"ghost"} size={"xs"}>
          Load JSON data
        </Button>
      </div>
      <div className="json-text">
        <textarea
          name="json-textarea"
          id="json-textarea"
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
