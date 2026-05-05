#!/usr/bin/env python3
"""
FTP-Deploy fuer das gmkb-karriere Theme.

Sicherheitsregeln:
  - Schreibt ausschliesslich nach /wp-content/themes/gmkb-karriere/ (NEUER Ordner)
  - Faellt sofort ab, wenn der Ziel-Ordner bereits Dateien aus einem fremden Theme enthaelt
  - Keine Loesch-Operationen
  - Keine Operationen ausserhalb des Theme-Pfads
"""

import os
import sys
import ftplib
from pathlib import Path

# Lade .env.local
env_file = Path(__file__).resolve().parent.parent / ".env.local"
env = {}
for line in env_file.read_text().splitlines():
    line = line.strip()
    if not line or line.startswith("#"):
        continue
    if "=" in line:
        k, v = line.split("=", 1)
        env[k] = v

LOCAL_ROOT  = Path(__file__).resolve().parent.parent / "wp-theme" / "gmkb-karriere"
REMOTE_ROOT = "/wp-content/themes/gmkb-karriere"

if not LOCAL_ROOT.is_dir():
    sys.exit(f"FATAL: lokaler Theme-Ordner fehlt: {LOCAL_ROOT}")

# Hard guard: kein anderer Pfad als /wp-content/themes/gmkb-karriere
if not REMOTE_ROOT.startswith("/wp-content/themes/gmkb-karriere"):
    sys.exit(f"FATAL: REMOTE_ROOT ausserhalb des Theme-Pfads: {REMOTE_ROOT}")


def connect():
    ftp = ftplib.FTP(env["FTP_HOST"], timeout=30)
    ftp.login(env["FTP_USER"], env["FTP_PASSWORD"])
    ftp.set_pasv(True)
    return ftp


def remote_exists(ftp, path):
    """True wenn der Pfad als Datei oder Ordner auf dem Server existiert."""
    try:
        ftp.size(path)
        return True
    except ftplib.error_perm:
        pass
    # Versuch als Ordner
    cwd = ftp.pwd()
    try:
        ftp.cwd(path)
        ftp.cwd(cwd)
        return True
    except ftplib.error_perm:
        return False


def ensure_remote_dir(ftp, path):
    """Lege Remote-Ordner an, falls nicht vorhanden. Idempotent."""
    parts = [p for p in path.split("/") if p]
    cur = ""
    for p in parts:
        cur = cur + "/" + p
        try:
            ftp.cwd(cur)
        except ftplib.error_perm:
            try:
                ftp.mkd(cur)
                print(f"  MKD {cur}")
                ftp.cwd(cur)
            except ftplib.error_perm as e:
                raise SystemExit(f"FATAL: kann Ordner {cur} nicht anlegen: {e}")
    ftp.cwd("/")


def upload_file(ftp, local_path: Path, remote_path: str):
    size = local_path.stat().st_size
    with local_path.open("rb") as fh:
        ftp.storbinary(f"STOR {remote_path}", fh, blocksize=64 * 1024)
    print(f"  PUT {remote_path}  ({size:,} bytes)")


def main():
    print(f"Local:  {LOCAL_ROOT}")
    print(f"Remote: {REMOTE_ROOT}")

    files = []
    for root, _dirs, fs in os.walk(LOCAL_ROOT):
        rel_root = Path(root).relative_to(LOCAL_ROOT)
        for f in fs:
            if f == ".DS_Store":
                continue
            local = Path(root) / f
            rel = (rel_root / f).as_posix()
            files.append((local, rel))
    files.sort(key=lambda x: x[1])

    total_bytes = sum(p.stat().st_size for p, _ in files)
    print(f"Files:  {len(files)} ({total_bytes:,} bytes total = {total_bytes/1024/1024:.1f} MB)\n")

    ftp = connect()
    print(f"Connected. Welcome: {ftp.welcome.splitlines()[0]}\n")

    # Sicherheits-Check: Theme-Pfad existiert nicht oder ist leer
    if remote_exists(ftp, REMOTE_ROOT):
        try:
            ftp.cwd(REMOTE_ROOT)
            existing = []
            ftp.retrlines("LIST", existing.append)
            if existing:
                print(f"  WARNUNG: {REMOTE_ROOT} existiert bereits mit {len(existing)} Eintraegen.")
                print("  Inhalt:")
                for e in existing[:20]:
                    print(f"    {e}")
                # Bei Re-Deploy: existing ist der vorherige Theme-Stand. Wir ueberschreiben File-für-File.
                print("  Re-Deploy-Mode: vorhandene Files werden ueberschrieben (STOR), keine Loeschungen.")
        except ftplib.error_perm:
            pass
    ftp.cwd("/")

    # Ordnerstruktur anlegen (alle eindeutigen Verzeichnisse)
    dirs_needed = set([REMOTE_ROOT])
    for _, rel in files:
        d = "/".join((REMOTE_ROOT + "/" + rel).split("/")[:-1])
        dirs_needed.add(d)
    for d in sorted(dirs_needed):
        ensure_remote_dir(ftp, d)
    print()

    # Files hochladen
    print(f"Uploading {len(files)} files...")
    for i, (local, rel) in enumerate(files, 1):
        remote = f"{REMOTE_ROOT}/{rel}"
        upload_file(ftp, local, remote)
        if i % 10 == 0:
            print(f"  ... {i}/{len(files)} done")

    print(f"\nVerifying counts on server...")
    # Gegen-Check: Datei-Anzahl auf dem Server
    server_count = 0
    server_bytes = 0
    def walk_remote(path):
        nonlocal server_count, server_bytes
        listing = []
        ftp.retrlines(f"LIST {path}", listing.append)
        for line in listing:
            parts = line.split(maxsplit=8)
            if len(parts) < 9:
                continue
            perms = parts[0]
            name = parts[8]
            full = f"{path}/{name}"
            if perms.startswith("d"):
                walk_remote(full)
            elif perms.startswith("-"):
                server_count += 1
                try:
                    server_bytes += ftp.size(full)
                except ftplib.error_perm:
                    pass

    walk_remote(REMOTE_ROOT)
    print(f"  Server: {server_count} files, {server_bytes:,} bytes")
    print(f"  Local:  {len(files)} files, {total_bytes:,} bytes")
    if server_count == len(files) and server_bytes == total_bytes:
        print("  -> MATCH")
    else:
        print(f"  -> DIFFERENZ! Bitte pruefen.")

    ftp.quit()
    print("\nDone.")


if __name__ == "__main__":
    main()
