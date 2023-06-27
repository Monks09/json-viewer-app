import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Viewer from "./Viewer";
import Text from "./Text";
import { useSelector } from "react-redux";

function Content(props) {
  const invalid = useSelector((store) => {
    return store.invalid;
  });

  const checkValid = () => {
    if (invalid) {
      alert("Invalid JSON Variable");
    }
  };
  return (
    <div className="content">
      <Tabs variant="enclosed" defaultIndex={1}>
        <TabList>
          <Tab onClick={checkValid}>Viewer</Tab>
          <Tab>Text</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Viewer />
          </TabPanel>
          <TabPanel>
            <Text />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Content;
