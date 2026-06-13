function setOutput(id, text, type) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = 'output' + (type ? ' ' + type : '');
}

async function checkHealth() {
  const dot = document.getElementById('healthDot');
  const text = document.getElementById('healthText');
  const metric = document.getElementById('metricHealth');
  try {
    const res = await fetch('/health');
    const data = await res.json();
    if (res.ok && data.status === 'ok') {
      dot.className = 'status-dot ok';
      text.textContent = 'Healthy';
      metric.textContent = 'OK';
    } else {
      dot.className = 'status-dot err';
      text.textContent = 'Unhealthy';
      metric.textContent = 'FAIL';
    }
  } catch (err) {
    dot.className = 'status-dot err';
    text.textContent = 'Unreachable';
    metric.textContent = 'ERR';
  }
}

document.getElementById('echoBtn').addEventListener('click', async function () {
  const input = document.getElementById('echoInput').value;
  setOutput('echoOutput', 'Loading...');
  try {
    const res = await fetch('/api/echo?input=' + encodeURIComponent(input));
    const data = await res.json();
    setOutput('echoOutput', JSON.stringify(data, null, 2), 'success');
  } catch (err) {
    setOutput('echoOutput', 'Error: ' + err.message, 'error');
  }
});

document.getElementById('loginBtn').addEventListener('click', async function () {
  const username = document.getElementById('loginUser').value;
  const password = document.getElementById('loginPass').value;
  setOutput('loginOutput', 'Authenticating...');
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    });
    const data = await res.json();
    if (res.ok) {
      setOutput('loginOutput', JSON.stringify(data, null, 2), 'success');
    } else {
      setOutput('loginOutput', JSON.stringify(data, null, 2), 'error');
    }
  } catch (err) {
    setOutput('loginOutput', 'Error: ' + err.message, 'error');
  }
});

document.getElementById('complianceBtn').addEventListener('click', async function () {
  setOutput('complianceOutput', 'Running...');
  try {
    const res = await fetch('/api/compliance');
    const data = await res.json();
    setOutput('complianceOutput', JSON.stringify(data, null, 2), 'success');
  } catch (err) {
    setOutput('complianceOutput', 'Error: ' + err.message, 'error');
  }
});

document.getElementById('processBtn').addEventListener('click', async function () {
  const value = document.getElementById('processValue').value;
  const level = document.getElementById('processLevel').value;
  setOutput('processOutput', 'Processing...');
  try {
    const res = await fetch('/api/process?value=' + value + '&level=' + level);
    const data = await res.json();
    setOutput('processOutput', JSON.stringify(data, null, 2), 'success');
  } catch (err) {
    setOutput('processOutput', 'Error: ' + err.message, 'error');
  }
});

document.getElementById('renderBtn').addEventListener('click', async function () {
  const template = document.getElementById('templateInput').value;
  const name = document.getElementById('templateName').value;
  setOutput('renderOutput', 'Rendering...');
  try {
    const res = await fetch('/api/render?template=' + encodeURIComponent(template) + '&name=' + encodeURIComponent(name));
    const text = await res.text();
    setOutput('renderOutput', text, 'success');
  } catch (err) {
    setOutput('renderOutput', 'Error: ' + err.message, 'error');
  }
});

document.getElementById('fetchBtn').addEventListener('click', async function () {
  const url = document.getElementById('fetchUrl').value;
  setOutput('fetchOutput', 'Fetching...');
  try {
    const res = await fetch('/api/fetch?url=' + encodeURIComponent(url));
    const data = await res.json();
    setOutput('fetchOutput', JSON.stringify(data, null, 2), 'success');
  } catch (err) {
    setOutput('fetchOutput', 'Error: ' + err.message, 'error');
  }
});

checkHealth();
setInterval(checkHealth, 15000);
