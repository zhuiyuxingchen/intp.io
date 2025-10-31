---
layout: home
title: "追雨星辰的数字花园"
subtitle: "在这里，种植思考，收获知识。"
---

## 🌟 精选文章

{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}

[查看全部文章...](/archives.html)

---

## 📚 分类浏览

{% for category in site.categories %}
### {{ category[0] }}
  {% for post in category[1] %}
  - [{{ post.title }}]({{ post.url }})
  {% endfor %}
{% endfor %}
