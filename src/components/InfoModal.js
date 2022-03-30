import React, { useState } from "react";
import { Modal, Button, Group } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";
import EditorWindow from "./EditorWindow";

const InfoModal = ({ todo, handleClose, editTask, theme }) => {
  const [editingMode, setEditingMode] = useState(false);

  const handleEditOpen = () => {
    setEditingMode(true);
  };

  const handleEditClose = () => {
    setEditingMode(false);
  };

  return (
    <div className="modal-styles">
      {editingMode ? (
        <EditorWindow
          todo={todo}
          editTask={editTask}
          handleEditClose={handleEditClose}
          theme={theme}
        />
      ) : null}
      <Modal
        classNames={{
          modal: "modal-styles",
          title: "title-bold",
        }}
        size="1000px"
        opened="true"
        title={todo.task}
        onClose={handleClose}
      >
        {todo.notes.length > 0 ? (
          <div data-color-mode={theme}>
            <div className="wmde-markdown-var"> </div>
            <MDEditor.Markdown source={todo.notes} />
          </div>
        ) : (
          "No notes to display"
        )}
        <Group position="right">
          <Button color="teal" onClick={handleEditOpen}>
            Edit
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default InfoModal;
