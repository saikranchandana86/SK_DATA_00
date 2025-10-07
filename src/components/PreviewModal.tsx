import React, { useState } from 'react';
import { X, Monitor, Smartphone, Tablet, Maximize2, RefreshCw, ExternalLink } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { RenderComponent } from './RenderComponent';

interface PreviewModalProps {
  onClose: () => void;
}

type DeviceType = 'desktop' | 'tablet' | 'mobile';

const deviceSizes = {
  desktop: { width: '100%', height: '100%', label: 'Desktop' },
  tablet: { width: '768px', height: '1024px', label: 'Tablet' },
  mobile: { width: '375px', height: '667px', label: 'Mobile' }
};

export const PreviewModal: React.FC<PreviewModalProps> = ({ onClose }) => {
  const { components, currentPage } = useAppStore();
  const [device, setDevice] = useState<DeviceType>('desktop');
  const [key, setKey] = useState(0);

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  const openInNewTab = () => {
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) return;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview - ${currentPage || 'Untitled'}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .preview-container { position: relative; width: 100%; min-height: 100vh; background: #ffffff; }
        </style>
      </head>
      <body>
        <div class="preview-container" id="preview-root"></div>
      </body>
      </html>
    `;

    previewWindow.document.write(html);
    previewWindow.document.close();
  };

  const currentDevice = deviceSizes[device];

  return (
    <div className="fixed inset-0 bg-gray-900 z-[9999] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Close preview"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="h-6 w-px bg-gray-700" />

          <h2 className="text-lg font-semibold text-white">Preview Mode</h2>

          {currentPage && (
            <span className="text-sm text-gray-400">
              • {currentPage}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Device Selector */}
          <div className="flex items-center gap-1 bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-2 rounded transition-colors ${
                device === 'desktop'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              title="Desktop view"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-2 rounded transition-colors ${
                device === 'tablet'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              title="Tablet view"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-2 rounded transition-colors ${
                device === 'mobile'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
              title="Mobile view"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-gray-700" />

          {/* Actions */}
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Refresh preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={openInNewTab}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-800 p-8">
        <div className="h-full flex items-center justify-center">
          {/* Device Frame */}
          <div
            className="bg-white shadow-2xl transition-all duration-300 overflow-auto"
            style={{
              width: currentDevice.width,
              height: currentDevice.height,
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: device === 'mobile' ? '36px' : device === 'tablet' ? '12px' : '0px',
              border: device !== 'desktop' ? '8px solid #1f2937' : 'none'
            }}
            key={key}
          >
            {/* Canvas Content */}
            <div className="relative w-full h-full bg-white overflow-auto">
              {components.length > 0 ? (
                <>
                  {components.map((component) => (
                    <div
                      key={component.id}
                      className="absolute"
                      style={{
                        left: component.x,
                        top: component.y,
                        width: component.width,
                        height: component.height,
                      }}
                    >
                      <RenderComponent component={component} isPreview={true} />
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-gray-400 p-8">
                    <Maximize2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <div className="text-lg font-medium text-gray-600">No components to preview</div>
                    <div className="text-sm mt-2 opacity-75">Add some components to your canvas first</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex-shrink-0 bg-gray-800 border-t border-gray-700 px-6 py-2 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span>Device: {currentDevice.label}</span>
          <span>•</span>
          <span>{currentDevice.width} × {currentDevice.height}</span>
          <span>•</span>
          <span>{components.length} component{components.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live Preview</span>
        </div>
      </div>
    </div>
  );
};