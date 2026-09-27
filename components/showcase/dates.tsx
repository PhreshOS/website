'use client';

import { useState } from 'react';
import { parseDate, parseTime } from '@internationalized/date';
import type { Color, MaterialMode, Radius, ScaleLevel } from '@phreshos/react-ui';
import { Calendar, DateField, DatePicker, DateRangePicker, RangeCalendar, TimeField } from '../react-ui';
import { WindowScene } from './frames';
import { ControlSelect, ControlSwitch, Showcase, attribute, colorOptions, materialOptions, optional, radiusOptions, sizeOptions, unset } from './showcase';

export function DateFieldShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);
  const [material, setMaterial] = useState<MaterialMode>('basic');
  const [radius, setRadius] = useState<string>(unset);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [date, setDate] = useState(() => parseDate('2026-09-21'));

  return (
    <Showcase
      code={`<DateField
  label="Due date"
  value={date}
  onChange={setDate}
  size="${size}"${color ? `
 ${attribute('color', color)}` : ''}${radius ? `
 ${attribute('radius', radius)}` : ''}
  material="${material}"${disabled ? '\n  disabled' : ''}${readOnly ? '\n  readOnly' : ''}${invalid ? '\n  invalid\n  errorMessage="Choose an available date."' : ''}
/>`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={value => setColor(value)} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />
          <ControlSelect label="Radius" value={radius} options={radiusOptions} onChange={value => setRadius(value)} />
          <ControlSelect label="Material" value={material} options={materialOptions} onChange={value => setMaterial(value as MaterialMode)} />
          <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
          <ControlSwitch label="Read only" checked={readOnly} onChange={setReadOnly} />
          <ControlSwitch label="Invalid" checked={invalid} onChange={setInvalid} />
        </>
      }
    >
      <WindowScene title="Date Field">
        <DateField
          label="Due date"
          value={date}
          onChange={next => next && setDate(next)}
          size={size}
          color={optional<Color>(color)}
          radius={optional<Radius>(radius)}
          material={material}
          disabled={disabled}
          readOnly={readOnly}
          invalid={invalid}
          errorMessage={invalid ? 'Choose an available date.' : undefined}
        />
      </WindowScene>
    </Showcase>
  );
}

export function TimeFieldShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);
  const [material, setMaterial] = useState<MaterialMode>('basic');
  const [radius, setRadius] = useState<string>(unset);
  const [granularity, setGranularity] = useState<'hour' | 'minute' | 'second'>('minute');
  const [hourCycle, setHourCycle] = useState<'locale' | '12' | '24'>('locale');
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [time, setTime] = useState(() => parseTime('09:30'));
  const resolvedHourCycle = hourCycle === 'locale' ? undefined : Number(hourCycle) as 12 | 24;

  return (
    <Showcase
      code={`<TimeField
  label="Start time"
  value={time}
  onChange={setTime}
  granularity="${granularity}"${resolvedHourCycle === undefined ? '' : `
  hourCycle={${resolvedHourCycle}}`}
  size="${size}"${color ? `
 ${attribute('color', color)}` : ''}${radius ? `
 ${attribute('radius', radius)}` : ''}
  material="${material}"${disabled ? '\n  disabled' : ''}${readOnly ? '\n  readOnly' : ''}${invalid ? '\n  invalid\n  errorMessage="Choose an available time."' : ''}
/>`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={value => setColor(value)} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />
          <ControlSelect label="Radius" value={radius} options={radiusOptions} onChange={value => setRadius(value)} />
          <ControlSelect label="Material" value={material} options={materialOptions} onChange={value => setMaterial(value as MaterialMode)} />
          <ControlSelect label="Smallest unit" value={granularity} options={[
            { value: 'hour', label: 'Hour' },
            { value: 'minute', label: 'Minute' },
            { value: 'second', label: 'Second' },
          ]} onChange={value => setGranularity(value as 'hour' | 'minute' | 'second')} />
          <ControlSelect label="Hour cycle" value={hourCycle} options={[
            { value: 'locale', label: 'From locale' },
            { value: '12', label: '12 hour' },
            { value: '24', label: '24 hour' },
          ]} onChange={value => setHourCycle(value as 'locale' | '12' | '24')} />
          <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
          <ControlSwitch label="Read only" checked={readOnly} onChange={setReadOnly} />
          <ControlSwitch label="Invalid" checked={invalid} onChange={setInvalid} />
        </>
      }
    >
      <WindowScene title="Time Field">
        <TimeField
          label="Start time"
          value={time}
          onChange={next => next && setTime(next)}
          granularity={granularity}
          hourCycle={resolvedHourCycle}
          size={size}
          color={optional<Color>(color)}
          radius={optional<Radius>(radius)}
          material={material}
          disabled={disabled}
          readOnly={readOnly}
          invalid={invalid}
          errorMessage={invalid ? 'Choose an available time.' : undefined}
        />
      </WindowScene>
    </Showcase>
  );
}

