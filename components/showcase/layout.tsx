'use client';

import { useState } from 'react';
import type { Color, ScaleLevel } from '@phreshos/react-ui';
import { useAppearance } from '@phreshos/react-ui';
import { Palette } from '@phreshos/react-ui/icons';
import { Accordion, AppLayout, Button, Disclosure, Fieldset, Flex, Grid, NumberField, ScrollArea, Surface, Switch, Toolbar, Tree } from '../react-ui';
import { WindowScene } from './frames';
import {
  ControlSelect,
  ControlSwitch,
  Showcase,
  attribute,
  colorOptions,
  optional,
  sizeOptions,
  unset,
} from './showcase';

export function FlexShowcase() {
  const [direction, setDirection] = useState('row');
  const [gap, setGap] = useState<ScaleLevel>('medium');
  const [justify, setJustify] = useState('start');

  return (
    <Showcase
      code={`<Flex${attribute('direction', direction === 'row' ? undefined : direction)} gap="${gap}"${attribute('justify', justify === 'start' ? undefined : justify)}>
  <Surface>One</Surface>
  <Surface>Two</Surface>
  <Surface>Three</Surface>
</Flex>`}
      controls={
        <>
          <ControlSelect label="Direction" value={direction} options={[
            { value: 'row', label: 'Row' },
            { value: 'column', label: 'Column' },
          ]} onChange={setDirection} />
          <ControlSelect label="Justify" value={justify} options={[
            { value: 'start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'end', label: 'End' },
            { value: 'between', label: 'Between' },
          ]} onChange={setJustify} />
          <ControlSelect label="Gap" value={gap} options={sizeOptions} onChange={value => setGap(value as ScaleLevel)} />
        </>
      }
    >
      <WindowScene title="Flex">
        <Flex direction={direction as 'row' | 'column'} gap={gap} justify={justify as 'start'}>
          {['One', 'Two', 'Three'].map(label => <Surface key={label} style={{ padding: 12 }}>{label}</Surface>)}
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function GridShowcase() {
  const [gap, setGap] = useState<ScaleLevel>('medium');
  const [columns, setColumns] = useState('3');

  return (
    <Showcase
      code={`<Grid columns={${columns}} gap="${gap}">…</Grid>`}
      controls={
        <>
          <ControlSelect label="Columns" value={columns} options={[
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' },
            { value: '4', label: 'Four' },
          ]} onChange={setColumns} />
          <ControlSelect label="Gap" value={gap} options={sizeOptions} onChange={value => setGap(value as ScaleLevel)} />
        </>
      }
    >
      <WindowScene title="Grid">
        <Grid columns={Number(columns)} gap={gap}>
          {Array.from({ length: 6 }, (_, index) => (
            <Surface key={index} style={{ padding: 12 }}>{String.fromCharCode(65 + index)}</Surface>
          ))}
        </Grid>
      </WindowScene>
    </Showcase>
  );
}

export function ScrollAreaShowcase() {
  const [axis, setAxis] = useState('vertical');
  const [color, setColor] = useState<string>(unset);
  const padding = useAppearance().spacing * 1.5;

  return (
    <Showcase
      code={`<ScrollArea${attribute('axis', axis === 'vertical' ? undefined : axis)}${attribute('color', color)} style={{ height: 160 }}>
  …
</ScrollArea>`}
      controls={
        <>
          <ControlSelect label="Axis" value={axis} options={[
            { value: 'vertical', label: 'Vertical' },
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'both', label: 'Both' },
          ]} onChange={setAxis} />
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={setColor} />
        </>
      }
    >
      <WindowScene title="Scroll Area" contentStyle={{ padding: 0 }}>
        <ScrollArea axis={axis as 'vertical'} color={optional<Color>(color)} style={{ height: 160 }}>
          <div style={{ boxSizing: 'border-box', padding, width: axis === 'vertical' ? '100%' : 520 }}>
            {Array.from({ length: 12 }, (_, index) => (
              <p key={index} style={{ margin: '0 0 8px', fontSize: '0.8125em', whiteSpace: 'nowrap' }}>
                [server] Synced note {index + 1} of 12 to the Program data folder
              </p>
            ))}
          </div>
        </ScrollArea>
      </WindowScene>
    </Showcase>
  );
}

export function ToolbarShowcase() {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [gap, setGap] = useState<ScaleLevel>('medium');

  return (
    <Showcase
      code={`<Toolbar aria-label="Document"${attribute('orientation', orientation === 'horizontal' ? undefined : orientation)}${attribute('gap', gap === 'medium' ? undefined : gap)}>
  <Toolbar.Group aria-label="History">
    <Button>Undo</Button>
    <Button>Redo</Button>
  </Toolbar.Group>
  <Toolbar.Separator />
  <Toolbar.Group aria-label="File">
    <Button>Copy</Button>
    <Button color="primary">Save</Button>
  </Toolbar.Group>
</Toolbar>`}
      controls={
        <>
          <ControlSelect label="Orientation" value={orientation} options={[
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' },
          ]} onChange={value => setOrientation(value as 'horizontal' | 'vertical')} />
          <ControlSelect label="Gap" value={gap} options={sizeOptions} onChange={value => setGap(value as ScaleLevel)} />
        </>
      }
    >
      <WindowScene title="Toolbar">
        <Toolbar aria-label="Document" orientation={orientation} gap={gap}>
          <Toolbar.Group aria-label="History">
            <Button>Undo</Button>
            <Button>Redo</Button>
          </Toolbar.Group>
          <Toolbar.Separator />
          <Toolbar.Group aria-label="File">
            <Button>Copy</Button>
            <Button color="primary">Save</Button>
          </Toolbar.Group>
        </Toolbar>
      </WindowScene>
    </Showcase>
  );
}

export function DisclosureShowcase() {
  const [expanded, setExpanded] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);

  return (
    <Showcase
      code={`<Disclosure expanded={expanded} onExpandedChange={setExpanded}${attribute('size', size === 'medium' ? undefined : size)}${attribute('color', color)}${attribute('disabled', disabled)}>
  <Disclosure.Trigger>Connection details</Disclosure.Trigger>
  <Disclosure.Content>Connected to the System on this machine.</Disclosure.Content>
</Disclosure>`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={setColor} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />
          <ControlSwitch label="Expanded" checked={expanded} onChange={setExpanded} />
          <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
        </>
      }
    >
      <WindowScene title="Disclosure">
        <Disclosure expanded={expanded} onExpandedChange={setExpanded} disabled={disabled} size={size} color={optional<Color>(color)}>
          <Disclosure.Trigger>Connection details</Disclosure.Trigger>
          <Disclosure.Content>Connected to the System on this machine.</Disclosure.Content>
        </Disclosure>
      </WindowScene>
    </Showcase>
  );
}

export function AccordionShowcase() {
  const [multiple, setMultiple] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [expanded, setExpanded] = useState<readonly string[]>(['general']);

  const items = (
    <>
      <Accordion.Item id="general">
        <Accordion.Trigger>General</Accordion.Trigger>
        <Accordion.Content>Name, icon, and startup.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="privacy">
        <Accordion.Trigger>Privacy</Accordion.Trigger>
        <Accordion.Content>Permissions and data access.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item id="advanced">
        <Accordion.Trigger>Advanced</Accordion.Trigger>
        <Accordion.Content>Logs and diagnostics.</Accordion.Content>
      </Accordion.Item>
    </>
  );

  return (
    <Showcase
      code={`<Accordion${multiple ? ' multiple value={sections} onChange={setSections}' : ' value={section} onChange={setSection}'}${attribute('disabled', disabled)}>
  <Accordion.Item id="general">
    <Accordion.Trigger>General</Accordion.Trigger>
    <Accordion.Content>Name, icon, and startup.</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item id="privacy">…</Accordion.Item>
  <Accordion.Item id="advanced">…</Accordion.Item>
</Accordion>`}
      controls={
        <>
          <ControlSwitch label="Multiple" checked={multiple} onChange={value => {
            setMultiple(value);
            setExpanded(current => value ? current : current.slice(0, 1));
          }} />
          <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
        </>
      }
    >
      <WindowScene title="Accordion">
        {multiple
          ? <Accordion multiple value={expanded} onChange={setExpanded} disabled={disabled}>{items}</Accordion>
          : <Accordion value={expanded[0] ?? null} onChange={value => setExpanded(value === null ? [] : [value])} disabled={disabled}>{items}</Accordion>}
      </WindowScene>
    </Showcase>
  );
}

export function FieldsetShowcase() {
  return (
    <Showcase code={`<Fieldset title="Layout" description="Shared spacing and corners.">
  <NumberField label="Spacing" defaultValue={12} />
  <NumberField label="Radius" defaultValue={10} />
</Fieldset>`}>
      <WindowScene title="Fieldset">
        <Fieldset title="Layout" description="Shared spacing and corners.">
          <NumberField label="Spacing" defaultValue={12} minValue={6} maxValue={18} />
          <NumberField label="Radius" defaultValue={10} minValue={0} maxValue={24} />
        </Fieldset>
      </WindowScene>
    </Showcase>
  );
}

export function AppLayoutShowcase() {
  const [section, setSection] = useState<string | null>('colors');
  const [expanded, setExpanded] = useState<readonly string[]>(['appearance']);

  return (
    <Showcase code={`<AppLayout>
  <AppLayout.Sidebar aria-label="Settings">
    <nav aria-label="Settings">
      <Tree aria-label="Sections" selectionMode="single" value={section} onChange={setSection}>…</Tree>
    </nav>
  </AppLayout.Sidebar>
  <AppLayout.Header><Palette />Appearance</AppLayout.Header>
  <AppLayout.Content>…</AppLayout.Content>
  <AppLayout.Footer><Button>Discard</Button><Button color="primary">Save</Button></AppLayout.Footer>
</AppLayout>`}>
      <WindowScene title="Settings" contentStyle={{ padding: 0, height: 320 }}>
        <AppLayout sidebarWidth={150}>
          <AppLayout.Sidebar aria-label="Settings">
            <nav aria-label="Settings">
              <Tree aria-label="Sections" selectionMode="single" value={section} onChange={setSection} expanded={expanded} onExpandedChange={setExpanded}>
                <Tree.Item id="appearance" textValue="Appearance">
                  <Tree.Content>Appearance</Tree.Content>
                  <Tree.Item id="colors" textValue="Colors"><Tree.Content>Colors</Tree.Content></Tree.Item>
                  <Tree.Item id="layout" textValue="Layout"><Tree.Content>Layout</Tree.Content></Tree.Item>
                  <Tree.Item id="taskbar" textValue="Taskbar"><Tree.Content>Taskbar</Tree.Content></Tree.Item>
                </Tree.Item>
                <Tree.Item id="desktop" textValue="Desktop"><Tree.Content>Desktop</Tree.Content></Tree.Item>
              </Tree>
            </nav>
          </AppLayout.Sidebar>
          <AppLayout.Header><Palette /><span style={{ fontSize: '0.8125em', fontWeight: 600 }}>Appearance</span></AppLayout.Header>
          <AppLayout.Content>
            <Fieldset title="Layout">
              <NumberField label="Spacing" defaultValue={12} size="small" />
              <Switch label="Overlay windows" size="small" />
            </Fieldset>
          </AppLayout.Content>
          <AppLayout.Footer><Button size="small">Discard</Button><Button size="small" color="primary">Save</Button></AppLayout.Footer>
        </AppLayout>
      </WindowScene>
    </Showcase>
  );
}
