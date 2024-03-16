# そもそも競合とは？（1/2）

## \[問\] どちらのハンドラが呼ばれるでしょうか

<div mt-4>

<v-click at="1">

`curl /posts/latest`<v-click at="2"> -> <span text-color-red>判別できない!!!</span></v-click>

```go
http.Handle("GET /posts/{id}", handlerA)
http.Handle("GET /{resource}/latest", handlerB)
```

</v-click>
</div>

---

# そもそも競合とは？（2/2）

## 競合とは,呼び出すハンドラが一意に特定できない可能性がある状態

競合する場合は panic が発生

```sh{2-6}
$ go run main.go
panic: pattern "GET /{resource}/latest" (registered at ...) conflicts with pattern "GET /posts/{id}" (registered at ...):
GET /{resource}/latest and GET /posts/{id} both match some paths, like "/posts/latest".
But neither is more specific than the other.
GET /{resource}/latest matches "/resource/latest", but GET /posts/{id} doesn't.
GET /posts/{id} matches "/posts/id", but GET /{resource}/latest doesn't.
```

<div class="abs-br m-6">
<v-click>

では,具体的に競合する条件とは? >>>

</v-click>
</div>
