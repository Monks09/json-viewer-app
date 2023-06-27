import React from "react";
import TreeView from "react-treeview";
import "react-treeview/react-treeview.css";

function DataList({ data, label }) {
  function isArray() {
    return data instanceof Object && data instanceof Array;
  }

  if (isArray()) {
    return (
      <TreeView key={label} nodeLabel={`[] ${label}`} defaultCollapsed={true}>
        {data.map((elem, i) => {
          if (typeof elem === "object") {
            return <DataList data={elem} label={i} />;
          } else {
            return <div>{elem}</div>;
          }
        })}
      </TreeView>
    );
  } else {
    return (
      <TreeView key={label} nodeLabel={`{} ${label}`} defaultCollapsed={true}>
        {Object.keys(data).map((key) => {
          if (typeof data[key] === "object") {
            return <DataList data={data[key]} label={key} />;
          } else {
            return (
              <div>
                {key} : {data[key]}
              </div>
            );
          }
        })}
      </TreeView>
    );
  }
}

export default DataList;
