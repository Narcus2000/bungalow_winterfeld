# Ferienbungalow – GitHub Pages

Diese Version besteht nur aus HTML, CSS und JavaScript und kann direkt über GitHub Pages veröffentlicht werden.

## Veröffentlichung

1. Auf GitHub ein neues öffentliches Repository erstellen.
2. Den Inhalt dieses Ordners in das Repository hochladen. `index.html` muss direkt im Hauptverzeichnis liegen.
3. Im Repository **Settings → Pages** öffnen.
4. Unter **Build and deployment** die Quelle **Deploy from a branch** auswählen.
5. Branch **main** und Ordner **/(root)** auswählen und speichern.

Die Seite ist anschließend unter `https://BENUTZERNAME.github.io/REPOSITORY/` erreichbar.

## Belegungen ändern

In `script.js` steht am Anfang die Liste `BOOKED_RANGES`. Jeder Zeitraum hat ein Start- und Enddatum:

```js
["2026-08-14", "2026-08-19"]
```

Weitere Zeiträume werden jeweils durch ein Komma getrennt ergänzt.

## Inhalte ändern

- Texte, Preise und Kontaktdaten: `index.html`
- Farben und Gestaltung: `style.css`
- Belegungen und Formularprüfung: `script.js`

## Anfrageformular

Das Formular ist momentan eine Demo. Es prüft Datumsangaben und Belegungen, verschickt aber keine E-Mail. Vor der echten Veröffentlichung muss es beispielsweise mit Formspree oder einem eigenen Formularservice verbunden werden. Außerdem müssen Impressum, Datenschutz, echte Preise und Kontaktdaten ergänzt werden.
