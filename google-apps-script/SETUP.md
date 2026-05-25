# Google Apps Script Setup

Copy `Code.gs` into your Apps Script editor and save it.

The script writes to:

- Spreadsheet ID: `14UNIYDoLzRiMYGzV_UkIaL4N7ykG_vtJGMq8nVq0NJg`
- Sheet tab: `Signups`

## Deploy

1. Select `Deploy` -> `New deployment`.
2. Select `Web app`.
3. Set `Execute as` to `Me`.
4. Set `Who has access` to `Anyone`.
5. Deploy and complete authorization.
6. Open the resulting `/exec` URL in a private/incognito browser window.

The URL must show JSON such as:

```json
{"ok":true,"message":"The Kalam Project signup endpoint is active."}
```

If it redirects to Google sign-in, the deployment is still private and public website submissions cannot work.

## Important

Editing `Code.gs` does not update an existing deployment automatically. After code changes, create a new deployment or edit the deployment and select a new version. If Google gives you a different `/exec` URL, update `VITE_GOOGLE_APPS_SCRIPT_URL` on the website.
