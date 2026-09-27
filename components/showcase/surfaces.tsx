'use client';

import { useState } from 'react';
import type { Color, MaterialMode, Radius, SurfaceDepth } from '@phreshos/react-ui';
import { Button, Flex, Panel, Surface, Window } from '../react-ui';
import {
  ControlSelect,
  ControlSwitch,
  Showcase,
  attribute,
  colorOptions,
  depthOptions,
  materialOptions,
  optional,
  radiusOptions,
  unset,
} from './showcase';

export function SurfaceShowcase() {
  const [depth, setDepth] = useState<SurfaceDepth>('raised');
  const [color, setColor] = useState<string>(unset);
  const [radius, setRadius] = useState<string>(unset);
  const [material, setMaterial] = useState<MaterialMode>('basic');
  const [shadow, setShadow] = useState(true);

  return (
    <Showcase
      code={`<Surface${attribute('depth', depth === 'raised' ? undefined : depth)}${attribute('color', color)}${attribute('radius', radius)}${attribute('material', material === 'basic' ? undefined : material)}${shadow ? '' : ' shadow={false}'}>
  …
</Surface>`}
      controls={
        <>
          <ControlSelect label="Depth" value={depth} options={depthOptions} onChange={value => setDepth(value as SurfaceDepth)} />
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={setColor} />
          <ControlSelect label="Radius" value={radius} options={radiusOptions} onChange={setRadius} />
          <ControlSelect label="Material" value={material} options={materialOptions} onChange={value => setMaterial(value as MaterialMode)} />
          <ControlSwitch label="Shadow" checked={shadow} onChange={setShadow} />
        </>
      }
    >
      <Surface
        depth={depth}
        color={optional<Color>(color)}
        radius={optional<Radius>(radius)}
        material={material}
        shadow={shadow}
        style={{ width: 'min(100%, 22rem)', padding: 20, display: 'grid', gap: 12 }}
      >
        <strong>Storage</strong>
        <span style={{ fontSize: '0.8125em' }}>4.2 GB of 64 GB used on this machine.</span>
        <Flex justify="end"><Button color="primary">Manage</Button></Flex>
      </Surface>
    </Showcase>
  );
}

export function PanelShowcase() {
  const [color, setColor] = useState<string>(unset);
  const [material, setMaterial] = useState<MaterialMode>('basic');
  const [header, setHeader] = useState(true);

  return (
    <Showcase
      code={`<Panel${attribute('color', color)}${attribute('material', material === 'basic' ? undefined : material)}>
${header ? '  <Panel.Header>Connection</Panel.Header>\n' : ''}  <Panel.Content>Ready on this Desktop.</Panel.Content>
</Panel>`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={setColor} />
          <ControlSelect label="Material" value={material} options={materialOptions} onChange={value => setMaterial(value as MaterialMode)} />
          <ControlSwitch label="Header" checked={header} onChange={setHeader} />
        </>
      }
    >
      <Panel color={optional<Color>(color)} material={material} style={{ width: 'min(100%, 22rem)' }}>
        {header ? <Panel.Header>Connection</Panel.Header> : null}
        <Panel.Content style={{ display: 'grid', gap: 12 }}>
          <span style={{ fontSize: '0.8125em' }}>Ready on this Desktop.</span>
          <Flex><Button size="small">Reconnect</Button></Flex>
        </Panel.Content>
      </Panel>
    </Showcase>
  );
}

export function WindowShowcase() {
  const [active, setActive] = useState(true);
  const [maximized, setMaximized] = useState(false);
  const [material, setMaterial] = useState<MaterialMode>('basic');

  return (
    <Showcase
      code={`<Window${attribute('material', material === 'basic' ? undefined : material)}>
  <Window.Header active={${active}} maximized={maximized} onMaximize={toggleMaximize}>
    <Window.Header.Identity title="Notes" />
    <Window.Header.Center />
    <Window.Header.Actions>
      <Window.Header.Minimize onPress={minimize} />
      <Window.Header.Maximize />
      <Window.Header.Close onPress={close} />
    </Window.Header.Actions>
  </Window.Header>
  <Window.Content>…</Window.Content>
</Window>`}
      controls={
        <>
          <ControlSelect label="Material" value={material} options={materialOptions} onChange={value => setMaterial(value as MaterialMode)} />
          <ControlSwitch label="Active" checked={active} onChange={setActive} />
          <ControlSwitch label="Maximized" checked={maximized} onChange={setMaximized} />
        </>
      }
    >
      <Window material={material} style={{ width: 'min(100%, 26rem)' }}>
        <Window.Header active={active} maximized={maximized} onMaximize={() => setMaximized(value => !value)}>
          <Window.Header.Identity title="Notes" />
          <Window.Header.Center />
          <Window.Header.Actions>
            <Window.Header.Minimize />
            <Window.Header.Maximize />
            <Window.Header.Close />
          </Window.Header.Actions>
        </Window.Header>
        <Window.Content style={{ padding: 18, fontSize: '0.8125em' }}>
          Three notes, last edited a minute ago.
        </Window.Content>
      </Window>
    </Showcase>
  );
}
