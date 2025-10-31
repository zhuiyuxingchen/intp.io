---
layout: default
title: 首页
---

<div class="feed-container">
    <!-- 文章流将在这里动态加载 -->
    <div id="articleFeed" class="article-feed">
        <!-- 文章将通过JavaScript动态加载 -->
    </div>
    
    <!-- 加载更多按钮 -->
    <div class="load-more-container">
        <button id="loadMore" class="load-more-btn">加载更多文章</button>
        <div id="loadingIndicator" class="loading-indicator" style="display: none;">
            <div class="spinner"></div>
            <span>正在加载...</span>
        </div>
    </div>
</div>

<script>
// 文章数据（在实际应用中，这些数据可以从Jekyll的site.posts生成）
const articles = [
    {
        id: 1,
        title: "我的第一篇文章",
        author: "追雨星辰",
        date: "3小时前",
        excerpt: "这是我的第一篇测试文章，用于验证网站功能是否正常。在这里我将分享我的学习和思考过程。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/15/我的第一篇文章.html",
        categories: ["测试", "教程"]
    },
    {
        id: 2,
        title: "GitHub使用技巧分享",
        author: "追雨星辰", 
        date: "1天前",
        excerpt: "分享一些实用的GitHub技巧和使用方法，帮助提高开发效率。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/16/github使用技巧.html",
        categories: ["技术", "GitHub"]
    },
    {
        id: 3,
        title: "静态网站搭建心得",
        author: "追雨星辰",
        date: "2天前", 
        excerpt: "记录使用GitHub Pages和Jekyll搭建静态网站的过程和心得体会。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/17/静态网站搭建心得.html",
        categories: ["技术", "建站"]
    },
    // 可以继续添加更多测试文章...
];

// 文章流功能
document.addEventListener('DOMContentLoaded', function() {
    const articleFeed = document.getElementById('articleFeed');
    const loadMoreBtn = document.getElementById('loadMore');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    let currentPage = 0;
    const articlesPerPage = 3;
    
    // 渲染单篇文章
    function renderArticle(article) {
        return `
        <article class="article-card" data-article-id="${article.id}">
            <div class="article-header">
                <h2 class="article-title">
                    <span class="article-icon">📝</span>
                    ${article.title}
                </h2>
                <div class="article-meta">
                    <span class="article-author">${article.author}</span>
                    <span class="article-date">${article.date}</span>
                </div>
            </div>
            
            <div class="article-excerpt">
                <p>${article.excerpt}</p >
            </div>
            
            <div class="article-footer">
                <div class="article-categories">
                    ${article.categories.map(cat => 
                        `<span class="category-tag">${cat}</span>`
                    ).join('')}
                </div>
                <a href=" " class="read-more-btn">阅读更多</a >
            </div>
        </article>
        `;
    }
    
    // 加载更多文章
    function loadMoreArticles() {
        loadingIndicator.style.display = 'flex';
        loadMoreBtn.style.display = 'none';
        
        // 模拟网络延迟
        setTimeout(() => {
            const startIndex = currentPage * articlesPerPage;
            const endIndex = startIndex + articlesPerPage;
            const articlesToShow = articles.slice(startIndex, endIndex);
            
            if (articlesToShow.length > 0) {
                articlesToShow.forEach(article => {
                    articleFeed.innerHTML += renderArticle(article);
                });
                currentPage++;
                loadMoreBtn.style.display = 'block';
            } else {
                loadMoreBtn.style.display = 'none';
                articleFeed.innerHTML += '<p class="no-more-articles">没有更多文章了</p >';
            }
            
            loadingIndicator.style.display = 'none';
        }, 800);
    }
    
    // 初始化加载第一页
    loadMoreArticles();
    
    // 绑定加载更多按钮事件
    loadMoreBtn.addEventListener('click', loadMoreArticles);
    
    // 无限滚动（可选）
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
            if (!loadingIndicator.style.display || loadingIndicator.style.display === 'none') {
                loadMoreArticles();
            }
        }
    });
});
</script>
