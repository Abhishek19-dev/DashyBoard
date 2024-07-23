document.addEventListener('DOMContentLoaded', () => {
    const widgetBtn = document.getElementById('widget-btn');
    const widgetPanel = document.getElementById('widget-panel');
    const homeScreen = document.getElementById('home-screen');
    let isPanelVisible = false;
  
    widgetBtn.addEventListener('click', () => {
      isPanelVisible = !isPanelVisible;
      if (isPanelVisible) {
        widgetPanel.classList.remove('hidden');
      } else {
        widgetPanel.classList.add('hidden');
      }
    });
  
    document.querySelectorAll('.widget-option').forEach(widgetOption => {
      widgetOption.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', e.target.dataset.widget);
      });
    });
  
    homeScreen.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
  
    homeScreen.addEventListener('drop', (e) => {
      e.preventDefault();
      const widget = e.dataTransfer.getData('text');
      loadWidget(widget, e.clientX, e.clientY);
    });
  
    function loadWidget(widget, x, y) {
      const iframe = document.createElement('iframe');
      iframe.src = widget;
      iframe.className = 'widget';
      iframe.style.left = `${x}px`;
      iframe.style.top = `${y}px`;
  
      iframe.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', null);
      });
  
      iframe.addEventListener('drag', (e) => {
        iframe.style.left = `${e.clientX}px`;
        iframe.style.top = `${e.clientY}px`;
      });
  
      homeScreen.appendChild(iframe);
    }
  });
  