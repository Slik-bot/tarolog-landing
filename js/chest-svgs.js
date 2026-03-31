// ═══ CHEST SVG TEMPLATES ═══

const LID_SVG = `<svg class="chest-svg-lid" viewBox="0 0 180 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="lidGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd080"/><stop offset="35%" stop-color="#b87333"/><stop offset="70%" stop-color="#7a4f18"/><stop offset="100%" stop-color="#c8903a"/></linearGradient>
<radialGradient id="rubyG" cx="38%" cy="32%" r="55%"><stop offset="0%" stop-color="#ff9090"/><stop offset="45%" stop-color="#cc2020"/><stop offset="100%" stop-color="#600000"/></radialGradient>
<radialGradient id="sapphG" cx="38%" cy="32%" r="55%"><stop offset="0%" stop-color="#90b8ff"/><stop offset="45%" stop-color="#1a50c0"/><stop offset="100%" stop-color="#041840"/></radialGradient>
<radialGradient id="amethG" cx="38%" cy="32%" r="55%"><stop offset="0%" stop-color="#d8b4ff"/><stop offset="45%" stop-color="#7030c0"/><stop offset="100%" stop-color="#1e0840"/></radialGradient>
<linearGradient id="lidSheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(255,200,100,0.12)"/><stop offset="60%" stop-color="rgba(0,0,0,0)"/></linearGradient>
</defs>
<path d="M4 64 Q4 8 90 3 Q176 8 176 64 Z" fill="#251208"/>
<path d="M4 64 Q4 8 90 3 Q176 8 176 64" stroke="url(#lidGold)" stroke-width="2" fill="none"/>
<path d="M14 64 Q14 18 90 13 Q166 18 166 64" stroke="#b87333" stroke-width="0.7" fill="none" opacity="0.4" stroke-dasharray="5 4"/>
<path d="M22 62 Q28 32 90 24 Q152 32 158 62" stroke="rgba(60,25,5,0.35)" stroke-width="0.7" fill="none"/>
<path d="M38 64 Q46 44 90 37 Q134 44 142 64" stroke="rgba(60,25,5,0.25)" stroke-width="0.6" fill="none"/>
<path d="M4 64 Q4 8 90 3 Q176 8 176 64 Z" fill="url(#lidSheen)"/>
<rect x="1" y="1" width="26" height="18" rx="3" fill="url(#lidGold)"/><rect x="3" y="3" width="22" height="14" rx="2" fill="#200e04"/>
<circle class="gem-ruby" cx="14" cy="10" r="5" fill="url(#rubyG)"/><path d="M10 7 L14 5.5 L18 7 L14 14Z" fill="rgba(255,255,255,0.28)"/><path d="M10 7 L14 5.5 L18 7Z" fill="rgba(255,255,255,0.45)"/>
<rect x="153" y="1" width="26" height="18" rx="3" fill="url(#lidGold)"/><rect x="155" y="3" width="22" height="14" rx="2" fill="#200e04"/>
<circle class="gem-sapph" cx="166" cy="10" r="5" fill="url(#sapphG)"/><path d="M162 7 L166 5.5 L170 7 L166 14Z" fill="rgba(255,255,255,0.28)"/><path d="M162 7 L166 5.5 L170 7Z" fill="rgba(255,255,255,0.45)"/>
<g transform="translate(81,0)"><path d="M9 0 L14 8 L9 5.5 L4 8 Z" fill="url(#lidGold)"/><circle cx="9" cy="14" r="5" fill="url(#lidGold)"/><circle class="gem-ameth" cx="9" cy="14" r="3" fill="url(#amethG)"/><path d="M6 11 L9 9.5 L12 11 L9 17Z" fill="rgba(255,255,255,0.3)"/></g>
<circle cx="45" cy="64" r="4.5" fill="url(#lidGold)"/><circle cx="45" cy="64" r="2.5" fill="#180c04"/>
<circle cx="90" cy="64" r="4.5" fill="url(#lidGold)"/><circle cx="90" cy="64" r="2.5" fill="#180c04"/>
<circle cx="135" cy="64" r="4.5" fill="url(#lidGold)"/><circle cx="135" cy="64" r="2.5" fill="#180c04"/>
<path d="M4 64 Q4 8 90 3 Q176 8 176 64" stroke="#c8a0ff" stroke-width="1" fill="none" opacity="0.15"/>
</svg>`;

