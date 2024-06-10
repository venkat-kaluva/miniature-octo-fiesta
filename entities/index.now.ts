import { Application, BusinessRule } from "@servicenow/sdk-core/app";
import { ClientScript } from "@servicenow/sdk-core/clientscript";
import onLoad from "../client/client_script.js";
import { showStateUpdate } from "../server/script.js";

//creates an application
Application({
  name: "app-spike",
  license: {
    subscriptionRequirement: "None",
  },
});

//creates a client script that pops up 'Table loaded successfully!!' message everytime incident record is loaded
ClientScript({
  name: "my_client_script",
  table: { name: "incident" }, //need to be updated once we have access to instance tables
  active: true,
  applies_extended: false,
  global: true,
  ui_type: "All",
  description: "custom dsl based client script",
  messages: "",
  isolate_script: false,
  type: "onLoad",
  script: onLoad,
});

//creates a businessrule that pops up state change message whenever a incident record is updated
BusinessRule({
  id: 0,
  action: ["update"],
  table: { name: "incident" }, //need to be updated once we have access to instance tables
  script: showStateUpdate,
  name: "LogStateChange",
  order: 100,
  when: "after",
  active: true,
});
