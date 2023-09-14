/**
 * TaskModel Component
 * 
 * This component serves as a form for adding new tasks or editing existing ones. It provides
 * input fields for task details such as title, description, status, etc. Users can submit
 * the form to create a new task or update an existing one.
 * 
 */

import axios from "axios";
import React, { useEffect } from "react";
import { Modal, Input, Form, Button, notification, Select } from "antd";
import { useDataContext } from "../context";

const { TextArea } = Input;

function TaskModel(props) {
  const [form] = Form.useForm(); // Create a form instance
  const [api, contextHolder] = notification.useNotification();
  const { selectedData, isModalVisible, closeModal } = useDataContext();

  useEffect(() => {
    // Update form values when selectedData changes
    if (selectedData) {
      form.setFieldsValue(selectedData);
    }
  }, [selectedData, form]);

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };
  const displaySuccessMessage = (type) => {
    api.success({
      message: `Task ${type} Successfully`,
      placement: "bottomRight",
    });
  };
  const displayErrorMessage = () => {
    api.error({
      message: "Something Went Wrong",
      placement: "bottomRight",
    });
  };
  const createTask = async (values) => {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/task`;
      const res = await axios.post(url, values);
      res.data && displaySuccessMessage("Created");
    } catch (err) {
      displayErrorMessage();
    }
  };
  const editTask = async (id, values) => {
    try {
      const url = `${process.env.REACT_APP_API_BASE_URL}/task/${id}`;
      const res = await axios.put(url, values);
      res.data && displaySuccessMessage("Edited");
    } catch (err) {
      displayErrorMessage();
    }
  };
  const onFinish = async (values) => {
    if (selectedData._id) {
      await editTask(selectedData._id, values);
    } else {
      await createTask(values);
    }
    form.resetFields();
    props.updateList();
    closeModal();
  };
  const onFinishFailed = (errorInfo) => {};
  const submitFooter = (
    <div style={{ textAlign: "right" }}>
      <Button type="primary" htmlType="submit" form="form">
        Submit
      </Button>
    </div>
  );
  return (
    <>
      {contextHolder}

      <Modal
        forceRender
        title={selectedData._id ? "Edit Task" : "Create New Task"}
        open={isModalVisible}
        footer={submitFooter}
        onCancel={() => handleCancel()}
        width={800}
      >
        <Form
          form={form}
          name="form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name={"title"}
            rules={[
              {
                required: true,
                message: "Please input task title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Input />
          </Form.Item>
          <Form.Item label="Priority" name="priority">
            <Select
              placeholder="Priority"
              options={[
                {
                  value: "High",
                  label: "High",
                },
                {
                  value: "Mideum",
                  label: "Mideum",
                },
                {
                  value: "Low",
                  label: "Low",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name={"status"}
            rules={[
              {
                required: true,
                message: "Please input task status",
              },
            ]}
          >
            <Select
              placeholder="Status"
              options={[
                {
                  value: "In Progress",
                  label: "In Progress",
                },
                {
                  value: "Dev Done",
                  label: "Dev Done",
                },
                {
                  value: "Done",
                  label: "Done",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Description" name={"description"}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
TaskModel.defaultProps = {
  data: {},
};
export default TaskModel;
