---
layout: home
title: "追雨星辰的数字花园"
subtitle: "在这里，种植思考，收获知识。"
---

<style>
.featured-section {
  font-size: 1.3em;
}
.featured-section h2 {
  font-size: 2em;
  color: #2c3e50;
}
.featured-section li {
  margin: 10px 0;
  padding: 8px;
  background: #f5f5f5;
}
</style>

<div class="featured-section">

## 🌟 精选文章

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

[查看全部文章...](/archives.html)

</div>
