# パターン文字列の構造化

<div flex="~ col" box-border app-content-container>

例. `GET /posts/{id}`を登録する場合

<div grid="~ cols-2 gap-4" h-full overflow-hidden>

<div h-full overflow-hidden>

```go {}
p := &pattern{
	str:    "GET /posts/{id}",  // ①
	method: "GET",              // ②
	host:   "",                 // ③
	segments: []segment{        // ④
		{
			s:     "posts",     // ④-1
			wild:  false,       // ④-2
			multi: false,       // ④-3
		},
		{
			s:     "id",
			wild:  true,
			multi: false,
		},
	},
  ...
}
```

</div>

<div text-base h-full overflow-hidden class="paragraph-m-0 list-style-none">

- ① `str` - パターン文字列
- ② `method` - メソッド名
- ③ `host` - ホスト名
- ④ `segments` - パスセグメント
- ④-1 `s` - セグメント名
- ④-2 `wild` - ワイルドカードかどうか
- ④-3 `multi` - マルチワイルドカードかどうか

<div text-xs mt-4>

ちなみに...  
末尾三点リーダー -> `&segment{s: "xxx", wild: true, multi: true}`
末尾スラッシュ -> `&segment{"s": "", "wild": true, "multi": true}`
末尾ドル -> `&segment{"s": "/", "wild": false, "multi": false}`

</div>

</div>

</div>
</div>
