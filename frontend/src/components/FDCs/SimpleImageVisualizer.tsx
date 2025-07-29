import * as simpleImageCalls from '../../api-calls/SimpleImage';

export default function Visualizer({
  element,
  preview,
}: {
  element: simpleImageCalls.SimpleImageInterface | null;
  preview?: File;
}) {
  const previewUrl = (preview && URL.createObjectURL(preview)) || null;
  const src = previewUrl || element?.url || '';

  return (
    <div>
      <img src={src} alt="" />
    </div>
  );
}
