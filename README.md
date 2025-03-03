# Mia Chat Widget

A customizable chat widget for websites.

## Files

- `mia-chat-widget.js` - Original widget script
- `mia-chat-widget-v2.js` - Updated widget script with fixes for:
  - Welcome message spacing issues
  - Textarea height consistency (60px)
  - Cache-busting mechanisms

## How to Use

### Basic Implementation

```html
<!-- Widget Configuration -->
<script>
    window.ChatWidgetConfig = {
        webhook: {
            url: 'YOUR_WEBHOOK_URL',
            route: 'general'
        },
        branding: {
            logo: 'YOUR_LOGO_URL',
            name: 'YOUR_NAME',
            welcomeText: 'Hi 👋, how can I help you?',
            responseTimeText: 'We typically respond right away'
        },
        style: {
            primaryColor: '#854fff',
            secondaryColor: '#6b3fd4',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };
</script>

<!-- Load the widget script -->
<script src="mia-chat-widget-v2.js"></script>
```

### Implementation with Cache-Busting

To avoid caching issues, use this implementation:

```html
<!-- Widget Configuration -->
<script>
    window.ChatWidgetConfig = {
        // Your configuration here
    };
</script>

<!-- Load the widget script with cache-busting -->
<script>
    (function() {
        // Create a script element with a unique timestamp
        const script = document.createElement('script');
        script.src = 'mia-chat-widget-v2.js?v=1.4&t=' + new Date().getTime();
        script.async = true;
        
        // Append the script to the document
        document.body.appendChild(script);
    })();
</script>
```

## Testing

Two test files are included:

1. `test-widget.html` - Simple test page
2. `production-test.html` - Production-like test page with cache-busting

## Troubleshooting

### Caching Issues

If you're experiencing caching issues:

1. Use the cache-busting implementation above
2. Clear your browser cache
3. Try using incognito/private browsing mode
4. Add a version parameter to the script URL when updating the script

### Visual Issues

If the welcome message spacing or textarea height issues persist:

1. Make sure you're using `mia-chat-widget-v2.js`
2. Check that the script is loading with the cache-busting parameter
3. Inspect the elements in your browser's developer tools to verify the styles are being applied

## Version History

- v1.4: Fixed welcome message spacing and textarea height issues, added cache-busting
- v1.3: Initial fixes for visual issues
- v1.2: Original version 