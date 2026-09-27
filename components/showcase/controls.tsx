'use client';

import { useState } from 'react';
import { Monitor, Moon, Save, Sun } from '@phreshos/react-ui/icons';
import { Button, Checkbox, Flex, Input, NumberField, RadioGroup, SegmentedControl, Slider, Switch, Textarea } from '../react-ui';
import { WindowScene } from './frames';
import { usePaintControls, useFlag } from './paint';
import { ControlSelect, Showcase, attribute } from './showcase';

export function ButtonShowcase() {
  const paint = usePaintControls({ radius: true });
  const pending = useFlag('Pending', 'pending');
  // Size sets the whole row; color and the rest change only the main action.
  const size = attribute('size', paint.props.size === 'medium' ? undefined : paint.props.size);

  return (
    <Showcase
      code={`<Flex gap="small" justify="end">
  <Button${size}>Cancel</Button>
  <Button${paint.code}${pending.code} onPress={save}><Save />Save</Button>
</Flex>`}
      controls={<>{paint.controls}{pending.control}</>}
    >
      <WindowScene title="Button">
        <span style={{ fontSize: '0.8125em' }}>Save this note to the Program’s data?</span>
        <Flex gap="small" justify="end">
          <Button size={paint.props.size}>Cancel</Button>
          <Button {...paint.props} pending={pending.value}><Save />Save</Button>
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function InputShowcase() {
  const paint = usePaintControls({ radius: true });
  const invalid = useFlag('Invalid', 'invalid');
  const readOnly = useFlag('Read only', 'readOnly');
  const [name, setName] = useState('Notes');

  return (
    <Showcase
      code={`<Input label="Name" value={name} onChange={setName}${paint.code}${readOnly.code}${invalid.code}${invalid.value ? ' errorMessage="Enter a name."' : ''} />`}
      controls={<>{paint.controls}{readOnly.control}{invalid.control}</>}
    >
      <WindowScene title="Input">
        <Input
          label="Name"
          description="Shown in the Desktop."
          value={name}
          onChange={setName}
          {...paint.props}
          readOnly={readOnly.value}
          invalid={invalid.value}
          errorMessage="Enter a name."
        />
      </WindowScene>
    </Showcase>
  );
}

export function TextareaShowcase() {
  const paint = usePaintControls({ radius: true });
  const invalid = useFlag('Invalid', 'invalid');
  const readOnly = useFlag('Read only', 'readOnly');
  const [notes, setNotes] = useState('Remember to back up the Program data folder.');

  return (
    <Showcase
      code={`<Textarea label="Notes" value={notes} onChange={setNotes}${paint.code}${readOnly.code}${invalid.code} />`}
      controls={<>{paint.controls}{readOnly.control}{invalid.control}</>}
    >
      <WindowScene title="Textarea">
        <Textarea
          label="Notes"
          value={notes}
          onChange={setNotes}
          {...paint.props}
          readOnly={readOnly.value}
          invalid={invalid.value}
          errorMessage="Enter a note."
        />
      </WindowScene>
    </Showcase>
  );
}

export function CheckboxShowcase() {
  const paint = usePaintControls();
  const indeterminate = useFlag('Indeterminate', 'indeterminate');
  const [checked, setChecked] = useState(true);

  return (
    <Showcase
      code={`<Checkbox label="Show notifications" checked={checked} onChange={setChecked}${paint.code}${indeterminate.code} />`}
      controls={<>{paint.controls}{indeterminate.control}</>}
    >
      <WindowScene title="Checkbox">
        <Checkbox label="Show notifications" checked={checked} onChange={setChecked} {...paint.props} indeterminate={indeterminate.value} />
        <Checkbox label="Play a sound" {...paint.props} />
      </WindowScene>
    </Showcase>
  );
}

export function SwitchShowcase() {
  const paint = usePaintControls();
  const [checked, setChecked] = useState(true);

  return (
    <Showcase
      code={`<Switch label="Start with the System" checked={checked} onChange={setChecked}${paint.code} />`}
      controls={paint.controls}
    >
      <WindowScene title="Switch">
        <Switch label="Start with the System" checked={checked} onChange={setChecked} {...paint.props} />
        <Switch label="Keep running in the background" {...paint.props} />
      </WindowScene>
    </Showcase>
  );
}

export function RadioGroupShowcase() {
  const paint = usePaintControls();
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [channel, setChannel] = useState<string | null>('stable');

  return (
    <Showcase
      code={`<RadioGroup label="Release channel" value={channel} onChange={setChannel}${orientation === 'vertical' ? '' : ' orientation="horizontal"'}${paint.code}>
  <RadioGroup.Item value="stable" label="Stable" />
  <RadioGroup.Item value="preview" label="Preview" />
</RadioGroup>`}
      controls={
        <>
          {paint.controls}
          <ControlSelect label="Orientation" value={orientation} options={[
            { value: 'vertical', label: 'Vertical' },
            { value: 'horizontal', label: 'Horizontal' },
          ]} onChange={value => setOrientation(value as 'vertical' | 'horizontal')} />
        </>
      }
    >
      <WindowScene title="Radio Group">
        <RadioGroup label="Release channel" value={channel} onChange={setChannel} orientation={orientation} {...paint.props}>
          <RadioGroup.Item value="stable" label="Stable" description="Tested releases" />
          <RadioGroup.Item value="preview" label="Preview" description="New features first" />
        </RadioGroup>
      </WindowScene>
    </Showcase>
  );
}

export function SliderShowcase() {
  const paint = usePaintControls({ material: false });
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [volume, setVolume] = useState(40);

  return (
    <Showcase
      code={`<Slider label="Volume" value={volume} onChange={setVolume}${orientation === 'horizontal' ? '' : ' orientation="vertical"'}${paint.code} />`}
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
      <WindowScene title="Slider">
        <Slider
          label="Volume"
          value={volume}
          onChange={setVolume}
          orientation={orientation}
          {...paint.props}
          style={orientation === 'vertical' ? { height: 160 } : undefined}
        />
      </WindowScene>
    </Showcase>
  );
}

export function NumberFieldShowcase() {
  const paint = usePaintControls({ radius: true });
  const [duration, setDuration] = useState<number | null>(120);

  return (
    <Showcase
      code={`<NumberField
  label="Duration"
  value={duration}
  onChange={setDuration}
  minValue={0}
  maxValue={1000}
  step={10}
  formatOptions={{ style: "unit", unit: "millisecond" }}${paint.code}
/>`}
      controls={paint.controls}
    >
      <WindowScene title="Number Field">
        <NumberField
          label="Duration"
          description="How long each visual change takes."
          value={duration}
          onChange={setDuration}
          minValue={0}
          maxValue={1000}
          step={10}
          formatOptions={{ style: 'unit', unit: 'millisecond' }}
          {...paint.props}
        />
      </WindowScene>
    </Showcase>
  );
}

export function SegmentedControlShowcase() {
  const paint = usePaintControls({ radius: true });
  const [theme, setTheme] = useState('system');

  return (
    <Showcase
      code={`<SegmentedControl label="Theme" value={theme} onChange={setTheme}${paint.code}>
  <SegmentedControl.Item id="system"><Monitor />System</SegmentedControl.Item>
  <SegmentedControl.Item id="light"><Sun />Light</SegmentedControl.Item>
  <SegmentedControl.Item id="dark"><Moon />Dark</SegmentedControl.Item>
</SegmentedControl>`}
      controls={paint.controls}
    >
      <WindowScene title="Segmented Control">
        <SegmentedControl label="Theme" value={theme} onChange={setTheme} {...paint.props}>
          <SegmentedControl.Item id="system"><Monitor />System</SegmentedControl.Item>
          <SegmentedControl.Item id="light"><Sun />Light</SegmentedControl.Item>
          <SegmentedControl.Item id="dark"><Moon />Dark</SegmentedControl.Item>
        </SegmentedControl>
      </WindowScene>
    </Showcase>
  );
}
