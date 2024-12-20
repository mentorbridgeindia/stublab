import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IDropdown } from "./Dropdown.types";
import "./Dropdown.scss";

export const Dropdown = (props: IDropdown) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="IconButton" aria-label="dropdown options">
          {props.trigger}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          {props.children}
          <DropdownMenu.Arrow className="DropdownMenuArrow" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

Dropdown.Item = DropdownMenu.Item;
