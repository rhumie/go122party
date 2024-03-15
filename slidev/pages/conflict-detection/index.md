# 競合検知（1/4）

<div flex="~ col" box-border app-content-container>

1.マルチワイルドカードを持つ全てのパターンと比較する<br /><br />

<div grid="~ cols-2 gap-4" h-full overflow-hidden>
<div text-sm h-full overflow-hidden class="paragraph-m-0">

<div h-24>

例. 登録対象のパターンが何であれ

-> `multis`に登録されている<span text-color-red font-bold>全パターン（P3）</span>と競合チェックを行う

</div>

<<< ./snippet/routing_index.go.snippet go {21-25}{maxHeight: '210px'}

<div text-2xs>

cf. https://github.com/golang/go/blob/go1.22.1/src/net/http/routing_index.go#L57

</div>
</div>

<div h-full overflow-hidden>
<img alt="index" src="https://lh3.googleusercontent.com/d/1L3oTlzCvLG2egZIye_iPbtSAzR5erplW" mx-auto object-contain h-full w-full />
</div>

</div>
</div>

---

# 競合検知（2/4）

<div flex="~ col" box-border app-content-container>

2.末尾ドルの場合は,同じ位置に末尾ドルを持つパターンと比較する<br /><br />

<div grid="~ cols-2 gap-4" h-full overflow-hidden>
<div text-sm h-full overflow-hidden class="paragraph-m-0">

<div h-24>

例. `GET /posts/oldest/{$}` を登録する場合

-> <span text-color-red font-bold>1番目にドル（`/`）を持つパターン（P4）</span>と競合チェックを行う

</div>

<<< ./snippet/routing_index.go.snippet go {26-32}{maxHeight: '210px'}

<div text-2xs>

cf. https://github.com/golang/go/blob/go1.22.1/src/net/http/routing_index.go#L57

</div>
</div>

<div h-full overflow-hidden>
<img alt="index" src="https://lh3.googleusercontent.com/d/1lYs-OPbku75vk9fkryvPn91JmFT0NCSb" mx-auto object-contain h-full w-full />
</div>

</div>
</div>

---

# 競合検知（3/4）

<div flex="~ col" box-border app-content-container>

3.登録対象のリテラルセグメントと同じ位置に「同名のセグメント名もしくはワイルドカード」を持つ  
パターンをインデックスから取得し,最も数が少ないパターン群と比較する

<div grid="~ cols-2 gap-4" h-full overflow-hidden>
<div text-sm h-full overflow-hidden class="paragraph-m-0">

<div h-24>

例. `GET /posts/latest/{categories}` を登録する場合  
-> <span text-color-red font-bold>2個のパターン（P1, P2）</span>と競合チェックを行う

<div text-xs>

- 0番目が `posts` or `""` のパターン　 -> 3個（P1, P2, P4）
- 1番目が `latest` or `""` のパターン　-> 2個（P1, P2）

</div>

</div>

<<< ./snippet/routing_index.go.snippet go {38-60}{maxHeight: '210px'}

<div text-2xs>

cf. https://github.com/golang/go/blob/go1.22.1/src/net/http/routing_index.go#L57

</div>
</div>

<div h-full overflow-hidden>
<img alt="index" src="https://lh3.googleusercontent.com/d/1qxLdcSdIlVYkAW9bzVz916pmYyWLnQ2p" mx-auto object-contain h-full w-full />
</div>

</div>
</div>

---

# 競合検知（4/4）

<div flex="~ col" box-border app-content-container>

4.ここまで競合チェックが行われていない場合は,全てのセグメントパターンと比較する  
（ワイルドカードのみで構成される場合が該当）

<div grid="~ cols-2 gap-4" h-full overflow-hidden>
<div text-sm h-full overflow-hidden class="paragraph-m-0">

<div h-24>

例. `GET /${resource}/${id}` を登録する場合

-> `segments`に登録されている<span text-color-red font-bold>全パターン</span>と競合チェックを行う

</div>

<<< ./snippet/routing_index.go.snippet go {62-66}{maxHeight: '210px'}

<div text-2xs>

cf. https://github.com/golang/go/blob/go1.22.1/src/net/http/routing_index.go#L57

</div>
</div>

<div h-full overflow-hidden>
<img alt="index" src="https://lh3.googleusercontent.com/d/1N2vfcEYAuuNSH0fPmNzWh9EjlvALU6P9" mx-auto object-contain h-full w-full />
</div>

</div>
</div>