export function DatePickerShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);
  const [material, setMaterial] = useState<MaterialMode>('basic');
  const [radius, setRadius] = useState<string>(unset);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [date, setDate] = useState(() => parseDate('2026-09-21'));

  return (
    <Showcase
      code={`<DatePicker
  label="Appointment"
  value={date}
  onChange={setDate}
  size="${size}"${color ? `
 ${attribute('color', color)}` : ''}${radius ? `
 ${attribute('radius', radius)}` : ''}
  material="${material}"${disabled ? '\n  disabled' : ''}${readOnly ? '\n  readOnly' : ''}${invalid ? '\n  invalid\n  errorMessage="Choose an available date."' : ''}
/>`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={value => setColor(value)} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />
          <ControlSelect label="Radius" value={radius} options={radiusOptions} onChange={value => setRadius(value)} />
          <ControlSelect label="Material" value={material} options={materialOptions} onChange={value => setMaterial(value as MaterialMode)} />
          <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
          <ControlSwitch label="Read only" checked={readOnly} onChange={setReadOnly} />
          <ControlSwitch label="Invalid" checked={invalid} onChange={setInvalid} />
        </>
      }
    >
      <WindowScene title="Date Picker">
        <DatePicker
          label="Appointment"
          value={date}
          onChange={next => next && setDate(next)}
          size={size}
          color={optional<Color>(color)}
          radius={optional<Radius>(radius)}
          material={material}
          disabled={disabled}
          readOnly={readOnly}
          invalid={invalid}
          errorMessage={invalid ? 'Choose an available date.' : undefined}
        />
      </WindowScene>
    </Showcase>
  );
}

export function CalendarShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);
  const [radius, setRadius] = useState<string>(unset);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [date, setDate] = useState(() => parseDate('2026-09-21'));

  return (
    <Showcase
      code={`<Calendar
  aria-label="Release date"
  value={date}
  onChange={setDate}
  size="${size}"${color ? `
 ${attribute('color', color)}` : ''}${radius ? `
 ${attribute('radius', radius)}` : ''}
  style={{ justifySelf: "center" }}${disabled ? '\n  disabled' : ''}${readOnly ? '\n  readOnly' : ''}
/>`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={value => setColor(value)} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />
          <ControlSelect label="Radius" value={radius} options={radiusOptions} onChange={value => setRadius(value)} />
          <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
          <ControlSwitch label="Read only" checked={readOnly} onChange={setReadOnly} />
        </>
      }
    >
      <WindowScene title="Calendar">
        <Calendar
          aria-label="Release date"
          value={date}
          onChange={setDate}
          size={size}
          color={optional<Color>(color)}
          radius={optional<Radius>(radius)}
          style={{ justifySelf: 'center' }}
          disabled={disabled}
          readOnly={readOnly}
        />
      </WindowScene>
    </Showcase>
  );
}

export function RangeCalendarShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);
  const [radius, setRadius] = useState<string>(unset);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [range, setRange] = useState(() => ({
    start: parseDate('2026-09-21'),
    end: parseDate('2026-09-24'),
  }));

  return (
    <Showcase
      code={`<RangeCalendar
  aria-label="Trip dates"
  value={range}
  onChange={setRange}
  size="${size}"${color ? `
 ${attribute('color', color)}` : ''}${radius ? `
 ${attribute('radius', radius)}` : ''}
  style={{ justifySelf: "center" }}${disabled ? '\n  disabled' : ''}${readOnly ? '\n  readOnly' : ''}
/>`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={value => setColor(value)} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />
          <ControlSelect label="Radius" value={radius} options={radiusOptions} onChange={value => setRadius(value)} />
          <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
          <ControlSwitch label="Read only" checked={readOnly} onChange={setReadOnly} />
        </>
      }
    >
      <WindowScene title="Range Calendar">
        <RangeCalendar
          aria-label="Trip dates"
          value={range}
          onChange={setRange}
          size={size}
          color={optional<Color>(color)}
          radius={optional<Radius>(radius)}
          style={{ justifySelf: 'center' }}
          disabled={disabled}
          readOnly={readOnly}
        />
      </WindowScene>
    </Showcase>
  );
}

export function DateRangePickerShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  const [color, setColor] = useState<string>(unset);
  const [material, setMaterial] = useState<MaterialMode>('basic');
  const [radius, setRadius] = useState<string>(unset);
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [range, setRange] = useState(() => ({
    start: parseDate('2026-09-21'),
    end: parseDate('2026-09-24'),
  }));

  return (
    <Showcase
      code={`<DateRangePicker
  label="Trip dates"
  value={range}
  onChange={setRange}
  size="${size}"${color ? `
 ${attribute('color', color)}` : ''}${radius ? `
 ${attribute('radius', radius)}` : ''}
  material="${material}"${disabled ? '\n  disabled' : ''}${readOnly ? '\n  readOnly' : ''}${invalid ? '\n  invalid\n  errorMessage="Choose an available range."' : ''}
/>`}
      controls={
        <>
          <ControlSelect label="Color" value={color} options={colorOptions} onChange={value => setColor(value)} />
          <ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />
          <ControlSelect label="Radius" value={radius} options={radiusOptions} onChange={value => setRadius(value)} />
          <ControlSelect label="Material" value={material} options={materialOptions} onChange={value => setMaterial(value as MaterialMode)} />
          <ControlSwitch label="Disabled" checked={disabled} onChange={setDisabled} />
          <ControlSwitch label="Read only" checked={readOnly} onChange={setReadOnly} />
          <ControlSwitch label="Invalid" checked={invalid} onChange={setInvalid} />
        </>
      }
    >
      <WindowScene title="Date Range Picker">
        <DateRangePicker
          label="Trip dates"
          value={range}
          onChange={next => next && setRange(next)}
          size={size}
          color={optional<Color>(color)}
          radius={optional<Radius>(radius)}
          material={material}
          disabled={disabled}
          readOnly={readOnly}
          invalid={invalid}
          errorMessage={invalid ? 'Choose an available range.' : undefined}
        />
      </WindowScene>
    </Showcase>
  );
}
