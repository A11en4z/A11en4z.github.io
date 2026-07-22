/** 首页双区块：AI 资讯 + 运维笔记（manifest 由 DailyBrief publish-allenspace 更新） */
module.exports = {
  homeHeroAfter: `
<div class="allen-home-panels" id="allen-home-panels">
  <div class="allen-panel allen-panel-brief">
    <div class="allen-panel-head">
      <h2>AI 资讯</h2>
      <a class="allen-panel-more" href="/pages/brief-archive/">全部 →</a>
    </div>
    <p class="allen-panel-lead" id="allen-brief-lead">加载中…</p>
    <ul class="allen-panel-links" id="allen-brief-dates"></ul>
    <a class="allen-panel-cta" id="allen-brief-cta" href="/brief/">阅读最新晚报</a>
  </div>
  <div class="allen-panel allen-panel-notes">
    <div class="allen-panel-head">
      <h2>运维学习笔记</h2>
      <a class="allen-panel-more" href="/cloud/">目录 →</a>
    </div>
    <p class="allen-panel-lead">Kubernetes 练习手册、Docker 基础与云原生实践笔记。</p>
    <ul class="allen-panel-links">
      <li><a href="/cloud/#K8S">K8S 练习手册</a></li>
      <li><a href="/cloud/#Docker">Docker 基本概念</a></li>
      <li><a href="/cloud/">云原生目录</a></li>
    </ul>
    <a class="allen-panel-cta" href="/cloud/">进入云原生</a>
  </div>
</div>
<style>
.allen-home-panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
  max-width: 960px;
  margin: 0 auto 2rem;
  padding: 0 1.5rem;
}
.allen-panel {
  border: 1px solid var(--border-color, #eaecef);
  border-radius: 10px;
  padding: 1.25rem 1.35rem;
  background: var(--card-bg, rgba(255,255,255,.6));
  box-shadow: 0 2px 12px rgba(0,0,0,.04);
}
.allen-panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
}
.allen-panel-head h2 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 650;
}
.allen-panel-more {
  font-size: 0.85rem;
  opacity: 0.75;
  text-decoration: none;
}
.allen-panel-more:hover { opacity: 1; text-decoration: underline; }
.allen-panel-lead {
  margin: 0 0 0.85rem;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--text-color-secondary, #666);
}
.allen-panel-links {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}
.allen-panel-links li { padding: 0.35rem 0; }
.allen-panel-links a { text-decoration: none; font-size: 0.95rem; }
.allen-panel-links a:hover { text-decoration: underline; }
.allen-panel-cta {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.45rem 0.85rem;
  border-radius: 6px;
  background: var(--theme-color, #11a8cd);
  color: #fff !important;
}
.allen-panel-cta:hover { filter: brightness(0.95); }
</style>
<script>
(function () {
  var lead = document.getElementById('allen-brief-lead');
  var dates = document.getElementById('allen-brief-dates');
  var cta = document.getElementById('allen-brief-cta');
  if (!lead || !dates) return;

  fetch('/brief/manifest.json')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
    .then(function (data) {
      var latest = data.latest;
      var headline = data.headline || latest || '暂无';
      var overview = (data.overview || '').trim();
      lead.textContent = overview || ('最新 ' + (latest || '') + '：' + headline);

      var items = (data.dates || []).slice(0, 5);
      if (items.length === 0) {
        dates.innerHTML = '<li>暂无晚报</li>';
        return;
      }
      dates.innerHTML = items.map(function (item) {
        return '<li><a href="' + item.url + '">' + item.date + '</a> — ' +
          (item.headline || item.date) + '</li>';
      }).join('');
      if (cta && latest) cta.href = '/brief/' + latest + '/' + latest + '.html';
    })
    .catch(function () {
      lead.textContent = '晚报归档尚未同步，请稍后再来。';
      dates.innerHTML = '<li><a href="/pages/brief-archive/">查看归档页</a></li>';
    });
})();
</script>
`,
}
