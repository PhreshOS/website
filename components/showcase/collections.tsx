'use client';

import { useMemo, useState } from 'react';
import { Activity, Copy, LayoutDashboard, Pencil, Settings, Trash2 } from '@phreshos/react-ui/icons';
import { ComboBox, ListBox, Menu, ScrollArea, Select, Surface, Table, Tabs, Tree } from '../react-ui';
import { WindowScene } from './frames';
import { useFlag, usePaintControls } from './paint';
import { ControlSelect, ControlSwitch, Showcase } from './showcase';

const regions = [
  { id: 'eu', name: 'Europe' },
  { id: 'us', name: 'United States' },
  { id: 'apac', name: 'Asia Pacific' },
];

export function SelectShowcase() {
  const paint = usePaintControls({ radius: true });
  const invalid = useFlag('Invalid', 'invalid');
  const [region, setRegion] = useState<string | null>('eu');

  return (
    <Showcase
      code={`<Select label="Region" value={region} onChange={setRegion}${paint.code}${invalid.code}>
  <Select.Item id="eu">Europe</Select.Item>
  <Select.Item id="us">United States</Select.Item>
  <Select.Item id="apac">Asia Pacific</Select.Item>
  <Select.Item id="local" disabled>Local only</Select.Item>
</Select>`}
      controls={<>{paint.controls}{invalid.control}</>}
    >
      <WindowScene title="Select">
        <Select label="Region" value={region} onChange={setRegion} {...paint.props} invalid={invalid.value} errorMessage="Choose an available region.">
          {regions.map(item => <Select.Item key={item.id} id={item.id}>{item.name}</Select.Item>)}
          <Select.Item id="local" disabled>Local only</Select.Item>
        </Select>
      </WindowScene>
    </Showcase>
  );
}

export function ComboBoxShowcase() {
  const paint = usePaintControls({ radius: true });
  const invalid = useFlag('Invalid', 'invalid');
  const [region, setRegion] = useState<string | null>('eu');

  return (
    <Showcase
      code={`<ComboBox label="Region" placeholder="Search regions" value={region} onChange={setRegion}${paint.code}${invalid.code}>
  <ComboBox.Item id="eu">Europe</ComboBox.Item>
  <ComboBox.Item id="us">United States</ComboBox.Item>
  <ComboBox.Item id="apac">Asia Pacific</ComboBox.Item>
</ComboBox>`}
      controls={<>{paint.controls}{invalid.control}</>}
    >
      <WindowScene title="Combo Box">
        <ComboBox label="Region" placeholder="Search regions" value={region} onChange={setRegion} {...paint.props} invalid={invalid.value} errorMessage="Choose an available region.">
          {regions.map(item => <ComboBox.Item key={item.id} id={item.id}>{item.name}</ComboBox.Item>)}
        </ComboBox>
      </WindowScene>
    </Showcase>
  );
}

export function ListBoxShowcase() {
  const paint = usePaintControls({ material: false, disabled: false });
  const [multiple, setMultiple] = useState(true);
  const [tools, setTools] = useState<readonly string[] | 'all'>(['editor', 'terminal']);
  const [tool, setTool] = useState<string | null>('editor');

  const items = (
    <>
      <ListBox.Section id="work">
        <ListBox.Header>Work</ListBox.Header>
        <ListBox.Item id="editor">Editor</ListBox.Item>
        <ListBox.Item id="terminal">Terminal</ListBox.Item>
      </ListBox.Section>
      <ListBox.Item id="archive" disabled>Archive</ListBox.Item>
    </>
  );

  return (
    <Showcase
      code={`<ListBox aria-label="Tools"${multiple ? ' selectionMode="multiple" value={tools} onChange={setTools}' : ' value={tool} onChange={setTool}'}${paint.code}>
  <ListBox.Section id="work">
    <ListBox.Header>Work</ListBox.Header>
    <ListBox.Item id="editor">Editor</ListBox.Item>
    <ListBox.Item id="terminal">Terminal</ListBox.Item>
  </ListBox.Section>
  <ListBox.Item id="archive" disabled>Archive</ListBox.Item>
</ListBox>`}
      controls={<>{paint.controls}<ControlSwitch label="Multiple" checked={multiple} onChange={setMultiple} /></>}
    >
      <WindowScene title="List Box">
        {multiple
          ? <ListBox aria-label="Tools" selectionMode="multiple" value={tools} onChange={setTools} {...paint.props}>{items}</ListBox>
          : <ListBox aria-label="Tools" value={tool} onChange={setTool} {...paint.props}>{items}</ListBox>}
      </WindowScene>
    </Showcase>
  );
}

