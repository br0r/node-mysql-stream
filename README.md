# nmysql

Stream data directly from mysql instead of waiting for buffering.   
Only output for now.

## Installation
```
  npm install -g node-mysql-stream
```

## Usage
```bash
  nmysql user:password@host:port/db 'select * from test;' > data
```
