'use client';

import { useEffect, useState } from 'react';
import type { Color, MaterialMode, ScaleLevel } from '@phreshos/react-ui';
import { Bot } from '@phreshos/react-ui/icons';
import { Avatar, Badge, Breadcrumbs, Button, Code, Flex, Heading, Input, Kbd, Link, Loading, Meter, Readiness, SearchField, Skeleton, Slider, Spinner, TagGroup, Text, ToastRegion, toast, useRequirement } from '../react-ui';
import type { ReadinessState } from '@phreshos/react-ui';
import { WindowScene } from './frames';
import { ControlSelect, ControlSwitch, Showcase, attribute, colorOptions, materialOptions, optional, sizeOptions, unset } from './showcase';

export function LinkShowcase() {
  const [color, setColor] = useState<string>(unset);
  return (
    <Showcase
      code={`<Text>Read the <Link href="/docs/system/security/permissions"${attribute('color', color)}>permissions guide</Link> first.</Text>`}
      controls={<ControlSelect label="Color" value={color} options={colorOptions} onChange={setColor} />}
    >
      <WindowScene title="Link">
        <Text>Read the <Link href="/docs/system/security/permissions" color={optional<Color>(color)}>permissions guide</Link> before you grant a Program access to your files.</Text>
      </WindowScene>
    </Showcase>
  );
}

