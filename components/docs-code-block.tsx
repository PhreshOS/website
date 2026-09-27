import { CodeBlock, Pre, type CodeBlockProps } from 'fumadocs-ui/components/codeblock';

export function DocsCodeBlock({ children, className, viewportProps, ...properties }: CodeBlockProps) {
  return <CodeBlock
    {...properties}
    className={['docs-code-block', className].filter(Boolean).join(' ')}
    viewportProps={{
      ...viewportProps,
      className: ['docs-code-block-viewport', viewportProps?.className].filter(Boolean).join(' '),
    }}
  >
    <Pre>{children}</Pre>
  </CodeBlock>;
}
