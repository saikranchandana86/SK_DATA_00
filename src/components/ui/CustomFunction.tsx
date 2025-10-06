import React, { useEffect, useRef, useState } from 'react';
import { ComponentData, CustomFunctionProps } from '../../types';
import { AlertTriangle, Code } from 'lucide-react';

interface CustomFunctionComponentProps {
  component: ComponentData;
  isPreview?: boolean;
}

export const CustomFunction: React.FC<CustomFunctionComponentProps> = ({ 
  component, 
  isPreview = false 
}) => {
  const props = component.props as CustomFunctionProps;
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const baseStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    ...component.style,
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const targetElement = isPreview
      ? containerRef.current
      : containerRef.current.querySelector('.custom-function-canvas-preview');

    if (!targetElement) return;

    const executeCustomCode = async () => {
      setIsLoading(true);
      setError(null);

      try {
        targetElement.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.style.width = '100%';
        wrapper.style.height = '100%';
        wrapper.style.position = 'relative';
        wrapper.style.overflow = isPreview ? 'hidden' : 'auto';

        if (props.html) {
          wrapper.innerHTML = props.html;
        }

        if (props.css) {
          const style = document.createElement('style');
          style.textContent = `
            .custom-function-${component.id} {
              ${props.css}
            }
            .custom-function-${component.id} * {
              box-sizing: border-box;
            }
          `;
          wrapper.appendChild(style);
          wrapper.className = `custom-function-${component.id}`;
        }

        if (props.javascript) {
          const script = document.createElement('script');
          script.textContent = `
            (function() {
              try {
                const props = ${JSON.stringify(props.props || {})};
                const componentId = '${component.id}';

                ${props.javascript}
              } catch (error) {
                console.error('Custom function error:', error);
                const errorDiv = document.createElement('div');
                errorDiv.style.cssText = 'color: red; padding: 10px; background: #fee; border: 1px solid #fcc; border-radius: 4px; font-size: 12px;';
                errorDiv.textContent = 'JavaScript Error: ' + error.message;
                document.querySelector('.custom-function-${component.id}').appendChild(errorDiv);
              }
            })();
          `;
          wrapper.appendChild(script);
        }

        targetElement.appendChild(wrapper);

      } catch (error) {
        console.error('Error rendering custom function:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (props.html || props.css || props.javascript) {
      executeCustomCode();
    }
  }, [props.html, props.css, props.javascript, props.props, component.id, isPreview]);

  const getCustomStyles = () => {
    const styles: React.CSSProperties = {};
    
    if (props.borderColor) styles.borderColor = props.borderColor;
    if (props.borderWidth !== undefined) styles.borderWidth = `${props.borderWidth}px`;
    if (props.borderRadius !== undefined) styles.borderRadius = `${props.borderRadius}px`;
    if (props.boxShadow) styles.boxShadow = props.boxShadow;
    
    return styles;
  };

  if (!props.visible) return null;

  if (!isPreview) {
    const hasCode = props.html || props.css || props.javascript;
    return (
      <div
        ref={containerRef}
        style={{ ...baseStyle, ...getCustomStyles() }}
        className="bg-gradient-to-br from-gray-800 to-gray-700 border-2 border-dashed border-gray-500 rounded-lg overflow-hidden"
      >
        {hasCode ? (
          <div className="h-full flex flex-col">
            {/* Preview Header */}
            <div className="bg-gray-900/50 px-3 py-2 border-b border-gray-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-gray-300">Custom Function</span>
              </div>
              <div className="flex items-center gap-1">
                {props.html && <span className="text-xs px-1.5 py-0.5 bg-orange-500/20 text-orange-400 rounded">HTML</span>}
                {props.css && <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded">CSS</span>}
                {props.javascript && <span className="text-xs px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 rounded">JS</span>}
              </div>
            </div>
            {/* Canvas Preview Content */}
            <div className="flex-1 overflow-auto custom-function-canvas-preview" />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <div className="text-center p-4">
              <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div className="font-medium text-base">Custom Function</div>
              <div className="text-xs mt-1 opacity-75">Click to add HTML, CSS, or JS</div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        style={{ ...baseStyle, ...getCustomStyles() }}
        className="bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <div className="text-sm text-gray-600">Loading custom function...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        style={{ ...baseStyle, ...getCustomStyles() }}
        className="bg-red-50 border border-red-200 rounded-lg flex items-center justify-center text-red-600 p-4"
      >
        <div className="text-center">
          <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
          <div className="font-medium mb-1">Execution Error</div>
          <div className="text-sm opacity-75">{error}</div>
        </div>
      </div>
    );
  }

  if (!props.html && !props.css && !props.javascript) {
    return (
      <div 
        style={{ ...baseStyle, ...getCustomStyles() }}
        className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500"
      >
        <div className="text-center p-4">
          <Code className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm">No code provided</div>
          <div className="text-xs mt-1 opacity-75">Add HTML, CSS, or JavaScript to get started</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ ...baseStyle, ...getCustomStyles() }}
      className={`custom-function-container overflow-auto ${props.animateLoading ? 'animate-pulse' : ''}`}
    />
  );
};