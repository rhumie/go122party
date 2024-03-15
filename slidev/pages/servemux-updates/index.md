# ServeMuxの機能拡張

- HTTPメソッドの指定が可能に

  ```go
  http.Handle("GET /posts", handler)
  ```

- ワイルドカードの指定が可能に

  ```go
  http.Handle("GET /posts/{id}", handler)
  ```

  マルチワイルドカードも

  ```go
  http.Handle("GET /file/{pathname...}", handler)
  ```

- 末尾スラッシュのパスマッチが可能に

  ```go
  http.Handle("GET /posts/{$}", handler)
  ```