export function MenuShowcase() {
  const [last, setLast] = useState<string>('nothing yet');

  return (
    <Showcase code={`<Menu aria-label="Note" onAction={run}>
  <Menu.Item id="rename" textValue="Rename"><Pencil />Rename</Menu.Item>
  <Menu.Item id="duplicate" textValue="Duplicate"><Copy />Duplicate</Menu.Item>
  <Menu.Separator />
  <Menu.Item id="delete" textValue="Delete" color="danger"><Trash2 />Delete</Menu.Item>
</Menu>`}>
      <Surface style={{ width: 'min(100%, 16rem)', display: 'grid', gap: 8 }}>
        <Menu aria-label="Note" onAction={setLast}>
          <Menu.Item id="rename" textValue="Rename"><Pencil />Rename</Menu.Item>
          <Menu.Item id="duplicate" textValue="Duplicate"><Copy />Duplicate</Menu.Item>
          <Menu.Separator />
          <Menu.Item id="delete" textValue="Delete" color="danger"><Trash2 />Delete</Menu.Item>
        </Menu>
      </Surface>
      <span style={{ fontSize: '0.75em', opacity: 0.7 }}>Last action: {last}</span>
    </Showcase>
  );
}

export function TabsShowcase() {
  const paint = usePaintControls({ material: false });
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [view, setView] = useState('overview');

  return (
    <Showcase
      code={`<Tabs value={view} onChange={setView}${orientation === 'horizontal' ? '' : ' orientation="vertical"'}${paint.code}>
  <Tabs.List aria-label="Program">
    <Tabs.Tab id="overview"><LayoutDashboard />Overview</Tabs.Tab>
    <Tabs.Tab id="activity"><Activity />Activity</Tabs.Tab>
    <Tabs.Tab id="settings"><Settings />Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="overview">…</Tabs.Panel>
  <Tabs.Panel id="activity">…</Tabs.Panel>
  <Tabs.Panel id="settings">…</Tabs.Panel>
</Tabs>`}
      controls={
        <>
          {paint.controls}
          <ControlSelect label="Orientation" value={orientation} options={[
            { value: 'horizontal', label: 'Horizontal' },
            { value: 'vertical', label: 'Vertical' },
          ]} onChange={value => setOrientation(value as 'horizontal' | 'vertical')} />
        </>
      }
    >
      <WindowScene title="Tabs">
        <Tabs value={view} onChange={setView} orientation={orientation} {...paint.props}>
          <Tabs.List aria-label="Program">
            <Tabs.Tab id="overview"><LayoutDashboard />Overview</Tabs.Tab>
            <Tabs.Tab id="activity"><Activity />Activity</Tabs.Tab>
            <Tabs.Tab id="settings"><Settings />Settings</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel id="overview" style={{ fontSize: '0.8125em' }}>Two Processes running.</Tabs.Panel>
          <Tabs.Panel id="activity" style={{ fontSize: '0.8125em' }}>Last synced a minute ago.</Tabs.Panel>
          <Tabs.Panel id="settings" style={{ fontSize: '0.8125em' }}>Start with the System: on.</Tabs.Panel>
        </Tabs>
      </WindowScene>
    </Showcase>
  );
}

type Row = { id: string; name: string; state: string; memory: string };
const rows: Row[] = [
  { id: 'notes', name: 'Notes', state: 'Running', memory: '148 MB' },
  { id: 'terminal', name: 'Terminal', state: 'Stopped', memory: '72 MB' },
  { id: 'settings', name: 'Settings', state: 'Running', memory: '96 MB' },
];

