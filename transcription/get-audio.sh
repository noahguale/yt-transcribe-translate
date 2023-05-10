#!/bin/zsh

VIDEO_ID=$1

if [ -z "$VIDEO_ID" ]; then
    echo "ERROR: Invalid Video ID"
    exit 1
fi

yt-dlp "https://www.youtube.com/watch?v=$VIDEO_ID" --format m4a -o "./uploads/%(id)s.%(ext)s" 2>&1

