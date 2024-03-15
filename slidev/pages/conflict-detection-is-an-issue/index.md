# なぜ競合検知が性能の論点になるのか

> <span text-color-red>Registration time is potentially more of an issue.</span> With the precedence rules described here, checking a new pattern for conflicts seems to require looking at all existing patterns in the worst case. (Algorithm lovers, you are hereby nerd-sniped.) That means registering n patterns takes O(n2) time in the worst case.

- 単純に考えるとパターン登録のたびに,登録済みの全パターンと競合をチェックする必要がある  
  = 最悪の場合,計算量は$O(N^2)$となる

- [Discovery Document](https://discovery.googleapis.com/discovery/v1)をもとに収集した約5000パターンのGoogle APIに対して,単純に競合チェックを実施すると約1秒程度かかった（らしい）

<div mt-20 v-click>

ServeMuxでは,パターンの登録時に<span text-color-red>インデックスを作成</span>しておき,インデックスから<span text-color-red>効率よく競合し得るパターンを取得し,チェック</span>することで性能向上を図っている

</div>
