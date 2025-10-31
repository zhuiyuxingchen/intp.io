---
layout: default
title: 首页
---

<div class="feed-container">
    <div id="articleFeed" class="article-feed">
        <!-- 文章将通过JavaScript动态加载 -->
    </div>
    
    <div class="load-more-container">
        <div id="loadingIndicator" class="loading-indicator" style="display: none;">
            <div class="spinner"></div>
            <span>正在加载...</span>
        </div>
        <div id="noMoreArticles" class="no-more-articles" style="display: none;">
            <p>🎉 已经看完所有文章了！</p >
        </div>
    </div>
</div>

<script>
// 完整的文章数据（模拟）
const allArticles = [
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
    {
        id: 4,
        title: "前端开发学习路径",
        author: "追雨星辰",
        date: "3天前",
        excerpt: "分享前端开发的学习路线和资源推荐，适合初学者参考。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/18/前端开发学习路径.html",
        categories: ["技术", "学习"]
    },
    {
        id: 5,
        title: "CSS布局技巧总结",
        author: "追雨星辰",
        date: "4天前",
        excerpt: "整理常用的CSS布局技巧和最佳实践，提升页面布局能力。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/19/css布局技巧总结.html",
        categories: ["技术", "CSS"]
    }
    // 可以继续添加更多测试文章...
];

class ArticleFeed {
    constructor() {
        this.feedContainer = document.getElementById('articleFeed');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.noMoreArticles = document.getElementById('noMoreArticles');
        
        this.currentPage = 0;
        this.articlesPerPage = 2; // 每次加载2篇文章
        this.isLoading = false;
        this.hasMoreArticles = true;
        
        this.init();
    }
    
    init() {
        this.loadArticles();
        this.setupScrollListener();
    }
    
    // 设置滚动监听
    setupScrollListener() {
        // 使用防抖函数避免频繁触发
        this.scrollHandler = this.throttle(() => {
            if (this.shouldLoadMore()) {
                this.loadArticles();
            }
        }, 200);
        
        window.addEventListener('scroll', this.scrollHandler);
    }
    
    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // 判断是否应该加载更多
    shouldLoadMore() {
        if (this.isLoading || !this.hasMoreArticles) {
            return false;
        }
        
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 当滚动到距离底部300px时开始加载
        return (scrollTop + windowHeight >= documentHeight - 300);
    }
    
    // 加载文章
    async loadArticles() {
        if (this.isLoading || !this.hasMoreArticles) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            // 模拟网络延迟
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const startIndex = this.currentPage * this.articlesPerPage;
            const endIndex = startIndex + this.articlesPerPage;
            const articlesToShow = allArticles.slice(startIndex, endIndex);
            
            if (articlesToShow.length > 0) {
                articlesToShow.forEach(article => {
                    this.feedContainer.appendChild(this.createArticleElement(article));
                });
                this.currentPage++;
                
                // 检查是否还有更多文章
                this.hasMoreArticles = (this.currentPage * this.articlesPerPage) < allArticles.length;
                
                if (!this.hasMoreArticles) {
                    this.showNoMoreArticles();
                    // 移除滚动监听，因为已经没有更多文章了
                    window.removeEventListener('scroll', this.scrollHandler);
                }
            } else {
                this.hasMoreArticles = false;
                this.showNoMoreArticles();
                window.removeEventListener('scroll', this.scrollHandler);
            }
        } catch (error) {
            console.error('加载文章失败:', error);
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }
    
    // 创建文章元素
    createArticleElement(article) {
        const articleEl = document.createElement('article');
        articleEl.className = 'article-card';
        articleEl.innerHTML = this.getArticleHTML(article);
        return articleEl;
    }
    
    // 获取文章HTML
    getArticleHTML(article) {
        return `
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
        `;
    }
    
    // 显示加载指示器
    showLoading() {
        this.loadingIndicator.style.display = 'flex';
    }
    
    // 隐藏加载指示器
    hideLoading() {
        this.loadingIndicator.style.display = 'none';
    }
    
    // 显示没有更多文章
    showNoMoreArticles() {
        this.noMoreArticles.style.display = 'block';
    }
}

// 页面加载完成后初始化文章流
document.addEventListener('DOMContentLoaded', function() {
    new ArticleFeed();
});
</script>
