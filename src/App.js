import React, { useState, useEffect } from "react";
import { Layout, Col, Row } from "antd";
import { DataProvider } from "./context";

import CreateTask from "./components/CreateTask";
import TaskList from "./components/TaskList";
import TaskModel from "./components/TaskModel";
import axios from "axios";

import "./App.css";

const { Content } = Layout;

function App() {
  const [list, setList] = useState(false);

  const getTasks = async () => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/task`;
    let res = await axios.get(url);
    setList(res.data || []);
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Content style={{ padding: "150px" }}>
        <DataProvider>
          <Row>
            <Col span={8}>
              <h1>TMS</h1>
            </Col>
            <Col span={8} offset={8} className="center">
              <CreateTask />
            </Col>
          </Row>

          {/* To display list of taks */}
          <TaskList list={list} updateList={getTasks}></TaskList>

          {/* To Add or update task */}
          <TaskModel updateList={getTasks}></TaskModel>
        </DataProvider>
      </Content>
    </Layout>
  );
}

export default App;
