# ServeMuxの拡張に伴う2つの性能懸念

> There are two situations where questions of performance arise: <span text-color-red>matching requests</span>, and <span text-color-red>detecting conflicts</span> during registration.

<div text-xs class="paragraph-m-0">

cf. <a href="https://github.com/golang/go/issues/61410#issue-1809745160">https://github.com/golang/go/issues/61410#issue-1809745160</a>

</div>

- リクエストのマッチング  
  リクエストされたURLを登録済みのパターンと照らし合わせて,対象のハンドラを呼び出す

- <p :class="0 < $clicks && 'text-color-red'">
  競合検知<br />
  ハンドラを登録するに際に,登録済みのパターンとの競合をチェックする<br />
  </p>
  <div v-click text-color-reset>👆Today's Topic

  - 競合とはそもそも何か？
  - なぜ競合検知が性能面での論点になるのか？
  - 具体的にどう対応しているか？

  </div>

<!--
・ルーティングの性能が支配的になることはない
-->
