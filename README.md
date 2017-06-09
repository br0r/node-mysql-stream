# nmysql

## DEPRECATED   
Refer to https://github.com/br0r/node-sql-stream instead.    

Stream data directly from mysql instead of waiting for buffering.   
Only output for now. And all output is JSON formatted.   

## Installation
```
  npm install -g node-mysql-stream
```

## Usage
```bash
  nmysql user:password@host:port/db 'select * from test;' > data
```
