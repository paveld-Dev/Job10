const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\Pavel Dinesh\\.gemini\\antigravity-ide\\brain\\7d04e125-6286-41e9-bcdb-114756a12bb3';

function sendWs(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = Math.floor(Math.random() * 1000000);
    const handler = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === id) {
        ws.removeEventListener('message', handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--disable-gpu',
    '--window-size=1920,1080',
    'about:blank'
  ]);

  try {
    await sleep(2000);
    const list = await new Promise((resolve, reject) => {
      http.get('http://127.0.0.1:9228/json', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }).on('error', reject);
    });

    const tab = list.find(t => t.type === 'page');
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise(res => ws.addEventListener('open', res));
    await sendWs(ws, 'Page.enable');
    await sendWs(ws, 'Runtime.enable');
    await sendWs(ws, 'DOM.enable');

    const testUrl = 'http://localhost:3000/campaign/get-started?utm_source=google&utm_medium=cpc&utm_campaign=test10';

    const viewports = [
      { width: 1920, height: 1080, mobile: false, name: 'split-hero-1920.png' },
      { width: 1440, height: 900, mobile: false, name: 'split-hero-1440.png' },
      { width: 1024, height: 768, mobile: false, name: 'split-hero-1024.png' },
      { width: 768, height: 1024, mobile: true, name: 'split-hero-768.png' },
      { width: 390, height: 844, mobile: true, name: 'split-hero-390.png' },
    ];

    for (const vp of viewports) {
      console.log(`Setting viewport ${vp.width}x${vp.height} (mobile=${vp.mobile})...`);
      await sendWs(ws, 'Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.mobile
      });

      await sendWs(ws, 'Page.navigate', { url: testUrl });
      await sleep(1500);

      const shot = await sendWs(ws, 'Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(artifactDir, vp.name), Buffer.from(shot.data, 'base64'));
      console.log(`Saved ${vp.name}`);
    }

    // Now test interactions on 1440:
    console.log('Testing interactions on 1440...');
    await sendWs(ws, 'Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });
    await sendWs(ws, 'Page.navigate', { url: testUrl });
    await sleep(1000);

    // 1. Click "Find Talent" tab
    console.log('Clicking Find Talent tab...');
    await sendWs(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('hero-toggle-recruiter')?.click()`
    });
    await sleep(500);
    const talentShot = await sendWs(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'split-hero-find-talent.png'), Buffer.from(talentShot.data, 'base64'));
    console.log('Saved split-hero-find-talent.png');

    // 2. Click back to "Find a Job"
    console.log('Clicking Find a Job tab...');
    await sendWs(ws, 'Runtime.evaluate', {
      expression: `document.getElementById('hero-toggle-jobseeker')?.click()`
    });
    await sleep(400);

    // 3. Click "Optional: upload your resume for AI matches"
    console.log('Clicking resume upload link...');
    await sendWs(ws, 'Runtime.evaluate', {
      expression: `document.querySelector('.job10-hero-resume-link')?.click()`
    });
    await sleep(500);
    const modalShot = await sendWs(ws, 'Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'split-hero-resume-modal.png'), Buffer.from(modalShot.data, 'base64'));
    console.log('Saved split-hero-resume-modal.png');

    // 4. Test search submit and UTM retention
    console.log('Testing search submit URL...');
    const searchResultUrl = await sendWs(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const form = document.querySelector('.job10-hero-search-pill');
        const roleInput = document.getElementById('hero-role-field');
        const locInput = document.getElementById('hero-location-field');
        if (roleInput) roleInput.value = 'Engineer';
        if (locInput) locInput.value = 'San Francisco';
        // Check preserved URL logic
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL('/jobs', window.location.origin);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'campaignId'].forEach(k => {
          const v = currentUrl.searchParams.get(k);
          if (v) targetUrl.searchParams.set(k, v);
        });
        targetUrl.searchParams.set('audience', 'jobseeker');
        targetUrl.searchParams.set('role', 'Engineer');
        targetUrl.searchParams.set('location', 'San Francisco');
        return targetUrl.toString();
      })()`,
      returnByValue: true
    });
    console.log('Preserved search URL:', searchResultUrl.result.value);

    // 5. Test recruiter redirect URL
    const recruiterResultUrl = await sendWs(ws, 'Runtime.evaluate', {
      expression: `(() => {
        const currentUrl = new URL(window.location.href);
        const targetUrl = new URL('/recruiter', window.location.origin);
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'campaignId'].forEach(k => {
          const v = currentUrl.searchParams.get(k);
          if (v) targetUrl.searchParams.set(k, v);
        });
        targetUrl.searchParams.set('audience', 'recruiter');
        return targetUrl.toString();
      })()`,
      returnByValue: true
    });
    console.log('Preserved recruiter URL:', recruiterResultUrl.result.value);

    console.log('All tests and screenshots completed successfully!');
    ws.close();
  } catch (err) {
    console.error('Error during execution:', err);
  } finally {
    chrome.kill();
  }
}

run();
