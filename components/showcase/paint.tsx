'use client';

import { useState, type ReactNode } from 'react';
import type { Color, MaterialMode, Radius, ScaleLevel } from '@phreshos/react-ui';
import {
  ControlSelect,
  ControlSwitch,
  attribute,
  colorOptions,
  materialOptions,
  optional,
  radiusOptions,
  sizeOptions,
  unset,
} from './showcase';

type PaintFeatures = Readonly<{
  radius?: boolean;
  material?: boolean;
  disabled?: boolean;
}>;

/**
 * The shared paint controls every painted component exposes: color, size,
 * radius, material, and disabled. Unset controls leave the component on its
 * own defaults, and are left out of the example code.
 */
export function usePaintControls(features: PaintFeatures = {}) {
  const { radius: withRadius = false, material: withMaterial = true, disabled: withDisabled = true } = features;
  const [color, setColor] = useState<string>(unset);
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [radius, setRadius] = useState<string>(unset);
  const [material, setMaterial] = useState<MaterialMode>('basic');
  const [disabled, setDisabled] = useState(false);

  const props = {
    color: optional<Color>(color),
    size,
    ...(withRadius ? { radius: optional<Radius>(radius) } : {}),
    ...(withMaterial ? { material } : {}),
    ...(withDisabled ? { disabled } : {}),
  };

  const code = [
    attribute('color', color),
    attribute('size', size === 'medium' ? undefined : size),
    withRadius ? attribute('radius', radius) : '',
    withMaterial ? attribute('material', material === 'basic' ? undefined : material) : '',
    withDisabled ? attribute('disabled', disabled) : '',
  ].join('');

  const controls: ReactNode = (
    <>
      <ControlSelect label="Color" value={color} options={colorOptions} onChange={setColor} />
      <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />
      {withRadius ? <ControlSelect label="Radius" value={radius} options={radiusOptions} onChange={setRadius} /> : null}
      {withMaterial ? <ControlSelect label="Material" value={material} options={materialOptions} onChange={value => setMaterial(value as MaterialMode)} /> : null}
      {withDisabled ? <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} /> : null}
    </>
  );

  return { props, code, controls, disabled };
}

/** A boolean control that also writes its attribute into the example code. */
export function useFlag(label: string, name: string, initial = false) {
  const [value, setValue] = useState(initial);
  return {
    value,
    code: attribute(name, value),
    control: <ControlSwitch label={label} checked={value} onChange={setValue} />,
  };
}
