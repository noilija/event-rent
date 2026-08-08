# Set assets — priprema fajlova

Folder `set_assets` služi kao inbox za originalne fajlove. Originali se ne
preimenuju i ne brišu. Fajlovi spremni za sajt kopiraju se u kategorije unutar
`public/set_assets` i dobijaju stabilne nazive na engleskom jeziku.

## Tehnički standard

- Format: PNG ili WebP sa providnom pozadinom.
- Perspektiva: odozgo ili iz istog blagog ugla kao ostali elementi seta.
- Osvetljenje: svetlo dolazi iz približno istog pravca na svim predmetima.
- Kadar: ceo predmet mora biti vidljiv i centriran, bez odsečenih ivica.
- Senka: bez tvrde pozadinske senke; dozvoljena je blaga senka uz predmet.
- Rezolucija: najmanje dvostruko veća od planirane veličine prikaza.
- Nazivi: mala slova i crtice, na primer `fork-gold.png`.

## Postojeći normalizovani asseti

| Original | Fajl za sajt | Status |
| --- | --- | --- |
| `ceo_set.png` | `sets/elegant-set-01.png` | spremno |
| `ceo_set_svetli_krugovi.png` | `sets/elegant-set-02-light-circles.png` | spremno |
| `velika_kasika.png` | `cutlery/spoon-large-gold.png` | spremno |
| `mala_kasika.png` | `cutlery/spoon-small-gold.png` | spremno |
| `mali_tanjir.png` | `plates/plate-dark-small.png` | spremno |
| `casa.png` | `glasses/glass-gold-rim.png` | spremno |
| `salveta.png` | `napkins/napkin-champagne.png` | spremno |
| `prsten_za_salvetu.png` | `rings/napkin-ring-gold-triple.png` | spremno |

## Nedostaje samo za pojedinačno slaganje seta

- veliki providni podmetač sa zlatnim kuglicama
  (`plates/charger-clear-gold-beaded.png`);
- glavni tamni tanjir, ako se razlikuje od postojećeg malog tanjira
  (`plates/plate-dark-dinner.png`);
- zlatna viljuška (`cutlery/fork-gold.png`);
- zlatni nož (`cutlery/knife-gold.png`);
- crni stolnjak kao velika tekstura ili fotografija bez perspektivnog sečenja
  (`tablecloths/tablecloth-black.png`);
- po potrebi dodatna čaša ako komplet koristi više vrsta čaša.

Kada ovi fajlovi budu dodati u inbox, potrebno ih je proveriti i kopirati u
odgovarajuće foldere u `public/set_assets` pre izrade kompozicije.
