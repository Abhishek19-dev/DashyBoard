document.addEventListener('DOMContentLoaded', () => {
    const widgetBtn = document.getElementById('widget-btn');
    const widgetPanel = document.getElementById('widget-panel');
    const homeScreen = document.getElementById('home-screen');
    let isPanelVisible = false;
  
    // Toggle widget panel visibility
    widgetBtn.addEventListener('click', () => {
      isPanelVisible = !isPanelVisible;
      widgetPanel.classList.toggle('hidden', !isPanelVisible);
    });
  
    // Handle drag events for widgets
    document.querySelectorAll('.widget-option').forEach(widgetOption => {
      widgetOption.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.dataset.widget);
      });
    });
  
    // Handle widget drop events
    homeScreen.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  
    homeScreen.addEventListener('drop', (e) => {
      e.preventDefault();
      const widget = e.dataTransfer.getData('text');
      loadWidget(widget, e.clientX, e.clientY);
    });
  
    // Load widget into the home screen
    function loadWidget(widget, x, y) {
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'widget-container';
      widgetContainer.style.left = `${x}px`;
      widgetContainer.style.top = `${y}px`;
  
      const closeButton = document.createElement('button');
      closeButton.className = 'close-btn';
      closeButton.innerHTML = '&times;';
  
      closeButton.addEventListener('click', () => {
        homeScreen.removeChild(widgetContainer);
      });
  
      const widgetFrame = document.createElement('iframe');
      widgetFrame.src = `widgets/${widget}`;
      widgetFrame.className = 'widget';
  
      // Adding resizable handles
      const resizeHandles = ['bottom-right', 'bottom-left', 'top-right', 'top-left'];
      resizeHandles.forEach(position => {
        const handle = document.createElement('div');
        handle.className = `resize-handle resize-handle-${position}`;
        widgetContainer.appendChild(handle);
      });
  
      widgetContainer.appendChild(closeButton);
      widgetContainer.appendChild(widgetFrame);
      homeScreen.appendChild(widgetContainer);
  
      makeResizable(widgetContainer);
    }
  
    // Make widgets resizable
    function makeResizable(element) {
      const handles = element.querySelectorAll('.resize-handle');
      handles.forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
          e.preventDefault();
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
  
          let startX = e.clientX;
          let startY = e.clientY;
          let startWidth = parseFloat(getComputedStyle(element, null).width.replace('px', ''));
          let startHeight = parseFloat(getComputedStyle(element, null).height.replace('px', ''));
  
          function onMouseMove(e) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
  
            if (handle.classList.contains('resize-handle-bottom-right')) {
              element.style.width = `${startWidth + dx}px`;
              element.style.height = `${startHeight + dy}px`;
            } else if (handle.classList.contains('resize-handle-bottom-left')) {
              element.style.width = `${startWidth - dx}px`;
              element.style.height = `${startHeight + dy}px`;
              element.style.left = `${e.clientX}px`;
            } else if (handle.classList.contains('resize-handle-top-right')) {
              element.style.width = `${startWidth + dx}px`;
              element.style.height = `${startHeight - dy}px`;
              element.style.top = `${e.clientY}px`;
            } else if (handle.classList.contains('resize-handle-top-left')) {
              element.style.width = `${startWidth - dx}px`;
              element.style.height = `${startHeight - dy}px`;
              element.style.left = `${e.clientX}px`;
              element.style.top = `${e.clientY}px`;
            }
          }
  
          function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          }
        });
      });
    }
  });
  