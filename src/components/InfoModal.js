import React, { useState } from "react";
import { Modal, Button, Group, Badge } from "@mantine/core";
import Moment from "react-moment";
import MDEditor from "@uiw/react-md-editor";
import EditorWindow from "./EditorWindow";

const InfoModal = ({ todo, handleClose, editTask, theme, dateObj }) => {
  const [editingMode, setEditingMode] = useState(false);

  const handleEditOpen = () => {
    setEditingMode(true);
  };

  const handleEditClose = () => {
    setEditingMode(false);
  };

  let filled = theme === "light" ? "light" : "filled";

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
        withCloseButton={false}
        size="70%"
        opened="true"
        onClose={handleClose}
      >
        <Group position="left">
          <h4 className="title-bold">{todo.task}</h4>
          <Badge color="purple" variant={filled}>
            <Moment calendar="true">{dateObj}</Moment>
          </Badge>
        </Group>

        <Group>
          {todo.notes.length > 0 ? (
            <div data-color-mode={theme}>
              <div className="wmde-markdown-var"> </div>
              <MDEditor.Markdown source={todo.notes} />
            </div>
          ) : (
            "No notes to display"
          )}
        </Group>
        <Group position="right">
          <Button color="teal" variant={filled} onClick={handleEditOpen}>
            Edit
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default InfoModal;
