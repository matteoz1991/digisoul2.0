#!/usr/bin/env bash
# Skärmdump i mobilformat (390 px bred, 2x) av den lokala förhandsvisningen -> saljarprofil-mobil.png
cd "$(dirname "$0")"; SLUG=${1:-sara-jecm69}
python3 build.py >/dev/null
(cd dist && python3 -m http.server 8766 >/dev/null 2>&1 & echo $! > /tmp/sp_srv.pid); sleep 1
google-chrome --headless=new --no-sandbox --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=390,6000 --screenshot=/tmp/sp_full.png "http://localhost:8766/s/$SLUG/" 2>/dev/null
kill "$(cat /tmp/sp_srv.pid)"
python3 - <<'PY'
from PIL import Image
im=Image.open('/tmp/sp_full.png').convert('RGB'); w,h=im.size; px=im.load(); y=h-1
while y>0 and all(px[x,y]==(245,246,242) for x in range(0,w,7)): y-=1
im.crop((0,0,w,y+1)).save('saljarprofil-mobil.png'); print('saljarprofil-mobil.png',w,y+1)
PY
