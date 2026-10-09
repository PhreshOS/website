'use client';

import { useState } from 'react';
import { AlertDialog, Button, ContextMenu, Dialog, Drawer, DropdownMenu, Input, Menu, Popover, Tooltip, Tree } from '../react-ui';
import { WindowScene } from './frames';
import { ControlSelect, Showcase, attribute } from './showcase';

export function PopoverShowcase() {
  return (
    <Showcase
      code={`<Popover>
  <Popover.Trigger>Details</Popover.Trigger>
  <Popover.Content>
    <Popover.Dialog aria-label="Connection details">
      <Popover.Title>Connection</Popover.Title>
      <p style={{ margin: "8px 0", fontSize: "0.8125em" }}>Connected to the local System.</p>
      <Popover.Close>Done</Popover.Close>
    </Popover.Dialog>
  </Popover.Content>
</Popover>`}
    >
      <WindowScene title="Popover">
        <Popover>
          <Popover.Trigger size="small">Details</Popover.Trigger>
          <Popover.Content>
            <Popover.Dialog aria-label="Connection details" style={{ padding: 12 }}>
              <Popover.Title>Connection</Popover.Title>
              <p style={{ margin: '8px 0', fontSize: '0.8125em' }}>Connected to the local System.</p>
              <Popover.Close size="small">Done</Popover.Close>
            </Popover.Dialog>
          </Popover.Content>
        </Popover>
      </WindowScene>
    </Showcase>
  );
}

export function DropdownMenuShowcase() {
  return (
    <Showcase code={`<DropdownMenu>
  <DropdownMenu.Trigger>Actions</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <Menu aria-label="Actions">
      <Menu.Item id="rename">Rename</Menu.Item>
      <Menu.Item id="delete" color="danger">Delete</Menu.Item>
    </Menu>
  </DropdownMenu.Content>
</DropdownMenu>`}>
      <WindowScene title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenu.Trigger size="small">Actions</DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <Menu aria-label="Actions">
              <Menu.Item id="rename">Rename</Menu.Item>
              <Menu.Separator />
              <Menu.Item id="delete" color="danger">Delete</Menu.Item>
            </Menu>
          </DropdownMenu.Content>
        </DropdownMenu>
      </WindowScene>
    </Showcase>
  );
}

export function ContextMenuShowcase() {
  return (
    <Showcase code={`<ContextMenu>
  <ContextMenu.Trigger><Button>Context actions</Button></ContextMenu.Trigger>
  <ContextMenu.Content>
    <Menu aria-label="Context actions">
      <Menu.Item id="open">Open</Menu.Item>
      <Menu.Item id="inspect">Inspect</Menu.Item>
    </Menu>
  </ContextMenu.Content>
</ContextMenu>`}>
      <WindowScene title="Context Menu">
        <ContextMenu>
          <ContextMenu.Trigger>
            <Button size="small" aria-label="Context actions">Right-click here</Button>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <Menu aria-label="Context actions">
              <Menu.Item id="open">Open</Menu.Item>
              <Menu.Item id="inspect">Inspect</Menu.Item>
            </Menu>
          </ContextMenu.Content>
        </ContextMenu>
      </WindowScene>
    </Showcase>
  );
}

export function DialogShowcase() {
  return (
    <Showcase code={`<Dialog>
  <Dialog.Trigger>Edit profile</Dialog.Trigger>
  <Dialog.Backdrop dismissable>
    <Dialog.Content>
      <Dialog.Header><Dialog.Title>Profile</Dialog.Title></Dialog.Header>
      <Dialog.Body>…</Dialog.Body>
      <Dialog.Footer><Dialog.Close>Done</Dialog.Close></Dialog.Footer>
    </Dialog.Content>
  </Dialog.Backdrop>
</Dialog>`}
    >
      <WindowScene title="Dialog">
        <Dialog>
          <Dialog.Trigger size="small">Edit profile</Dialog.Trigger>
          <Dialog.Backdrop dismissable>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Profile</Dialog.Title>
                <Dialog.Description>Update the visible details.</Dialog.Description>
              </Dialog.Header>
              <Dialog.Body><Input label="Name" defaultValue="Ada Lovelace" /></Dialog.Body>
              <Dialog.Footer><Dialog.Close>Done</Dialog.Close></Dialog.Footer>
            </Dialog.Content>
          </Dialog.Backdrop>
        </Dialog>
      </WindowScene>
    </Showcase>
  );
}

export function AlertDialogShowcase() {
  return (
    <Showcase code={`<AlertDialog>
  <AlertDialog.Trigger color="danger">Delete</AlertDialog.Trigger>
  <AlertDialog.Backdrop>
    <AlertDialog.Content>
      <AlertDialog.Title>Delete permanently?</AlertDialog.Title>
      <AlertDialog.Footer>…</AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Backdrop>
</AlertDialog>`}>
      <WindowScene title="Alert Dialog">
        <AlertDialog>
          <AlertDialog.Trigger size="small" color="danger">Delete</AlertDialog.Trigger>
          <AlertDialog.Backdrop>
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Delete permanently?</AlertDialog.Title>
                <AlertDialog.Description>This action requires an explicit decision.</AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Close>Cancel</AlertDialog.Close>
                <AlertDialog.Close color="danger">Delete</AlertDialog.Close>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Backdrop>
        </AlertDialog>
      </WindowScene>
    </Showcase>
  );
}

export function TooltipShowcase() {
  return (
    <Showcase code={`<Tooltip>
  <Tooltip.Trigger>Info</Tooltip.Trigger>
  <Tooltip.Content>Visible to this Program</Tooltip.Content>
</Tooltip>`}>
      <WindowScene title="Tooltip">
        <Tooltip delay={0}>
          <Tooltip.Trigger size="small">Info</Tooltip.Trigger>
          <Tooltip.Content>Visible to this Program</Tooltip.Content>
        </Tooltip>
      </WindowScene>
    </Showcase>
  );
}

export function DrawerShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <Showcase code={`<Drawer open={open} onClose={() => setOpen(false)} title="Files">
  <Tree aria-label="Places" selectionMode="single">…</Tree>
</Drawer>`}>
      <WindowScene title="Drawer" contentStyle={{ position: 'relative', minHeight: 220, overflow: 'hidden' }}>
        <Button size="small" aria-expanded={open} onPress={() => setOpen(!open)}>Places</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Files">
          <Tree aria-label="Places" selectionMode="single" defaultValue="home" onChange={() => setOpen(false)}>
            <Tree.Item id="home" textValue="Home"><Tree.Content>Home</Tree.Content></Tree.Item>
            <Tree.Item id="documents" textValue="Documents"><Tree.Content>Documents</Tree.Content></Tree.Item>
            <Tree.Item id="downloads" textValue="Downloads"><Tree.Content>Downloads</Tree.Content></Tree.Item>
          </Tree>
        </Drawer>
      </WindowScene>
    </Showcase>
  );
}
