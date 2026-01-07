import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import {
  QuickFilter,
  QuickFilterClear,
  QuickFilterControl,
  QuickFilterTrigger,
  Toolbar,
  ToolbarButton,
} from "@mui/x-data-grid";
import { SearchIcon, CircleX } from "lucide-react";

const StyledQuickFilter = styled(QuickFilter)({
  display: "grid",
  alignItems: "center",
  marginRight: "auto",
});

const StyledToolbarButton = styled(ToolbarButton)(() => ({
  gridArea: "1 / 1",
  width: "min-content",
  height: "min-content",
  zIndex: 1,
  // opacity: ownerState.expanded ? 0 : 1,
  // pointerEvents: ownerState.expanded ? 'none' : 'auto',
  // transition: theme.transitions.create(['opacity']),
}));

const StyledTextField = styled(TextField)(() => ({
  gridArea: "1 / 1",
  overflowX: "clip",
  width: 260,
  opacity: 1,
  transition: "width 0.3s, opacity 0.3s",
}));

export function CustomToolbar() {
  return (
    <Toolbar>
      <StyledQuickFilter defaultExpanded>
        <QuickFilterControl
          render={({ ref, ...controlProps }, state) => (
            <StyledTextField
              {...controlProps}
              inputRef={ref}
              aria-label="Search"
              placeholder="Search by name"
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon size={16} />
                    </InputAdornment>
                  ),
                  endAdornment: state.value ? (
                    <InputAdornment position="end">
                      <QuickFilterClear
                        edge="end"
                        size="small"
                        aria-label="Clear search"
                        material={{ sx: { marginRight: -0.75 } }}
                      >
                        <CircleX size={16} />
                      </QuickFilterClear>
                    </InputAdornment>
                  ) : null,
                  ...controlProps.slotProps?.input,
                },
                ...controlProps.slotProps,
              }}
            />
          )}
        />
      </StyledQuickFilter>
    </Toolbar>
  );
}
