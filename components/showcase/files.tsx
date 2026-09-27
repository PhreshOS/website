'use client';

import { useState } from 'react';
import { ImageUp } from '@phreshos/react-ui/icons';
import { Button, DropZone, FileTrigger, Flex } from '../react-ui';
import { WindowScene } from './frames';
import { Showcase } from './showcase';

export function FileTriggerShowcase() {
  const [names, setNames] = useState<string[]>([]);
  return (
    <Showcase code={`<FileTrigger accept={["image/*"]} onSelect={files => setNames(files.map(file => file.name))}>
  <Button><ImageUp />Choose an image</Button>
</FileTrigger>`}>
      <WindowScene title="File Trigger">
        <Flex gap="small" align="center">
          <FileTrigger accept={['image/*']} onSelect={files => setNames(files.map(file => file.name))}>
            <Button><ImageUp />Choose an image</Button>
          </FileTrigger>
          <span style={{ fontSize: '0.75em', opacity: 0.7 }}>{names.join(', ') || 'Nothing chosen'}</span>
        </Flex>
      </WindowScene>
    </Showcase>
  );
}

export function DropZoneShowcase() {
  const [names, setNames] = useState<string[]>([]);
  return (
    <Showcase code={`<DropZone aria-label="Wallpaper" accept={["image/*"]} onDrop={files => setNames(files.map(file => file.name))}>
  Drop an image, or
  <FileTrigger accept={["image/*"]} onSelect={…}><Button size="small">Choose one</Button></FileTrigger>
</DropZone>`}>
      <WindowScene title="Drop Zone">
        <DropZone aria-label="Wallpaper" accept={['image/*']} onDrop={files => setNames(files.map(file => file.name))}>
          <ImageUp size={24} />
          <span style={{ fontSize: '0.8125em' }}>Drop an image, or</span>
          <FileTrigger accept={['image/*']} onSelect={files => setNames(files.map(file => file.name))}>
            <Button size="small">Choose one</Button>
          </FileTrigger>
          <span style={{ fontSize: '0.75em', opacity: 0.7 }}>{names.join(', ') || 'Nothing dropped'}</span>
        </DropZone>
      </WindowScene>
    </Showcase>
  );
}
