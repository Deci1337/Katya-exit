import { useRef, useState, type ImgHTMLAttributes, type PointerEvent } from 'react';
import { ImageUp, Loader2, RotateCcw, Move } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from './ContentContext';
import { defaultContent, type ImageId, type ImageSettings } from './defaults';

interface EditableImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'style' | 'id'> {
  id: ImageId;
  /** Where the edit toolbar sits */
  toolbar?: 'top' | 'bottom';
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function EditableImage({ id, className, alt = '', toolbar = 'bottom', ...imgProps }: EditableImageProps) {
  const { content, editing, set, upload } = useContent();
  const img = content.images[id];
  const drag = useRef<{ px: number; py: number; start: ImageSettings; w: number; h: number } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const style = {
    objectPosition: `${img.x}% ${img.y}%`,
    transform: img.scale !== 1 ? `scale(${img.scale})` : undefined,
    transformOrigin: `${img.x}% ${img.y}%`,
  };

  const image = <img {...imgProps} src={img.src} alt={alt} draggable={false} className={cn('h-full w-full object-cover', className)} style={style} />;
  if (!editing) return image;

  const update = (patch: Partial<ImageSettings>) => set(`images.${id}`, { ...img, ...patch });

  const onPointerDown = (e: PointerEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    drag.current = { px: e.clientX, py: e.clientY, start: img, w: rect.width, h: rect.height };
  };
  const onPointerMove = (e: PointerEvent<HTMLImageElement>) => {
    const d = drag.current;
    if (!d) return;
    // dragging right reveals more of the left side → lower x
    const k = 150 / d.start.scale;
    update({
      x: Math.round(clamp(d.start.x - ((e.clientX - d.px) / d.w) * k, 0, 100)),
      y: Math.round(clamp(d.start.y - ((e.clientY - d.py) / d.h) * k, 0, 100)),
    });
  };
  const onPointerUp = () => { drag.current = null; };

  const onFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      update({ src: await upload(file), x: 50, y: 50, scale: 1 });
    } catch {
      setError('Не удалось загрузить фото');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <>
      <img
        {...imgProps}
        src={img.src}
        alt={alt}
        draggable={false}
        className={cn('h-full w-full cursor-grab touch-none object-cover active:cursor-grabbing', className)}
        style={style}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
      <div
        className={cn(
          'absolute left-1/2 z-30 flex w-max max-w-[calc(100%-16px)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl bg-cocoa-900/90 px-3 py-2 text-xs text-milk shadow-lg backdrop-blur',
          toolbar === 'top' ? 'top-3' : 'bottom-3'
        )}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <span className="hidden items-center gap-1 text-milk/60 sm:inline-flex"><Move className="h-3.5 w-3.5" strokeWidth={1.5} />тяните фото</span>
        <label className="flex items-center gap-2">
          <span className="text-milk/60">Масштаб</span>
          <input
            type="range"
            min={1}
            max={2.5}
            step={0.05}
            value={img.scale}
            onChange={(e) => update({ scale: Number(e.target.value) })}
            className="w-20 accent-[#B99A86]"
            aria-label="Масштаб фото"
          />
        </label>
        <button type="button" onClick={() => fileRef.current?.click()} disabled={busy} className="inline-flex items-center gap-1 rounded-full bg-milk/10 px-3 py-1.5 hover:bg-milk/20">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImageUp className="h-3.5 w-3.5" strokeWidth={1.5} />}
          Заменить
        </button>
        <button
          type="button"
          onClick={() => update({ x: 50, y: 50, scale: 1 })}
          className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-milk/70 hover:text-milk"
          title="Сбросить положение и масштаб"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
        </button>
        {img.src !== defaultContent.images[id].src && (
          <button type="button" onClick={() => update({ ...defaultContent.images[id] })} className="rounded-full px-2 py-1.5 text-milk/70 hover:text-milk">
            Вернуть исходное
          </button>
        )}
        {error && <span className="text-[#F3B4BF]">{error}</span>}
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      </div>
    </>
  );
}