export function TypographyShowcase() {
  const [size, setSize] = useState<string>(unset);
  return (
    <Showcase
      code={`<Heading level={2}${attribute('size', size)}>Appearance</Heading>
<Text tone="secondary">Colors, spacing, and material.</Text>
<Text>Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> or run <Code>phresh dev</Code>.</Text>`}
      controls={<ControlSelect label="Heading size" value={size} options={[{ value: unset, label: 'From level' }, ...sizeOptions]} onChange={setSize} />}
    >
      <WindowScene title="Text">
        <Flex direction="column" gap="small">
          <Heading level={2} size={optional<ScaleLevel>(size)}>Appearance</Heading>
          <Text tone="secondary">Colors, spacing, and material.</Text>
          <Text>Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> or run <Code>phresh dev</Code>.</Text>
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function BadgeShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [dot, setDot] = useState(true);
  return (
    <Showcase
      code={`<Badge color="success"${dot ? ' dot' : ''}${attribute('size', size === 'medium' ? undefined : size)}>running</Badge>
<Badge color="danger"${dot ? ' dot' : ''}>stopped</Badge>
<Badge>idle</Badge>`}
      controls={<>
        <ControlSelect label="Size" value={size} options={sizeOptions} onChange={next => setSize(next as ScaleLevel)} />
        <ControlSwitch label="Dot" checked={dot} onChange={setDot} />
      </>}
    >
      <WindowScene title="Badge">
        <Flex gap="small" wrap align="center">
          <Badge color="success" dot={dot} size={size}>running</Badge>
          <Badge color="warning" dot={dot} size={size}>restarting</Badge>
          <Badge color="danger" dot={dot} size={size}>stopped</Badge>
          <Badge size={size}>idle</Badge>
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function MeterShowcase() {
  const [value, setValue] = useState(72);
  const [size, setSize] = useState<ScaleLevel>('medium');
  return (
    <Showcase
      code={`<Meter label="Disk" value={${value}} warning={0.7} danger={0.9}${attribute('size', size === 'medium' ? undefined : size)} />`}
      controls={<>
        <Slider label="Value" size="small" value={value} onChange={setValue} />
        <ControlSelect label="Size" value={size} options={sizeOptions} onChange={next => setSize(next as ScaleLevel)} />
      </>}
    >
      <WindowScene title="Meter">
        <Meter label="Disk" value={value} warning={0.7} danger={0.9} size={size} />
      </WindowScene>
    </Showcase>
  );
}

export function SearchFieldShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  return (
    <Showcase
      code={`<SearchField aria-label="Search processes" placeholder="Search processes"${attribute('size', size === 'medium' ? undefined : size)} />`}
      controls={<ControlSelect label="Size" value={size} options={sizeOptions} onChange={next => setSize(next as ScaleLevel)} />}
    >
      <WindowScene title="Search Field">
        <SearchField aria-label="Search processes" placeholder="Search processes" size={size} defaultValue="terminal" />
      </WindowScene>
    </Showcase>
  );
}

export function BreadcrumbsShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  return (
    <Showcase
      code={`<Breadcrumbs${attribute('size', size === 'medium' ? undefined : size)}>
  <Breadcrumbs.Item href="/docs">Docs</Breadcrumbs.Item>
  <Breadcrumbs.Item href="/docs/system">System</Breadcrumbs.Item>
  <Breadcrumbs.Item>Permissions</Breadcrumbs.Item>
</Breadcrumbs>`}
      controls={<ControlSelect label="Size" value={size} options={sizeOptions} onChange={next => setSize(next as ScaleLevel)} />}
    >
      <WindowScene title="Breadcrumbs">
        <Breadcrumbs size={size}>
          <Breadcrumbs.Item href="#">Docs</Breadcrumbs.Item>
          <Breadcrumbs.Item href="#">System</Breadcrumbs.Item>
          <Breadcrumbs.Item>Permissions</Breadcrumbs.Item>
        </Breadcrumbs>
      </WindowScene>
    </Showcase>
  );
}

export function AvatarShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  return (
    <Showcase
      code={`<Avatar name="Ada Lovelace"${attribute('size', size === 'medium' ? undefined : size)} />
<Avatar name="Lemo" color="info"><Bot /></Avatar>`}
      controls={<ControlSelect label="Size" value={size} options={sizeOptions} onChange={next => setSize(next as ScaleLevel)} />}
    >
      <WindowScene title="Avatar">
        <Flex gap="small" align="center">
          <Avatar name="Ada Lovelace" size={size} />
          <Avatar name="Grace Hopper" size={size} />
          <Avatar name="Alan Turing" size={size} />
          <Avatar name="Lemo" color="info" size={size}><Bot /></Avatar>
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function TagGroupShowcase() {
  const [tags, setTags] = useState(['running', 'restarting', 'stopped']);
  const [size, setSize] = useState<ScaleLevel>('medium');
  return (
    <Showcase
      code={`<TagGroup label="Filters" onRemove={keys => remove(keys)}${attribute('size', size === 'medium' ? undefined : size)}>
  <TagGroup.Tag id="running">running</TagGroup.Tag>
  <TagGroup.Tag id="stopped">stopped</TagGroup.Tag>
</TagGroup>`}
      controls={<>
        <ControlSelect label="Size" value={size} options={sizeOptions} onChange={next => setSize(next as ScaleLevel)} />
        <Button size="small" onPress={() => setTags(['running', 'restarting', 'stopped'])}>Reset</Button>
      </>}
    >
      <WindowScene title="Tag Group">
        <TagGroup label="Filters" size={size} onRemove={keys => setTags(current => current.filter(tag => !keys.has(tag)))}>
          {tags.map(tag => <TagGroup.Tag key={tag} id={tag}>{tag}</TagGroup.Tag>)}
        </TagGroup>
      </WindowScene>
    </Showcase>
  );
}

export function SkeletonShowcase() {
  const [lines, setLines] = useState(3);
  return (
    <Showcase
      code={`<Skeleton style={{ width: 48, height: 48 }} radius="full" />
<Skeleton lines={${lines}} />`}
      controls={<Slider label="Lines" size="small" minValue={1} maxValue={6} value={lines} onChange={setLines} />}
    >
      <WindowScene title="Skeleton">
        <Flex gap="medium" align="start">
          <Skeleton style={{ width: 48, height: 48, flexShrink: 0 }} radius="full" />
          <Skeleton lines={lines} style={{ flex: 1 }} />
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function ToastShowcase() {
  const [color, setColor] = useState<string>('success');
  return (
    <Showcase
      code={`toast.show({ title: "Saved", description: "Your Appearance is in place.", color: "${color}" }, { timeout: 5000 })

<ToastRegion />`}
      controls={<ControlSelect label="Color" value={color} options={[
        { value: 'info', label: 'Info' },
        { value: 'success', label: 'Success' },
        { value: 'warning', label: 'Warning' },
        { value: 'danger', label: 'Danger' },
      ]} onChange={setColor} />}
    >
      <WindowScene title="Toast">
        <Button onPress={() => toast.show({ title: 'Saved', description: 'Your Appearance is in place.', color }, { timeout: 5000 })}>Show a Toast</Button>
        <ToastRegion />
      </WindowScene>
    </Showcase>
  );
}

/** A new run remounts this requirement, so it starts unready without resetting state in an effect. */
function Work({ after, detail }: { after: number; detail: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setDone(true), after);
    return () => clearTimeout(timer);
  }, [after]);
  useRequirement(done, detail);
  return null;
}

function Cover({ ready, requirements, onSkip }: ReadinessState<string> & { onSkip: () => void }) {
  if (ready) return null;
  const message = requirements.find((requirement) => !requirement.ready)?.detail;
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="small"
      style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, Canvas 75%, transparent)' }}
    >
      <Spinner decorative />
      <Text tone="secondary">{message}</Text>
      <Button size="small" onPress={onSkip}>Skip</Button>
    </Flex>
  );
}

