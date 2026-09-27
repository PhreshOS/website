'use client';

import type { ReactNode } from 'react';
import { useAppearance } from '@phreshos/react-ui';
import { Select, Surface, Switch } from '../react-ui';
import { ComponentPreview } from '../component-preview';

export function Showcase({
  children,
  controls,
  code,
}: {
  children: ReactNode;
  controls?: ReactNode;
  code: string;
}) {
  return (
    <ComponentPreview code={code}>
      <ShowcaseLayout controls={controls}>{children}</ShowcaseLayout>
    </ComponentPreview>
  );
}

function ShowcaseLayout({
  children,
  controls,
}: {
  children: ReactNode;
  controls?: ReactNode;
}) {
  const appearance = useAppearance();

  return (
    <div
      className={['component-showcase', controls ? 'component-showcase-with-controls' : null].filter(Boolean).join(' ')}
      style={{ gap: appearance.spacing * 1.5 }}
    >
      <div className="component-showcase-scene">{children}</div>
      {controls ? <SurfaceControls>{controls}</SurfaceControls> : null}
    </div>
  );
}

function SurfaceControls({ children }: { children: ReactNode }) {
  const appearance = useAppearance();

  return (
    <Surface
      aria-label="Properties"
      className="component-showcase-controls"
      style={{
        display: 'grid',
        alignContent: 'start',
        gap: appearance.spacing,
        minWidth: 0,
        padding: appearance.spacing,
      }}
    >
      <span className="component-showcase-controls-title">Properties</span>
      <div className="component-showcase-controls-fields" style={{ gap: appearance.spacing }}>
        {children}
      </div>
    </Surface>
  );
}

export function ControlSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <Select
      label={label}
      size="small"
      value={value}
      onChange={next => {
        if (next !== null) onChange(next);
      }}
    >
      {options.map(option => <Select.Item key={option.value} id={option.value}>{option.label}</Select.Item>)}
    </Select>
  );
}

export function ControlSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return <Switch label={label} size="small" checked={checked} onChange={onChange} />;
}

/** The empty option leaves a property to the component's own default. */
export const unset = '';

/** Turns a control value into a prop value: the empty option means "omit it". */
export function optional<Value>(value: string): Value | undefined {
  return value === unset ? undefined : value as unknown as Value;
}

/** Writes ` name="value"` into example code only when the property is set. */
export function attribute(name: string, value: string | boolean | undefined) {
  if (value === undefined || value === unset || value === false) return '';
  return value === true ? ` ${name}` : ` ${name}="${value}"`;
}

export const colorOptions = [
  { value: unset, label: 'Default' },
  { value: 'default', label: 'Default color' },
  { value: 'background', label: 'Background' },
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'success', label: 'Success' },
  { value: 'warning', label: 'Warning' },
  { value: 'danger', label: 'Danger' },
  { value: 'info', label: 'Info' },
] as const;

export const sizeOptions = [
  { value: 'xsmall', label: 'Extra small' },
  { value: 'small', label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large', label: 'Large' },
  { value: 'xlarge', label: 'Extra large' },
] as const;

export const radiusOptions = [
  { value: unset, label: 'Default' },
  ...sizeOptions,
  { value: 'full', label: 'Full' },
] as const;

export const materialOptions = [
  { value: 'none', label: 'None' },
  { value: 'basic', label: 'Basic' },
  { value: 'extended', label: 'Extended' },
  { value: 'full', label: 'Full' },
] as const;

export const depthOptions = [
  { value: 'raised', label: 'Raised' },
  { value: 'flat', label: 'Flat' },
  { value: 'recessed', label: 'Recessed' },
] as const;
