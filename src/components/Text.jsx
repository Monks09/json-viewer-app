import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function Text(props) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const textRef = useRef(null);
  const urlRef = useRef(null);

  function fixUnquotedJSON(unquotedJSON) {
    // Use regular expressions to add quotes to unquoted keys
    const fixedJSON = unquotedJSON.replace(
      /([{,])(\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g,
      '$1"$3":'
    );
    return fixedJSON;
  }

  const handleChange = () => {
    try {
      const fixedText = fixUnquotedJSON(textRef.current.value);
      const text = JSON.parse(fixedText);
      console.log(text);
      dispatch({
        type: "UPDATE_JSON_DATA",
        payload: text,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SET_INVALID_TRUE",
      });
    }
  };

  const isValidJson = (data) => {
    try {
      JSON.parse(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const copyText = () => {
    const text = textRef.current;
    text.select();
    navigator.clipboard.writeText(text.value);
    alert("Text Copied");
  };

  const pasteText = async () => {
    await navigator.clipboard.readText().then((clipText) => {
      textRef.current.value += clipText;
    });
    handleChange();
  };

  const clearText = () => {
    textRef.current.value = "";
    handleChange();
  };

  const formatText = () => {
    const textArea = textRef.current;
    textArea.value = fixUnquotedJSON(textArea.value);
    if (!isValidJson(textArea.value)) {
      alert("Invalid JSON Variable, Unable to format");
      return;
    }
    var formattedText = JSON.stringify(JSON.parse(textArea.value), null, 2);
    textArea.value = formattedText;
  };

  const removeWhiteSpaces = () => {
    const textArea = textRef.current;
    textArea.value = fixUnquotedJSON(textArea.value);
    if (!isValidJson(textArea.value)) {
      alert("Invalid JSON Variable, Unable to format");
      return;
    }
    var formattedText = JSON.stringify(JSON.parse(textArea.value), null, 0);
    textArea.value = formattedText;
  };

  const loadJSONData = async () => {
    const urlInput = urlRef.current.value;

    try {
      let res = await fetch(urlInput);
      let data = await res.json();
      textRef.current.value = JSON.stringify(data);
      handleChange();
      onClose();
    } catch (err) {
      alert("Invalid url provided");
    }
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
        <Button variant={"ghost"} size={"xs"} onClick={formatText}>
          Format
        </Button>
        <Button variant={"ghost"} size={"xs"} onClick={removeWhiteSpaces}>
          Remove white space
        </Button>
        <Button variant={"ghost"} size={"xs"} onClick={clearText}>
          Clear
        </Button>
        <Button variant={"ghost"} size={"xs"} onClick={onOpen}>
          Load JSON data
        </Button>
      </div>
      <div className="json-text">
        <textarea
          ref={textRef}
          name="json-textarea"
          id="json-textarea"
          cols="30"
          rows="17"
          placeholder="Paste the JSON code here"
          onChange={handleChange}
        ></textarea>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Online JSON Viewer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="url-input-div">
              <label htmlFor="url">Url:</label>
              <input ref={urlRef} type="text" name="url" id="url" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="solid"
              margin={"auto"}
              bgColor={"blue.400"}
              color={"white"}
              onClick={loadJSONData}
            >
              Load JSON Data
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Text;
