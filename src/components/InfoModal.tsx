import React, { useState } from "react";
import { Modal, Button, Group, Badge, ColorScheme } from "@mantine/core";
import { FiEdit3 } from "react-icons/fi";
import Moment from "react-moment";
import MDEditor from "@uiw/react-md-editor";
import EditorWindow from "./EditorWindow";
import "../editor.css";
import { DocumentData } from "firebase/firestore";

interface Props {
  todo: DocumentData;
  toggleInfo: Function;
  editTask: Function;
  theme: ColorScheme;
  dateObj: Date;
}

const InfoModal = ({ todo, toggleInfo, editTask, theme, dateObj }: Props) => {
  const [editingMode, setEditingMode] = useState(false);

  const toggleEditMode = () => setEditingMode(!editingMode);

  return (
    <div className="modal-styles">
      {editingMode ? (
        <EditorWindow
          todo={todo}
          editTask={editTask}
          toggleEditMode={toggleEditMode}
          theme={theme}
        />
      ) : null}
      <Modal
        classNames={{
          modal: "modal-styles",
          title: "title-bold",
        }}
        size="70%"
        withCloseButton={false}
        opened={true}
        transition="fade"
        transitionDuration={600}
        onClose={() => toggleInfo()}
      >
        <Group position="left">
          <h4>{todo.task}</h4>
          <Badge color="purple" variant="light">
            <Moment calendar={true}>{dateObj}</Moment>
          </Badge>
        </Group>

        <Group>
          {todo.notes.length > 0 ? (
            <div data-color-mode={theme}>
              <div className="wmde-markdown-var"> </div>
              <MDEditor.Markdown
                className={theme === "dark" ? "dark-preview" : ""}
                source={todo.notes}
              />
            </div>
          ) : (
            "No notes to display"
          )}
        </Group>
        <Group position="right">
          <Button
            className="edit-btn"
            color="teal"
            variant="light"
            onClick={toggleEditMode}
          >
            <FiEdit3 size={20} />
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default InfoModal;
