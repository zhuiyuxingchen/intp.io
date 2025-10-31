// 动态从Jekyll数据加载文章
class ArticleFeed {
    constructor() {
        this.feedContainer = document.getElementById('articleFeed');
        this.currentPage = 0;
        this.articlesPerPage = 5;
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.loadArticles();
        this.setupInfiniteScroll();
    }
    
    async loadArticles() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();
        
        try {
            // 这里可以替换为从API获取数据
            const articles = await this.fetchArticles();
            
            if (articles.length > 0) {
                articles.forEach(article => {
                    this.feedContainer.appendChild(this.createArticleElement(article));
                });
                this.currentPage++;
            } else {
                this.showNoMoreArticles();
            }
        } catch (error) {
            console.error('加载文章失败:', error);
            this.showError();
        } finally {
            this.isLoading = false;
            this.hideLoading();
        }
    }
    
    async fetchArticles() {
        // 模拟API调用
        return new Promise(resolve => {
            setTimeout(() => {
                // 在实际应用中，这里应该调用真实的API
                // 现在返回模拟数据
                const mockArticles = this.generateMockArticles();
                resolve(mockArticles);
            }, 1000);
        });
    }
    
    generateMockArticles() {
        // 生成模拟文章数据
        const titles = [
            "探索现代Web开发技术",
            "JavaScript最佳实践",
            "CSS布局技巧分享",
            "响应式设计原理",
            "前端性能优化指南"
        ];
        
        const articles = [];
        const startIndex = this.currentPage * this.articlesPerPage;
        
        for (let i = 0; i < this.articlesPerPage; i++) {
            const title = titles[Math.floor(Math.random() * titles.length)];
            articles.push({
                id: startIndex + i + 1,
                title: title,
                author: "追雨星辰",
                date: this.generateRelativeTime(),
                excerpt: `这是关于${title}的详细内容摘要。这篇文章将深入探讨相关技术和实践方法。`,
                url: `/intp.io/2024/01/${15 + i}/article-${startIndex + i + 1}.html`,
                categories: ["技术", "前端开发"]
            });
        }
        
        return articles;
    }
    
    generateRelativeTime() {
        const times = ["刚刚", "1小时前", "2小时前", "1天前", "2天前", "3天前"];
        return times[Math.floor(Math.random() * times.length)];
    }
    
    createArticleElement(article) {
        const articleEl = document.createElement('article');
        articleEl.className = 'article-card';
        articleEl.innerHTML = this.getArticleHTML(article);
        return articleEl;
    }
    
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
    
    setupInfiniteScroll() {
        window.addEventListener('scroll', () => {
            if (this.shouldLoadMore()) {
                this.loadArticles();
            }
        });
    }
    
    shouldLoadMore() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        return (scrollTop + windowHeight >= documentHeight - 500) && !this.isLoading;
    }
    
    showLoading() {
        // 显示加载指示器
        let loader = document.getElementById('loadingIndicator');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'loadingIndicator';
            loader.className = 'loading-indicator';
            loader.innerHTML = `
                <div class="spinner"></div>
                <span>正在加载...</span>
            `;
            this.feedContainer.appendChild(loader);
        }
        loader.style.display = 'flex';
    }
    
    hideLoading() {
        const loader = document.getElementById('loadingIndicator');
        if (loader) {
            loader.style.display = 'none';
        }
    }
    
    showNoMoreArticles() {
        const message = document.createElement('p');
        message.className = 'no-more-articles';
        message.textContent = '🎉 已经看完所有文章了！';
        this.feedContainer.appendChild(message);
    }
    
    showError() {
        const error = document.createElement('p');
        error.className = 'error-message';
        error.textContent = '加载失败，请刷新页面重试';
        this.feedContainer.appendChild(error);
    }
}

// 初始化文章流
document.addEventListener('DOMContentLoaded', function() {
    new ArticleFeed();
});
