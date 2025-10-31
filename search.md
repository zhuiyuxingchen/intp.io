---
layout: default
title: 搜索
permalink: /search/
---

<div class="search-container">
    <h1>🔍 搜索文章</h1>
    
    <input type="text" id="searchInput" class="search-input" placeholder="输入关键词搜索文章内容..." autofocus>
    
    <div id="searchResults" class="search-results">
        <p>请输入关键词开始搜索...</p >
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // 简单的客户端搜索功能
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim().toLowerCase();
        
        if (searchTerm.length < 2) {
            searchResults.innerHTML = '<p>请输入至少2个字符进行搜索</p >';
            return;
        }
        
        // 显示搜索中状态
        searchResults.innerHTML = '<p>搜索中...</p >';
        
        // 模拟搜索延迟
        setTimeout(() => {
            performSearch(searchTerm);
        }, 300);
    });
    
    function performSearch(term) {
        // 这里可以集成更复杂的搜索逻辑
        // 目前使用简单的页面内容搜索
        const allLinks = [
            { title: '我的第一篇文章', url: '/intp.io/2024/01/15/我的第一篇文章.html', excerpt: '这是我的第一篇测试文章，用于验证网站功能是否正常。' },
            { title: 'GitHub使用技巧', url: '/intp.io/2024/01/16/github使用技巧.html', excerpt: '一些实用的GitHub技巧和使用方法。' }
            // 可以动态获取所有文章
        ];
        
        const results = allLinks.filter(item => 
            item.title.toLowerCase().includes(term) || 
            item.excerpt.toLowerCase().includes(term)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = `<p>没有找到包含 "<strong>${term}</strong>" 的文章</p >`;
        } else {
            let html = `<p>找到 ${results.length} 篇相关文章：</p >`;
            results.forEach(item => {
                html += `
                <div class="search-item">
                    <h3><a href=" ">${item.title}</a ></h3>
                    <p class="search-snippet">${item.excerpt}</p >
                </div>
                `;
            });
            searchResults.innerHTML = html;
        }
    }
});
</script>