export function ReadinessShowcase() {
  const [run, setRun] = useState(0);
  const [skipped, setSkipped] = useState(-1);
  const waiting = skipped !== run;
  return (
    <Showcase
      code={`<Readiness status={state => <Cover {...state} onSkip={skip} />}>
  <Work detail="Connecting…" />
  <Work detail="Loading settings…" />
  <Input label="Name" />
  <Button>Save</Button>
</Readiness>

function Work({ detail }) {
  const done = useWork()
  useRequirement(done, detail)
  return null
}`}
      controls={<Button size="small" onPress={() => setRun((value) => value + 1)}>Load again</Button>}
    >
      <WindowScene title="Readiness">
        <Readiness<string> status={(state) => <Cover {...state} onSkip={() => setSkipped(run)} />}>
          {waiting && <Work key={`connecting-${run}`} after={1200} detail="Connecting…" />}
          {waiting && <Work key={`settings-${run}`} after={2600} detail="Loading settings…" />}
          <Input label="Name" defaultValue="Ada" />
          <Button onPress={() => toast.show({ title: 'Saved', color: 'success' }, { timeout: 5000 })}>Save</Button>
        </Readiness>
        <ToastRegion />
      </WindowScene>
    </Showcase>
  );
}

export function LoadingShowcase() {
  const [run, setRun] = useState(0);
  const [material, setMaterial] = useState<string>('basic');
  const [color, setColor] = useState<string>(unset);
  const [steps, setSteps] = useState(false);
  const [delay, setDelay] = useState(0);
  return (
    <Showcase
      code={`<Loading material="${material}"${attribute('color', color)}${steps ? ' steps' : ''}${delay > 0 ? ` delay={${delay}}` : ''}>
  <Settings />
</Loading>

// inside Settings and its children:
useRequirement(connected, "Connecting")
useRequirement(settingsLoaded, "Loading settings")
useRequirement(wallpaperLoaded, "Loading wallpaper")`}
      controls={
        <Flex direction="column" gap="small">
          <ControlSelect label="Material" value={material} options={materialOptions} onChange={setMaterial} />
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={setColor} />
          <ControlSwitch label="Steps" checked={steps} onChange={setSteps} />
          <Slider label="Delay" size="small" minValue={0} maxValue={1000} step={100} value={delay} onChange={setDelay} />
          <Button size="small" onPress={() => setRun((value) => value + 1)}>Load again</Button>
        </Flex>
      }
    >
      <WindowScene title="Settings" contentStyle={{ minHeight: 180 }}>
        <Loading key={run} material={material as MaterialMode} color={optional<Color>(color)} steps={steps} delay={delay}>
          <Work after={900} detail="Connecting" />
          <Work after={1800} detail="Loading settings" />
          <Work after={2700} detail="Loading wallpaper" />
          <Input label="Name" defaultValue="Ada" />
          <Button>Save</Button>
        </Loading>
      </WindowScene>
    </Showcase>
  );
}
