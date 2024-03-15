# 優先順位（1/2）

## "Longest Wins"から<span text-color-red>"Most Specific Wins"</span>へ

<div mt-4>

- 以前のServeMuxにおいては,単純にパターン文字列の長い方が優先(Longest Wins)されていた

- Go1.22では,ワイルドカードの導入により単純なLongest Winよりも優れたルールが必要となった  
  <span text-sm>例. Longest Winsでは`/posts/latest` よりも `/posts/{identifier}` が優先され得る</span>

- 結果的により具体的に（厳密に）マッチしているパターンを優先する形となった(Most Specific Wins)

</div>

<!--
登録順序や
互換性は維持したまま進化
-->

---

# 優先順位（2/2）

## パターンの関係性は5つに分類できる

<table mt-8>
  <tr></tr>
  <tr>
    <th>Disjoint</th>
    <td><img width="120" src="/img/venn-disjoint.png" /></td>
    <td text-sm>
      <div>P1とP2の両方にマッチすることはない（互いに素）</div>
      <div text-xs>例. P1:<code>/posts</code> P2:<code>/users</code></div>
    </td>
  </tr>
  <tr>
    <th>P1 More Specific</th>
    <td><img width="120" src="/img/venn-p1-more-specific.png" /></td>
    <td text-sm>
      <div>P1にマッチするものはP2にもマッチするが,その逆は必ずしもそうではない</div>
      <div text-xs>例. P1:<code>/posts/{id}</code> P2:<code>/posts/</code></div>
    </td>
  </tr>
  <tr>
    <th>P1 More General</th>
    <td><img width="120" src="/img/venn-p1-more-general.png" /></td>
    <td text-sm>
      <div>P2にマッチするものはP2にもマッチするが,その逆は必ずしもそうではない</div>
      <div text-xs>例. P1:<code>/posts/{id...}</code> P2:<code>/posts/{id}/users/{uid}</code></div>
    </td>
  </tr>
  <tr border-color-orange>
    <th>Overlapping</th>
    <td><img width="120" src="/img/venn-overlapping.png" /></td>
    <td text-sm>
      <div>P1とP2両方にマッチするものもあれば片方にしかマッチしないものもある</div>
      <div text-xs>
        例. P1:<code>/posts/{id}</code> P2:<code>/{resource}/latest</code><br />
        　・<code>/post/latest</code>の場合は両方にマッチ<br />
        　・<code>/post/1234</code>場合はP1のみ, <code>/users/123</code>の場合はP2のみにマッチ
      </div>
    </td>
  </tr>
  <tr>
    <th>Equivalent</th>
    <td><img width="120" src="/img/venn-equivalent.png" /></td>
    <td text-sm>
      <div>必ずP1とP2の両方にマッチする</div>
      <div text-xs>例. P1:<code>/posts/{id}</code> P2:<code>/posts/{name}</code></div>
    </td>
  </tr>
</table>

<style>
  table {
    th, td {
      padding: 0.25rem;
    }
  }
</style>
