---
layout: default
title: 首页
---

<div class="feed-container">
    <div id="articleFeed" class="article-grid">
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
// 完整的文章数据（模拟更多文章以测试三列布局）
const allArticles = [
    {
        id: 1,
        title: "我的第一篇文章",
        author: "追雨星辰",
        date: "3小时前",
        excerpt: "这是我的第一篇测试文章，用于验证网站功能是否正常。在这里我将分享我的学习和思考过程。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/15/我的第一篇文章.html",
        categories: ["测试", "教程"],
        image: "📄"
    },
    {
        id: 2,
        title: "GitHub使用技巧分享",
        author: "追雨星辰", 
        date: "1天前",
        excerpt: "分享一些实用的GitHub技巧和使用方法，帮助提高开发效率。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/16/github使用技巧.html",
        categories: ["技术", "GitHub"],
        image: "⚙️"
    },
    {
        id: 3,
        title: "静态网站搭建心得",
        author: "追雨星辰",
        date: "2天前", 
        excerpt: "记录使用GitHub Pages和Jekyll搭建静态网站的过程和心得体会。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/17/静态网站搭建心得.html",
        categories: ["技术", "建站"],
        image: "🌐"
    },
    {
        id: 4,
        title: "前端开发学习路径",
        author: "追雨星辰",
        date: "3天前",
        excerpt: "分享前端开发的学习路线和资源推荐，适合初学者参考。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/18/前端开发学习路径.html",
        categories: ["技术", "学习"],
        image: "📚"
    },
    {
        id: 5,
        title: "CSS布局技巧总结",
        author: "追雨星辰",
        date: "4天前",
        excerpt: "整理常用的CSS布局技巧和最佳实践，提升页面布局能力。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/19/css布局技巧总结.html",
        categories: ["技术", "CSS"],
        image: "🎨"
    },
    {
        id: 6,
        title: "JavaScript核心概念",
        author: "追雨星辰",
        date: "5天前",
        excerpt: "深入理解JavaScript的核心概念和运行机制。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/20/javascript核心概念.html",
        categories: ["技术", "JavaScript"],
        image: "💻"
    },
    {
        id: 7,
        title: "响应式设计原理",
        author: "追雨星辰",
        date: "1周前",
        excerpt: "掌握响应式设计的核心原理和实现方法。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/21/响应式设计原理.html",
        categories: ["技术", "设计"],
        image: "📱"
    },
    {
        id: 8,
        title: "Vue.js入门指南",
        author: "追雨星辰",
        date: "1周前",
        excerpt: "从零开始学习Vue.js框架的基础知识和应用。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/22/vuejs入门指南.html",
        categories: ["技术", "Vue"],
        image: "🖖"
    },
    {
        id: 9,
        title: "React Hooks详解",
        author: "追雨星辰",
        date: "2周前",
        excerpt: "深入理解React Hooks的工作原理和使用场景。",
        content: "完整的文章内容...",
        url: "/intp.io/2024/01/23/react-hooks详解.html",
        categories: ["技术", "React"],
        image: "⚛️"
    }
];

class ArticleGrid {
    constructor() {
        this.feedContainer = document.getElementById('articleFeed');
        this.loadingIndicator = document.getElementById('loadingIndicator');
        this.noMoreArticles = document.getElementById('noMoreArticles');
        
        this.currentPage = 0;
        this.articlesPerPage = 6; // 每次加载6篇文章（2行）
        this.isLoading = false;
        this.hasMoreArticles = true;
        
        // 性能优化：使用requestAnimationFrame
        this.rafId = null;
        
        this.init();
    }
    
    init() {
        this.loadArticles();
        this.setupOptimizedScrollListener();
    }
    
    // 性能优化的滚动监听
    setupOptimizedScrollListener() {
        let ticking = false;
        
        const scrollHandler = () => {
            if (!ticking) {
                this.rafId = requestAnimationFrame(() => {
                    if (this.shouldLoadMore()) {
                        this.loadArticles();
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        // 使用被动事件监听器提升滚动性能
        window.addEventListener('scroll', scrollHandler, { passive: true });
        
        // 保存引用以便清理
        this.scrollHandler = scrollHandler;
    }
    
    // 判断是否应该加载更多
    shouldLoadMore() {
        if (this.isLoading || !this.hasMoreArticles) {
            return false;
        }
        
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // 当滚动到距离底部500px时开始加载
        return (scrollTop + windowHeight >= documentHeight - 500);
    }
    
    // 加载文章 - 性能优化版本
    async loadArticles() {
        if (this.isLoading || !this.hasMoreArticles) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            // 使用微任务延迟以避免阻塞主线程
            await new Promise(resolve => {
                setTimeout(resolve, 100); // 减少延迟时间
            });
            
            const startIndex = this.currentPage * this.articlesPerPage;
            const endIndex = startIndex + this.articlesPerPage;
            const articlesToShow = allArticles.slice(startIndex, endIndex);
            
            if (articlesToShow.length > 0) {
                // 使用文档片段批量插入DOM
                const fragment = document.createDocumentFragment();
                articlesToShow.forEach(article => {
                    fragment.appendChild(this.createArticleElement(article));
                });
                
                this.feedContainer.appendChild(fragment);
                this.currentPage++;
                
                // 检查是否还有更多文章
                this.hasMoreArticles = (this.currentPage * this.articlesPerPage) < allArticles.length;
                
                if (!this.hasMoreArticles) {
                    this.showNoMoreArticles();
                    // 移除滚动监听
                    window.removeEventListener('scroll', this.scrollHandler);
                    if (this.rafId) {
                        cancelAnimationFrame(this.rafId);
                    }
                }
            } else {
                this.hasMoreArticles = false;
                this.showNoMoreArticles();
                window.removeEventListener('scroll', this.scrollHandler);
                if (this.rafId) {
                    cancelAnimationFrame(this.rafId);
                }
            }
        } catch (error) {
            console.error('加载文章失败:', error);
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }
    
    // 创建文章元素 - 竖长方形版本
    createArticleElement(article) {
        const articleEl = document.createElement('article');
        articleEl.className = 'article-card';
        articleEl.innerHTML = this.getArticleHTML(article);
        return articleEl;
    }
    
    // 获取文章HTML - 三列布局优化版本
    getArticleHTML(article) {
        return `
            <div class="article-image">
                <span class="article-emoji">${article.image}</span>
            </div>
            <div class="article-content">
                <div class="article-header">
                    <h3 class="article-title">${article.title}</h3>
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
                    <a href=" " class="read-more-btn">阅读全文</a >
                </div>
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

// 页面加载完成后初始化文章网格
document.addEventListener('DOMContentLoaded', function() {
    new ArticleGrid();
});
</script>
