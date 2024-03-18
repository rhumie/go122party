<!--

# 優先順位（1/2）

## "Longest Wins"から<span text-color-red>"Most Specific Wins"</span>へ

<div mt-4>

- 以前のServeMuxにおいては,単純にパターン文字列の長い方が優先（Longest Wins）されていた

- Go1.22では,ワイルドカードの導入により単純なLongest Winよりも優れたルールが必要となった
  <span text-sm>例. Longest Winsのままだと`/posts/latest` よりも `/posts/{identifier}` が常に優先されてしまう</span>

- どちらのパターンにもマッチする場合は,より具体的に（厳密に）マッチしているパターンを優先する形となった（Most Specific Wins）

</div>

-->

# 優先順位と競合

<div>競合するのは「Overlapping」と「Equivalent」の関係性<br />必ずしも重複するパターンが競合するとは限らない（Most Specific Wins）</div>

<div text-sm paragraph-m-0 mt-4>パターンの関係性は5つに分類できる</div>
<table>
  <tr></tr>
  <tr>
    <th>Disjoint</th>
    <td><img width="120" src="/img/venn-disjoint.png" /></td>
    <td text-sm>
      <div>P1とP2の両方にマッチすることはない（互いに素）</div>
      <div text-xs>例. P1:<code>/posts</code> P2:<code>/users</code></div>
    </td>
    <td text-sm>競合しない</td>
  </tr>
  <tr>
    <th>P1 More Specific</th>
    <td><img width="120" src="/img/venn-p1-more-specific.png" /></td>
    <td text-sm>
      <div>
        P1にマッチするものはP2にもマッチするが,その逆は必ずしもそうではない<br />
        <span text-color-red>-> 両方にマッチする場合はP1を優先</span>
      </div>
      <div text-xs>例. P1:<code>/posts/latest</code> P2:<code>/posts/{id}</code></div>
    </td>
    <td text-sm>競合しない</td>
  </tr>
  <tr>
    <th>P1 More General</th>
    <td><img width="120" src="/img/venn-p1-more-general.png" /></td>
    <td text-sm>
      <div>
        P2にマッチするものはP2にもマッチするが,その逆は必ずしもそうではない<br />
        <span text-color-red>-> 両方にマッチする場合はP2を優先</span>
      </div>
      <div text-xs>例. P1:<code>/posts/{id...}</code> P2:<code>/posts/{id}/users/{uid}</code></div>
    </td>
    <td text-sm>競合しない</td>
  </tr>
  <tr border-color-orange>
    <th>Overlapping</th>
    <td><img width="120" src="/img/venn-overlapping.png" /></td>
    <td text-sm>
      <div>P1とP2両方にマッチするものもあれば片方にしかマッチしないものもある</div>
      <div text-xs>
        例. P1:<code>/posts/{id}</code> P2:<code>/{resource}/latest</code>
        <div>　・<code>/post/latest</code>の場合は両方にマッチ</div>
        <div>　・<code>/post/1234</code>場合はP1のみ, <code>/users/latest</code>の場合はP2のみにマッチ</div>
      </div>
    </td>
    <td text-color-red text-sm>競合する</td>
  </tr>
  <tr>
    <th>Equivalent</th>
    <td><img width="120" src="/img/venn-equivalent.png" /></td>
    <td text-sm>
      <div>必ずP1とP2の両方にマッチする</div>
      <div text-xs>例. P1:<code>/posts/{id}</code> P2:<code>/posts/{name}</code></div>
    </td>
    <td text-color-red text-sm>競合する</td>
  </tr>
</table>

<style>
  table {
    th, td {
      padding: 0.25rem;
    }
  }
</style>
