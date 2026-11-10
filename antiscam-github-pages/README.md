# StudentAntiscam

A static Vietnamese online-safety learning website for high-school students.

## Structure

- `index.html` — page structure and content containers
- `styles.css` — layout, components, responsive styles, and print styles
- `data.js` — lessons, scenarios, quiz questions, sources, and icon definitions
- `app.js` — navigation, rendering, dialogs, quiz behavior, and local progress
- `assets/` — editorial and scenario images

## Run locally

For reliable YouTube playback, serve the folder over local HTTP and open
`http://localhost:8000`:

```powershell
py -m http.server 8000
```

No build step, package installation, or API key is required. Embedded videos and
external reference links require internet access. Video cards load the embedded
YouTube player directly. Inline playback requires HTTP/HTTPS because `file://`
cannot provide YouTube's required HTTP referrer. If playback is rejected, the
card falls back to a thumbnail linking to YouTube.

Learning progress and the best quiz score are stored only in the current browser's
`localStorage` and can be cleared from the Practice section.
