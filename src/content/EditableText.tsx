import { type ElementType, type ReactNode, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { useContent } from './ContentContext';
import { getAt } from './defaults';

interface EditableTextProps {
  path: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Allow line breaks (Enter); paragraphs are separated by an empty line */
  multiline?: boolean;
  /** Edit only the n-th paragraph (split by empty line) of the string at `path` */
  part?: number;
  /** Custom read-only rendering of the value */
  render?: (value: string) => ReactNode;
}

const PARA = '\n\n';

export function EditableText({ path, as: Tag = 'span', className, style, multiline, part, render }: EditableTextProps) {
  const { content, editing, set } = useContent();
  const full = String(getAt(content, path) ?? '');
  const value = part === undefined ? full : full.split(PARA)[part] ?? '';

  if (!editing) return <Tag className={className} style={style}>{render ? render(value) : value}</Tag>;

  const commit = (raw: string) => {
    const text = raw.replace(/\r/g, '').replace(/\n{3,}/g, PARA).trim();
    if (text === value) return;
    if (part === undefined) return set(path, text);
    const parts = full.split(PARA);
    parts[part] = text;
    set(path, parts.filter(Boolean).join(PARA));
  };

  return (
    <Tag
      // remount after each commit so React never fights the browser over the DOM text
      key={`${path}:${part ?? ''}:${value}`}
      className={cn(className, 'editable', multiline && 'whitespace-pre-wrap')}
      style={style}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      spellCheck
      data-placeholder="Пусто — нажмите, чтобы написать"
      onBlur={(e: React.FocusEvent<HTMLElement>) => commit(e.currentTarget.innerText)}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Escape' || (!multiline && e.key === 'Enter')) {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {value}
    </Tag>
  );
}
