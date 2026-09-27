'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useAppearance } from '@phreshos/react-ui';
import { Window } from '../react-ui';

export function WindowScene({
  title,
  children,
  contentStyle,
}: {
  title: string;
  children: ReactNode;
  contentStyle?: CSSProperties;
}) {
  const appearance = useAppearance();
  const spacing = appearance.spacing;

  return (
    <Window style={{ width: 'min(100%, 26rem)' }}>
      <Window.Header>
        <Window.Header.Identity title={title} />
        <Window.Header.Center />
        <Window.Header.Actions>
          <Window.Header.Minimize />
          <Window.Header.Maximize />
          <Window.Header.Close />
        </Window.Header.Actions>
      </Window.Header>
      <Window.Content
        style={{
          display: 'grid',
          alignContent: 'start',
          gap: spacing,
          padding: spacing * 1.5,
          ...contentStyle,
        }}
      >
        {children}
      </Window.Content>
    </Window>
  );
}