const BODY_SVG = `<svg class="chest-svg-body" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bodyGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd080"/><stop offset="35%" stop-color="#b87333"/><stop offset="70%" stop-color="#7a4f18"/><stop offset="100%" stop-color="#c8903a"/></linearGradient>
<linearGradient id="bodySheen" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="rgba(255,160,60,0.1)"/><stop offset="15%" stop-color="rgba(0,0,0,0)"/><stop offset="85%" stop-color="rgba(0,0,0,0)"/><stop offset="100%" stop-color="rgba(255,160,60,0.08)"/></linearGradient>
<radialGradient id="rubyB" cx="38%" cy="32%" r="55%"><stop offset="0%" stop-color="#ff9090"/><stop offset="45%" stop-color="#cc2020"/><stop offset="100%" stop-color="#600000"/></radialGradient>
<radialGradient id="sapphB" cx="38%" cy="32%" r="55%"><stop offset="0%" stop-color="#90b8ff"/><stop offset="45%" stop-color="#1a50c0"/><stop offset="100%" stop-color="#041840"/></radialGradient>
<radialGradient id="emerB" cx="38%" cy="32%" r="55%"><stop offset="0%" stop-color="#90ffb0"/><stop offset="45%" stop-color="#1a9040"/><stop offset="100%" stop-color="#052818"/></radialGradient>
<radialGradient id="amethB" cx="38%" cy="32%" r="55%"><stop offset="0%" stop-color="#d8b4ff"/><stop offset="45%" stop-color="#7030c0"/><stop offset="100%" stop-color="#1e0840"/></radialGradient>
</defs>
<rect x="1" y="0" width="178" height="88" rx="5" stroke="url(#bodyGold)" stroke-width="1.8" fill="none"/>
<rect x="8" y="7" width="164" height="74" rx="3" stroke="#b87333" stroke-width="0.7" fill="none" opacity="0.3" stroke-dasharray="5 4"/>
<line x1="40" y1="2" x2="40" y2="86" stroke="rgba(50,22,5,0.45)" stroke-width="1.2"/>
<line x1="90" y1="2" x2="90" y2="86" stroke="rgba(50,22,5,0.3)" stroke-width="0.8"/>
<line x1="140" y1="2" x2="140" y2="86" stroke="rgba(50,22,5,0.45)" stroke-width="1.2"/>
<line x1="1" y1="44" x2="179" y2="44" stroke="rgba(50,22,5,0.4)" stroke-width="0.8" stroke-dasharray="5 4"/>
<rect x="1" y="0" width="178" height="88" rx="5" fill="url(#bodySheen)"/>
<rect x="1" y="37" width="178" height="14" fill="rgba(184,115,51,0.18)"/>
<line x1="1" y1="37" x2="179" y2="37" stroke="url(#bodyGold)" stroke-width="1.5"/>
<line x1="1" y1="51" x2="179" y2="51" stroke="url(#bodyGold)" stroke-width="1.5"/>
<circle class="gem-emerald" cx="55" cy="44" r="4" fill="url(#emerB)"/><path d="M52 41 L55 39.5 L58 41 L55 48Z" fill="rgba(255,255,255,0.28)"/>
<circle class="gem-ruby" cx="125" cy="44" r="4" fill="url(#rubyB)"/><path d="M122 41 L125 39.5 L128 41 L125 48Z" fill="rgba(255,255,255,0.28)"/>
<rect x="1" y="70" width="28" height="18" rx="3" fill="url(#bodyGold)"/><rect x="3" y="72" width="24" height="14" rx="2" fill="#1c0e04"/>
<circle class="gem-ameth" cx="15" cy="79" r="5.5" fill="url(#amethB)"/><path d="M11 76 L15 74 L19 76 L15 84Z" fill="rgba(255,255,255,0.26)"/><path d="M11 76 L15 74 L19 76Z" fill="rgba(255,255,255,0.42)"/>
<rect x="151" y="70" width="28" height="18" rx="3" fill="url(#bodyGold)"/><rect x="153" y="72" width="24" height="14" rx="2" fill="#1c0e04"/>
<circle class="gem-emerald" cx="165" cy="79" r="5.5" fill="url(#emerB)"/><path d="M161 76 L165 74 L169 76 L165 84Z" fill="rgba(255,255,255,0.26)"/>
<rect x="1" y="0" width="28" height="18" rx="3" fill="url(#bodyGold)"/><rect x="3" y="2" width="24" height="14" rx="2" fill="#1c0e04"/>
<circle class="gem-ruby" cx="15" cy="9" r="5.5" fill="url(#rubyB)"/><path d="M11 6 L15 4 L19 6 L15 14Z" fill="rgba(255,255,255,0.26)"/><path d="M11 6 L15 4 L19 6Z" fill="rgba(255,255,255,0.42)"/>
<rect x="151" y="0" width="28" height="18" rx="3" fill="url(#bodyGold)"/><rect x="153" y="2" width="24" height="14" rx="2" fill="#1c0e04"/>
<circle class="gem-sapph" cx="165" cy="9" r="5.5" fill="url(#sapphB)"/><path d="M161 6 L165 4 L169 6 L165 14Z" fill="rgba(255,255,255,0.26)"/>
<rect x="76" y="28" width="28" height="30" rx="4" fill="url(#bodyGold)"/><rect x="79" y="31" width="22" height="24" rx="3" fill="#180a03"/>
<path d="M86 45 Q86 37 90 35 Q94 37 94 45" stroke="url(#bodyGold)" stroke-width="2" fill="none"/>
<circle cx="90" cy="47" r="4.5" fill="url(#bodyGold)"/><circle cx="90" cy="47" r="2.8" fill="#0e0604"/>
<path d="M88.5 47 L88.5 53 L91.5 53 L91.5 47" fill="url(#bodyGold)"/><path d="M88.5 47 L88.5 53 L91.5 53 L91.5 47" fill="#0e0604" opacity="0.5"/>
<circle class="gem-ruby" cx="90" cy="32" r="3.5" fill="url(#rubyB)"/><path d="M87 29.5 L90 28 L93 29.5 L90 35.5Z" fill="rgba(255,255,255,0.35)"/>
<circle cx="32" cy="22" r="2.5" fill="url(#bodyGold)" opacity="0.8"/><circle cx="32" cy="66" r="2.5" fill="url(#bodyGold)" opacity="0.8"/>
<circle cx="148" cy="22" r="2.5" fill="url(#bodyGold)" opacity="0.8"/><circle cx="148" cy="66" r="2.5" fill="url(#bodyGold)" opacity="0.8"/>
<ellipse cx="90" cy="90" rx="80" ry="6" fill="#000" opacity="0.5"/>
</svg>`;

