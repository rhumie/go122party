# 競合検知のフロー（ざっくり）

<div flex="~ col" box-border app-content-container>

`http.Handle` の中身を追ってみると...

<div grid="~ cols-2 gap-4" h-full overflow-hidden>
<div text-sm h-full overflow-hidden class="paragraph-m-0">

```go {all|2737|2748-2751|2762-2774|2775}{maxHeight:'327px',lines:true,startLine:2737}
func (mux *ServeMux) registerErr(patstr string, handler Handler) error {
	if patstr == "" {
		return errors.New("http: invalid pattern")
	}
	if handler == nil {
		return errors.New("http: nil handler")
	}
	if f, ok := handler.(HandlerFunc); ok && f == nil {
		return errors.New("http: nil handler")
	}

	pat, err := parsePattern(patstr)
	if err != nil {
		return fmt.Errorf("parsing %q: %w", patstr, err)
	}

	// Get the caller's location, for better conflict error messages.
	// Skip register and whatever calls it.
	_, file, line, ok := runtime.Caller(3)
	if !ok {
		pat.loc = "unknown location"
	} else {
		pat.loc = fmt.Sprintf("%s:%d", file, line)
	}

	mux.mu.Lock()
	defer mux.mu.Unlock()
	// Check for conflict.
	if err := mux.index.possiblyConflictingPatterns(pat, func(pat2 *pattern) error {
		if pat.conflictsWith(pat2) {
			d := describeConflict(pat, pat2)
			return fmt.Errorf("pattern %q (registered at %s) conflicts with pattern %q (registered at %s):\n%s",
				pat, pat.loc, pat2, pat2.loc, d)
		}
		return nil
	}); err != nil {
		return err
	}
	mux.tree.addPattern(pat, handler)
	mux.index.addPattern(pat)
	mux.patterns = append(mux.patterns, pat)
	return nil
}
```

<div text-2xs>

cf. https://github.com/golang/go/blob/go1.22.1/src/net/http/server.go#L2737

</div>
</div>

<div h-full overflow-hidden>
<img alt="index" src="https://lh3.googleusercontent.com/d/1Hi2Rmm1m5L1ydXzvP6jUG-Tb7isMWQTv" mx-auto object-contain h-full w-full />
</div>

</div>
</div>
