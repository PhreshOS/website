'use client';

import { useState } from 'react';
import type { ScaleLevel } from '@phreshos/react-ui';
import { ColorArea, ColorField, ColorPicker, ColorSlider, ColorSwatch, ColorSwatchPicker, Flex } from '../react-ui';
import { WindowScene } from './frames';
import { useFlag } from './paint';
import { ControlSelect, Showcase, attribute, sizeOptions } from './showcase';

const presets = ['#f5b37d', '#d8483b', '#3f9a4e', '#1b9aa6', '#3f7de0', '#8b5cf6'];

function useSize() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  return {
    value: size,
    code: attribute('size', size === 'medium' ? undefined : size),
    control: <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />,
  };
}

export function ColorSwatchShowcase() {
  const size = useSize();
  return (
    <Showcase code={`<ColorSwatch color="primary"${size.code} />
<ColorSwatch color="#1b9aa6"${size.code} />
<ColorSwatch color="#3f7de080"${size.code} />`} controls={size.control}>
      <WindowScene title="Color Swatch">
        <Flex gap="small">
          <ColorSwatch color="primary" size={size.value} />
          <ColorSwatch color="#1b9aa6" size={size.value} />
          <ColorSwatch color="#3f7de080" size={size.value} />
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function ColorSwatchPickerShowcase() {
  const size = useSize();
  const [color, setColor] = useState(presets[0]!);
  return (
    <Showcase
      code={`<ColorSwatchPicker aria-label="Accent" value={color} onChange={setColor}${size.code}>
${presets.map(value => `  <ColorSwatchPicker.Item value="${value}" />`).join('\n')}
</ColorSwatchPicker>`}
      controls={size.control}
    >
      <WindowScene title="Color Swatch Picker">
        <ColorSwatchPicker aria-label="Accent" value={color} onChange={setColor} size={size.value}>
          {presets.map(value => <ColorSwatchPicker.Item key={value} value={value} />)}
        </ColorSwatchPicker>
        <span style={{ fontSize: '0.75em', opacity: 0.7 }}>Selected: {color}</span>
      </WindowScene>
    </Showcase>
  );
}

export function ColorSliderShowcase() {
  const size = useSize();
  const disabled = useFlag('Disabled', 'disabled');
  const [color, setColor] = useState('#f5b37d');
  return (
    <Showcase
      code={`<ColorSlider label="Hue" channel="hue" colorSpace="hsl" value={color} onChange={setColor}${size.code}${disabled.code} />
<ColorSlider label="Opacity" channel="alpha" value={color} onChange={setColor}${size.code}${disabled.code} />`}
      controls={<>{size.control}{disabled.control}</>}
    >
      <WindowScene title="Color Slider">
        <ColorSlider label="Hue" channel="hue" colorSpace="hsl" value={color} onChange={setColor} size={size.value} disabled={disabled.value} />
        <ColorSlider label="Opacity" channel="alpha" value={color} onChange={setColor} size={size.value} disabled={disabled.value} />
      </WindowScene>
    </Showcase>
  );
}

export function ColorAreaShowcase() {
  const disabled = useFlag('Disabled', 'disabled');
  const [color, setColor] = useState('#f5b37d');
  return (
    <Showcase
      code={`<ColorArea aria-label="Color" colorSpace="hsb" xChannel="saturation" yChannel="brightness" value={color} onChange={setColor}${disabled.code} />`}
      controls={disabled.control}
    >
      <WindowScene title="Color Area">
        <Flex gap="medium" align="center">
          <ColorArea aria-label="Color" colorSpace="hsb" xChannel="saturation" yChannel="brightness" value={color} onChange={setColor} disabled={disabled.value} />
          <Flex direction="column" gap="small">
            <ColorSwatch color={color} />
            <span style={{ fontSize: '0.75em', opacity: 0.7 }}>{color}</span>
          </Flex>
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function ColorFieldShowcase() {
  const size = useSize();
  const disabled = useFlag('Disabled', 'disabled');
  const [color, setColor] = useState<string | null>('#f5b37d');
  return (
    <Showcase
      code={`<ColorField label="Accent" value={color} onChange={setColor}${size.code}${disabled.code} />`}
      controls={<>{size.control}{disabled.control}</>}
    >
      <WindowScene title="Color Field">
        <ColorField label="Accent" value={color} onChange={setColor} size={size.value} disabled={disabled.value} description="A hex color, such as #f5b37d." />
      </WindowScene>
    </Showcase>
  );
}

export function ColorPickerShowcase() {
  const size = useSize();
  const [color, setColor] = useState('#f5b37d');
  return (
    <Showcase
      code={`<ColorPicker value={color} onChange={setColor}>
  <ColorPicker.Trigger${size.code}>Accent</ColorPicker.Trigger>
  <ColorPicker.Content>
    <ColorArea aria-label="Color" colorSpace="hsb" xChannel="saturation" yChannel="brightness" />
    <ColorSlider label="Hue" channel="hue" colorSpace="hsb" />
    <ColorSwatchPicker aria-label="Presets">
      {presets.map(value => <ColorSwatchPicker.Item key={value} value={value} />)}
    </ColorSwatchPicker>
    <ColorField aria-label="Hex" />
  </ColorPicker.Content>
</ColorPicker>`}
      controls={size.control}
    >
      <WindowScene title="Color Picker">
        <Flex gap="small" align="center">
          <ColorPicker value={color} onChange={setColor}>
            <ColorPicker.Trigger size={size.value}>Accent</ColorPicker.Trigger>
            <ColorPicker.Content>
              <ColorArea aria-label="Color" colorSpace="hsb" xChannel="saturation" yChannel="brightness" />
              <ColorSlider label="Hue" channel="hue" colorSpace="hsb" />
              <ColorSwatchPicker aria-label="Presets" size="small">
                {presets.map(value => <ColorSwatchPicker.Item key={value} value={value} />)}
              </ColorSwatchPicker>
              <ColorField aria-label="Hex" />
            </ColorPicker.Content>
          </ColorPicker>
          <span style={{ fontSize: '0.75em', opacity: 0.7 }}>{color}</span>
        </Flex>
      </WindowScene>
    </Showcase>
  );
}
