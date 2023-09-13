// Create New Task Button Component

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDataContext } from "../context";


function CreateTask() {
  const { openModal } = useDataContext();
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={() => {
        openModal(null);
      }}
    >
      Create New Task
    </Button>
  );
}

export default CreateTask;