// ═══ TAROT CARD SVG PATTERN ═══

const TAROT_CARD_SVG = (gradientId) => `<svg class="tarot-card__pattern" viewBox="0 0 160 260" fill="none">
<defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffd080"/><stop offset="40%" stop-color="#b87333"/><stop offset="100%" stop-color="#c8903a"/></linearGradient></defs>
<rect x="2" y="2" width="156" height="256" rx="12" fill="#0e0803" stroke="url(#${gradientId})" stroke-width="2"/>
<rect x="10" y="10" width="140" height="240" rx="8" stroke="#b87333" stroke-width="0.8" fill="none" opacity="0.4" stroke-dasharray="6 5"/>
<circle cx="80" cy="130" r="55" stroke="#b87333" stroke-width="0.9" fill="none" opacity="0.3"/>
<circle cx="80" cy="130" r="35" stroke="#b87333" stroke-width="0.6" fill="none" opacity="0.2"/>
<path d="M80 75 L122 147 L38 147 Z" stroke="#b87333" stroke-width="1" fill="none" opacity="0.45"/>
<path d="M80 185 L38 113 L122 113 Z" stroke="#b87333" stroke-width="1" fill="none" opacity="0.45"/>
<circle cx="80" cy="130" r="8" fill="#b87333" opacity="0.35"/>
<circle cx="80" cy="130" r="4" fill="#ffd080" opacity="0.6"/>
<path d="M10 10 L26 10 L26 14 L14 14 L14 26 L10 26Z" fill="#b87333" opacity="0.6"/>
<path d="M150 10 L134 10 L134 14 L146 14 L146 26 L150 26Z" fill="#b87333" opacity="0.6"/>
<path d="M10 250 L26 250 L26 246 L14 246 L14 234 L10 234Z" fill="#b87333" opacity="0.6"/>
<path d="M150 250 L134 250 L134 246 L146 246 L146 234 L150 234Z" fill="#b87333" opacity="0.6"/>
<rect x="2" y="2" width="156" height="256" rx="12" stroke="#c8a0ff" stroke-width="0.8" fill="none" opacity="0.12"/>
</svg>`;
