

```
# Start arangodb
docker run -d -e ARANGO_ROOT_PASSWORD=somepassword -e ARANGO_STORAGE_ENGINE=rocksdb -p 8529:8529 -v /tmp/arangodb:/var/lib/arangodb3 arangodb:3.6
```