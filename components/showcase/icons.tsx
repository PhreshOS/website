'use client';

import { useState } from 'react';
import type { ScaleLevel } from '@phreshos/react-ui';
import { Activity, Bell, Calendar, Check, ChevronDown, Copy, Download, Folder, Image, Lock, Monitor, Moon, Palette, Pencil, Search, Settings, Sun, Trash2, Upload, User } from '@phreshos/react-ui/icons';
import { Button, Flex, Grid } from '../react-ui';
import { WindowScene } from './frames';
import { ControlSelect, Showcase, attribute, sizeOptions } from './showcase';

const icons = { Activity, Bell, Calendar, Check, ChevronDown, Copy, Download, Folder, Image, Lock, Monitor, Moon, Palette, Pencil, Search, Settings, Sun, Trash2, Upload, User };

export function IconsShowcase() {
  const [size, setSize] = useState<ScaleLevel>('medium');
  return (
    <Showcase
      code={`import { Palette, Search, Trash2 } from "@phreshos/react-ui/icons"

<Button${attribute('size', size === 'medium' ? undefined : size)}><Palette />Appearance</Button>
<Button color="danger"${attribute('size', size === 'medium' ? undefined : size)}><Trash2 />Delete</Button>
<Palette />`}
      controls={<ControlSelect label="Size" value={size} options={sizeOptions} onChange={value => setSize(value as ScaleLevel)} />}
    >
      <WindowScene title="Icons">
        <Flex gap="small" wrap>
          <Button size={size}><Palette />Appearance</Button>
          <Button size={size} color="primary"><Download />Install</Button>
          <Button size={size} color="danger"><Trash2 />Delete</Button>
          <Button size={size} aria-label="Settings"><Settings /></Button>
        </Flex>
        <Grid columns="repeat(auto-fill, minmax(4.5rem, 1fr))" gap="small" style={{ fontSize: '1.25em' }}>
          {Object.entries(icons).map(([name, Icon]) => (
            <Flex key={name} direction="column" align="center" gap="xsmall" title={name}>
              <Icon />
              <span style={{ fontSize: '0.5em', opacity: 0.6 }}>{name}</span>
            </Flex>
          ))}
        </Grid>
      </WindowScene>
    </Showcase>
  );
}
