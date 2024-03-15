# ServeMuxの拡張に伴う2つの性能懸念

> There are two situations where questions of performance arise: <span text-color-red>matching requests</span>, and <span text-color-red>detecting conflicts</span> during registration.

<div text-sm>
cf. <a href="https://github.com/golang/go/issues/61410#issue-1809745160">https://github.com/golang/go/issues/61410#issue-1809745160</a>
</div>

- リクエストのマッチング  
  リクエストされたURLを登録済みのパターンと照らし合わせて,対象のハンドラを呼び出す

- <p :class="0 < $clicks && 'text-color-red'">
  競合検知<br />
  ハンドラを登録するに際に,登録済みのパターンとの競合をチェックする<br />
  </p>
  <span v-click text-color-reset>👆Today's Topic</span>

<!--
ルーティングの性能が支配的になることはない
-->
