---
title: AI 资讯归档
date: 2026-07-23 00:00:00
permalink: /pages/brief-archive/
sidebar: false
article: false
comment: false
editLink: false
---

<div class="brief-archive-page">
  <p class="brief-archive-meta" id="brief-archive-meta">加载归档列表…</p>
  <ul class="brief-archive-list" id="brief-archive-list"></ul>
  <p><a href="/brief/">→ 阅读最新晚报</a></p>
</div>

<style>
.brief-archive-page { max-width: 720px; }
.brief-archive-meta { color: var(--text-color-secondary, #888); font-size: 0.92rem; }
.brief-archive-list { list-style: none; padding: 0; margin: 1.5rem 0; }
.brief-archive-list li {
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--border-color, #eee);
}
.brief-archive-list a { font-weight: 600; text-decoration: none; }
.brief-archive-list a:hover { text-decoration: underline; }
.brief-archive-list .headline {
  display: block;
  margin-top: 0.25rem;
  font-weight: 400;
  color: var(--text-color-secondary, #666);
  font-size: 0.92rem;
}
</style>

<script>
(function () {
  var list = document.getElementById('brief-archive-list');
  var meta = document.getElementById('brief-archive-meta');
  if (!list) return;

  fetch('/brief/manifest.json')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (data) {
      var dates = data.dates || [];
      meta.textContent = dates.length + ' 期晚报 · 最新 ' + (data.latest || '—');
      if (dates.length === 0) {
        list.innerHTML = '<li>暂无晚报，请稍后再来。</li>';
        return;
      }
      list.innerHTML = dates.map(function (item) {
        return '<li><a href="' + item.url + '">' + item.date + '</a>' +
          (item.headline && item.headline !== item.date
            ? '<span class="headline">' + item.headline + '</span>'
            : '') +
          '</li>';
      }).join('');
    })
    .catch(function () {
      meta.textContent = '无法加载 manifest.json';
      list.innerHTML = '<li><a href="/brief/archive.html">打开静态归档页</a></li>';
    });
})();
</script>
