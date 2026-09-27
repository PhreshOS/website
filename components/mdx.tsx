import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import * as FilesComponents from 'fumadocs-ui/components/files';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { ComponentPreview } from './component-preview';
import { DocsCodeBlock } from './docs-code-block';
import * as Showcases from './showcase';
import {
  UIProvider,
  Button,
  Calendar,
  Checkbox,
  ComboBox,
  DateField,
  DatePicker,
  DateRangePicker,
  Flex,
  Grid,
  Input,
  ListBox,
  Panel,
  ProgressBar,
  RadioGroup,
  RangeCalendar,
  ScrollArea,
  Select,
  Slider,
  Spinner,
  Surface,
  Switch,
  Table,
  Textarea,
  TimeField,
  Toolbar,
  Tree,
  Window,
} from './react-ui';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...FilesComponents,
    ...TabsComponents,
    ...Showcases,
    Accordion,
    Accordions,
    UIProvider,
    Button,
    Calendar,
    Checkbox,
    ComboBox,
    DateField,
    DatePicker,
    DateRangePicker,
    ComponentPreview,
    Flex,
    Grid,
    Input,
    ListBox,
    Panel,
    ProgressBar,
    RadioGroup,
    RangeCalendar,
    ScrollArea,
    Select,
    Slider,
    Spinner,
    Step,
    Steps,
    Surface,
    Switch,
    Table,
    Textarea,
    TimeField,
    Toolbar,
    Tree,
    Window,
    pre: DocsCodeBlock,
    img: (props) => (
      <ImageZoom {...(props as ComponentProps<typeof ImageZoom>)} />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
