import React from "react";
import { useSelector } from "react-redux";
import DataList from "./DataList";

function Viewer(props) {
  const jsonData = useSelector((store) => {
    return store.jsonData;
  });

  const selectedObject = useSelector((store) => {
    return store.selectedObject;
  });

  const isArray = (data) => {
    return data instanceof Object && data instanceof Array;
  };

  const trimmedString = (str) => {
    if (str.length <= 25) {
      return str;
    }

    const trimmedStr = str.substring(0, 26) + "...";
    return trimmedStr;
  };

  return (
    <div className="viewer-tab">
      <div className="tree-section">
        {jsonData && <DataList data={jsonData} label="JSON" />}
      </div>
      <div className="data-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {isArray(selectedObject)
              ? selectedObject.map((el, i) => {
                  return (
                    <tr key={i}>
                      <td>{i}</td>
                      <td>...</td>
                    </tr>
                  );
                })
              : Object.keys(selectedObject).map((key, i) => {
                  return (
                    <tr key={i}>
                      <td>{key}</td>
                      <td>
                        {typeof selectedObject[key] === "object"
                          ? "..."
                          : typeof selectedObject[key] === "string"
                          ? trimmedString(selectedObject[key])
                          : selectedObject[key]}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Viewer;
