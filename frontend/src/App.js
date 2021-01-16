import React from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import PeopleIcon from "@material-ui/icons/People";

import { ClientCreate, ClientEdit, ClientList } from "./crud";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Admin dataProvider={simpleRestProvider("http://localhost:3001")}>
        <Resource
          name="clients"
          list={ClientList}
          edit={ClientEdit}
          create={ClientCreate}
          icon={PeopleIcon}
        />
      </Admin>
    </div>
  );
}

export default App;
