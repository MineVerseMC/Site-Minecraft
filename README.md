# MineVerse – Website Server Minecraft

Site-ul oficial al serverului MineVerse, gata pentru GitHub Pages.

## 📁 Structura

```
mineverse/
├── index.html        # Pagina principală
├── css/
│   └── style.css     # Stiluri
├── js/
│   └── main.js       # Animații, particule, interacțiuni
└── README.md
```

## 🚀 Cum pui pe GitHub Pages

1. Creează un repo nou pe GitHub (ex: `mineverse-site`)
2. Urcă toate fișierele în repo
3. Mergi la **Settings → Pages**
4. La "Source" selectează **main branch, / (root)**
5. Apasă **Save**
6. Site-ul va fi live la: `https://USERNAME.github.io/mineverse-site`

## ✏️ Personalizare

### Schimbă IP-ul serverului
În `index.html`, caută toate aparițiile `play.mineverse.ro` și înlocuiește cu IP-ul tău real.

### Schimbă numele staff
Caută `RaulGamerica` și actualizează cu username-ul Minecraft exact (case-sensitive).
Avatar-ul se ia automat de la mc-heads.net.

### Adaugă membri staff
Copiază blocul `.staff-card` din secțiunea `#staff` și completează datele.

### Schimbă regulile
Editează conținutul din secțiunea `#rules` în `index.html`.

## 🎨 Tehnic

- HTML5 + CSS3 + Vanilla JS (fără framework-uri)
- Fonturi: Orbitron + Outfit (Google Fonts)
- Avatare Minecraft: mc-heads.net API
- Compatible cu toate browser-ele moderne
- Responsive (mobil + desktop)
