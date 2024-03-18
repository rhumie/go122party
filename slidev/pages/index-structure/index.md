# インデックスの構造

<div flex="~ col" box-border app-content-container>

構造化したパターンがインデックスに登録される

<div grid="~ cols-2 gap-4" h-full overflow-hidden>

<div text-sm h-full overflow-hidden class="paragraph-m-0">

例. 次のパターン文字列が登録されている場合

<div text-xs>

- P1: `/posts/{id}`
- P2: `/posts/latest`
- P3: `/posts/`
- P4: `/posts/{$}`

</div>

```go {all}{maxHeight:'215px'}
type routingIndex struct {
    // セグメントの名称と位置をキーとするパターン群のマップ
    segments map[routingIndexKey][]*pattern
    // マルチワイルドカードを持つパターン群
    multis []*pattern
}

type routingIndexKey struct {
    pos int    // セグメントの位置（0始まり）
    s   string // セグメントの名称（ワイルドカードの場合は空）
}
```

<div text-2xs>

インデックスの構造体 cf. https://github.com/golang/go/blob/go1.22.1/src/net/http/routing_index.go#L14

</div>

</div>

<div h-full overflow-hidden>
<img alt="index" src="https://lh3.googleusercontent.com/d/1uMxM-co-ipPgK8eKdmpcbZw8JwxJwSu-" mx-auto object-contain h-full w-full />
</div>

</div>
</div>
