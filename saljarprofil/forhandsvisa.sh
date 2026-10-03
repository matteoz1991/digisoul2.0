#!/usr/bin/env bash
# Lokal förhandsvisning: bygger och startar en webbserver på http://localhost:8765/s/<slug>/
cd "$(dirname "$0")" && python3 build.py && cd dist && echo "Öppna: http://localhost:8765/s/sara-jecm69/" && python3 -m http.server 8765
