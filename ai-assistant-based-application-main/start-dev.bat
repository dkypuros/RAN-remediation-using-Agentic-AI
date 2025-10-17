@echo off
powershell -NoProfile -ExecutionPolicy Bypass -Command "& {. $PROFILE; fnm use default; cd '%~dp0'; npm run dev}"
