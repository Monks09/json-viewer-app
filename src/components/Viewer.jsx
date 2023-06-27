import React from "react";
import { useSelector } from "react-redux";
import DataList from "./DataList";

function Viewer(props) {
  const jsonData = useSelector((store) => {
    return store.jsonData;
  });

  return (
    <div className="viewer-tab">
      <div className="tree-section">
        {jsonData && <DataList data={jsonData} label="JSON" />}
      </div>
      <div className="data-section">Data Section</div>
    </div>
  );
}

export default Viewer;