export function TableShowcase() {
  const paint = usePaintControls({ material: false, disabled: false });
  const disabledRow = useFlag('Disable Terminal', 'disabled');
  const [selected, setSelected] = useState<readonly string[] | 'all'>(['notes']);
  const [sort, setSort] = useState<{ column: string; direction: 'ascending' | 'descending' }>({ column: 'name', direction: 'ascending' });
  const sorted = useMemo(() => [...rows].sort((left, right) => {
    const key = sort.column as keyof Row;
    const result = left[key].localeCompare(right[key]);
    return sort.direction === 'ascending' ? result : -result;
  }), [sort]);

  return (
    <Showcase
      code={`<Table aria-label="Processes" selectionMode="multiple" value={selected} onChange={setSelected} sort={sort} onSortChange={setSort}${paint.code}>
  <Table.Header>
    <Table.Column id="name" rowHeader sortable>Name</Table.Column>
    <Table.Column id="state" sortable>State</Table.Column>
    <Table.Column id="memory" sortable>Memory</Table.Column>
  </Table.Header>
  <Table.Body items={sortedRows}>
    {row => (
      <Table.Row id={row.id}>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.state}</Table.Cell>
        <Table.Cell>{row.memory}</Table.Cell>
      </Table.Row>
    )}
  </Table.Body>
</Table>`}
      controls={<>{paint.controls}{disabledRow.control}</>}
    >
      <WindowScene title="Table">
        <ScrollArea axis="horizontal">
          <Table aria-label="Processes" selectionMode="multiple" value={selected} onChange={setSelected} sort={sort} onSortChange={setSort} {...paint.props}>
            <Table.Header>
              <Table.Column id="name" rowHeader sortable>Name</Table.Column>
              <Table.Column id="state" sortable>State</Table.Column>
              <Table.Column id="memory" sortable>Memory</Table.Column>
            </Table.Header>
            <Table.Body items={sorted} dependencies={[disabledRow.value]}>
              {row => (
                <Table.Row id={row.id} disabled={disabledRow.value && row.id === 'terminal'}>
                  <Table.Cell>{row.name}</Table.Cell>
                  <Table.Cell>{row.state}</Table.Cell>
                  <Table.Cell>{row.memory}</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </ScrollArea>
      </WindowScene>
    </Showcase>
  );
}

export function TreeShowcase() {
  const paint = usePaintControls({ material: false, disabled: false });
  const [expanded, setExpanded] = useState<readonly string[]>(['source', 'components']);
  const [selected, setSelected] = useState<string | null>('tree');

  return (
    <Showcase
      code={`<Tree aria-label="Files" selectionMode="single" value={selected} onChange={setSelected} expanded={expanded} onExpandedChange={setExpanded}${paint.code}>
  <Tree.Item id="source" textValue="source">
    <Tree.Content>source</Tree.Content>
    <Tree.Item id="components" textValue="components">
      <Tree.Content>components</Tree.Content>
      <Tree.Item id="tree" textValue="tree.tsx"><Tree.Content>tree.tsx</Tree.Content></Tree.Item>
    </Tree.Item>
  </Tree.Item>
</Tree>`}
      controls={paint.controls}
    >
      <WindowScene title="Tree">
        <Tree aria-label="Files" selectionMode="single" value={selected} onChange={setSelected} expanded={expanded} onExpandedChange={setExpanded} {...paint.props}>
          <Tree.Item id="source" textValue="source">
            <Tree.Content>source</Tree.Content>
            <Tree.Item id="components" textValue="components">
              <Tree.Content>components</Tree.Content>
              <Tree.Item id="tree" textValue="tree.tsx"><Tree.Content>tree.tsx</Tree.Content></Tree.Item>
              <Tree.Item id="surface" textValue="surface.tsx"><Tree.Content>surface.tsx</Tree.Content></Tree.Item>
            </Tree.Item>
            <Tree.Item id="main" textValue="main.ts"><Tree.Content>main.ts</Tree.Content></Tree.Item>
          </Tree.Item>
          <Tree.Item id="archive" textValue="archive" disabled>
            <Tree.Content>archive</Tree.Content>
          </Tree.Item>
        </Tree>
      </WindowScene>
    </Showcase>
  );
}
