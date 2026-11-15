import { createContext, useContext, type ReactNode } from 'react';
import { defaultContent, type Content } from './defaults';

interface ContentContextValue {
  content: Content;
  editing: boolean;
  set: (path: string, value: unknown) => void;
  upload: (file: File) => Promise<string>;
}

const ContentContext = createContext<ContentContextValue>({
  content: defaultContent,
  editing: false,
  set: () => {},
  upload: () => Promise.reject(new Error('read-only')),
});

export function ContentProvider({ children, ...value }: Partial<ContentContextValue> & { content: Content; children: ReactNode }) {
  const parent = useContext(ContentContext);
  return <ContentContext.Provider value={{ ...parent, ...value }}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
