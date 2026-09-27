'use client';

import { useState } from 'react';
import type { Color, ScaleLevel } from '@phreshos/react-ui';
import { Alert, ProgressBar, Slider, Spinner } from '../react-ui';
import { WindowScene } from './frames';
import { ControlSelect, ControlSwitch, Showcase, attribute, colorOptions, optional, sizeOptions, unset } from './showcase';

export function ProgressBarShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);
  const [indeterminate, setIndeterminate] = useState(false);
  const [value, setValue] = useState(64);

  return (
    <Showcase
      code={indeterminate
        ? `<ProgressBar label="Uploading archive" indeterminate size="${size}"${attribute('color', color)} />`
        : `<ProgressBar label="Uploading archive" value={${value}} size="${size}"${attribute('color', color)} />`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={next => setColor(next)} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={next => setSize(next as ScaleLevel)} />
          <Slider label="Value" size="small" value={value} onChange={setValue} disabled={indeterminate} />
          <ControlSwitch label="Indeterminate" checked={indeterminate} onChange={setIndeterminate} />
        </>
      }
    >
      <WindowScene title="Progress Bar">
        <ProgressBar
          label="Uploading archive"
          value={value}
          size={size}
          color={optional<Color>(color)}
          indeterminate={indeterminate}
        />
      </WindowScene>
    </Showcase>
  );
}

export function SpinnerShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);

  return (
    <Showcase
      code={`<Spinner label="Loading workspace" size="${size}"${attribute('color', color)} />`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={next => setColor(next)} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={next => setSize(next as ScaleLevel)} />
        </>
      }
    >
      <WindowScene title="Spinner">
        <Spinner label="Loading workspace" size={size} color={optional<Color>(color)} />
      </WindowScene>
    </Showcase>
  );
}

export function AlertShowcase() {
  const [color, setColor] = useState<string>('danger');

  return (
    <Showcase
      code={`<Alert color="${color}" title="Could not save">
  The System refused the change. Try again in a moment.
</Alert>`}
      controls={<ControlSelect label="Color" value={color} options={[
        { value: 'info', label: 'Info' },
        { value: 'success', label: 'Success' },
        { value: 'warning', label: 'Warning' },
        { value: 'danger', label: 'Danger' },
      ]} onChange={setColor} />}
    >
      <WindowScene title="Alert">
        <Alert color={color} title="Could not save">The System refused the change. Try again in a moment.</Alert>
      </WindowScene>
    </Showcase>
  );
}
