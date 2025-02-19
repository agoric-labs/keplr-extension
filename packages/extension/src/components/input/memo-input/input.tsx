import React, { FunctionComponent } from "react";
import { TextInput } from "../text-input";
import { observer } from "mobx-react-lite";
import { IMemoConfig } from "@keplr-wallet/hooks";
import { Box } from "../../box";

export const MemoInput: FunctionComponent<{
  memoConfig: IMemoConfig;

  label?: string;
  rightLabel?: React.ReactNode;

  paragraph?: string;
  error?: string;
  errorBorder?: boolean;

  placeholder?: string;

  disabled?: boolean;
}> = observer(({ memoConfig, label, placeholder, ...others }) => {
  return (
    <Box>
      <TextInput
        label={label ?? "Memo"}
        placeholder={placeholder}
        onChange={(e) => {
          e.preventDefault();
          memoConfig.setValue(e.target.value);
        }}
        value={memoConfig.value}
        error={(() => {
          const uiProperties = memoConfig.uiProperties;

          const err = uiProperties.error || uiProperties.warning;
          if (err) {
            return err.message || err.toString();
          }
        })()}
        {...others}
      />
    </Box>
  );
});
