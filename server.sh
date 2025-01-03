#!/bin/bash

# Simple HTTP Server in Bash
PORT=80

echo "Starting HTTP server on port $PORT..."
while true; do
  # Wait for a connection and respond immediately
  {
    echo -e "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nHello, World!";
  } | sudo nc -N -l -p $PORT
done