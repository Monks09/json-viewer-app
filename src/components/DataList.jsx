import React from "react";
import { useDispatch } from "react-redux";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";

function DataList({ data, label }) {
  const dispatch = useDispatch();

  function isArray() {
    return data instanceof Object && data instanceof Array;
  }

  const labelSpan = (
    <span className="label">{isArray() ? `[] ${label}` : `{} ${label}`}</span>
  );

  const updateSelectedObject = () => {
    // console.log("Clicked");
    dispatch({
      type: "UPDATE_SELECTED_OBJECT",
      payload: data,
    });
  };

  if (isArray()) {
    return (
      <TreeView
        key={label}
        nodeLabel={labelSpan}
        defaultCollapsed={true}
        onClick={updateSelectedObject}
      >
        {data.map((elem, i) => {
          if (typeof elem === "object") {
            return <DataList key={i} data={elem} label={i} />;
          } else {
            return <div key={i}>{elem}</div>;
          }
        })}
      </TreeView>
    );
  } else {
    return (
      <TreeView
        key={label}
        nodeLabel={labelSpan}
        defaultCollapsed={true}
        onClick={updateSelectedObject}
      >
        {Object.keys(data).map((key) => {
          if (typeof data[key] === "object") {
            return <DataList key={key} data={data[key]} label={key} />;
          } else {
            return (
              <div key={key}>
                <b>{key}</b> : {data[key]}
              </div>
            );
          }
        })}
      </TreeView>
    );
  }
}

export default DataList;
