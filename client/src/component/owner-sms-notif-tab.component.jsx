import { TabList, Tabs, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

export const SMSNotificationTabs = ({ data }) => {
    return (
      <Tabs>
        <TabList>
          {data?.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data?.map((tab, index) => (
            <TabPanel p={4} key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
}
