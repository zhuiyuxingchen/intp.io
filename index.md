---
layout: default
title: 首页
---

## 🌟 欢迎来到 {{ site.title }}

这里是追雨星辰的数字花园，分享技术思考和生活感悟。

### 精选文章

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

[查看全部文章...](/archives.html)

---

### 最新动态

网站正在不断完善中，即将推出更多精彩内容！
