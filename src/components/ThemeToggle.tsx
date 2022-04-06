import React, { useState } from "react";
import { useMantineColorScheme, Switch, Group } from "@mantine/core";

const LightAndDarkModeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState(colorScheme === "dark" ? true : false);

  return (
    <Group position="right">
      <Switch
        checked={checked}
        className="m-3 theme-switch"
        size="lg"
        onChange={(event) => {
          setChecked(event.currentTarget.checked);
          toggleColorScheme();
        }}
        color="dark"
      />
    </Group>
  );
};

export default LightAndDarkModeButton;
