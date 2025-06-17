# RSSHub Radar Browser Extension Guide

RSSHub Radar is a browser extension that helps you discover and subscribe to RSS feeds on websites. This guide will show you how to install and configure it to work with your local RSSHub instance.

## Installation

### Chrome / Edge
1. Visit the [Chrome Web Store](https://chrome.google.com/webstore/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa)
2. Click "Add to Chrome" or "Add to Edge"
3. Confirm the installation

### Firefox
1. Visit the [Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/rsshub-radar/)
2. Click "Add to Firefox"
3. Confirm the installation

## Configuration

After installation, you need to configure the extension to use your local RSSHub instance:

1. Click on the RSSHub Radar extension icon in your browser toolbar
2. Click on the gear icon (⚙️) in the popup to open the settings
3. In the "RSSHub domain" field, enter: `http://localhost:1200`
4. Click "Save"

## Usage

1. Visit a website that is supported by RSSHub (like Bilibili, Weibo, etc.)
2. Click on the RSSHub Radar extension icon
3. The extension will show available RSS feeds for the current page
4. Click on any feed to copy its URL or subscribe directly

## Troubleshooting

### No feeds detected
- Make sure your local RSSHub instance is running
- Try refreshing the page
- Navigate to different pages on the website and try again

### Connection errors
- Check if your local RSSHub instance is accessible at http://localhost:1200
- If you're using a proxy, make sure it's properly configured in your RSSHub deployment

### Socket proxy errors
- If you encounter socket proxy errors, check your docker-compose.yml file and ensure the PROXY_URI is either properly configured or commented out

## Supported Websites

RSSHub supports hundreds of websites. For a complete list, visit:
- http://localhost:1200/
- Or the [official documentation](https://docs.rsshub.app/) 