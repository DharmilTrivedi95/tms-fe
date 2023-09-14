/**
 * TaskList Component
 * 
 * This component is responsible for displaying a list of tasks. It receives an array of tasks
 * as props and renders them as a list. Users can view, edit, or delete tasks from this list.
 * 
 */

import axios from "axios";
import { Table, Tag, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDataContext } from '../context';

function TaskList(props) {
  const { openModal } = useDataContext();
  const [api, contextHolder] = notification.useNotification();
  const displaySuccessMessage = () => {
    api.success({
      message: `Task deleted Successfully`,
      placement: "bottomRight",
    });
  };
  const displayErrorMessage = () => {
    api.error({
      message: "Something Went Wrong",
      placement: "bottomRight",
    });
  };
  const onDeleteTask = async (record) => {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/task/${record._id}`;
      const res = await axios.delete(url);
      if(res.data) {
        displaySuccessMessage();
        props.updateList();
      }
    } catch (err) {
      displayErrorMessage();
    }
  }
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (tag) => (
        <>
          {
            <Tag
              color={
                tag === "Done"
                  ? "green"
                  : tag === "Dev Done"
                  ? "blue"
                  : "yellow"
              }
              key={tag}
            >
              {tag.toUpperCase()}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <>
          <EditOutlined className="mr-5" style={{ fontSize: '18px', color: '#08c' }} onClick={() => {openModal(item)}}/>
          <DeleteOutlined style={{ fontSize: '18px', color: 'red', marginLeft: 12 }} onClick={() => {onDeleteTask(item)}}/>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table columns={columns} dataSource={props.list} rowKey="_id" />
    </>
  );
}

export default TaskList;
