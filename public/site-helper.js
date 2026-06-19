// public/site-helper.js
(function() {
  'use strict';

  // 配置数据
  const CONFIG = {
    siteUrl: 'https://chinese-main-9you.com',
    keyword: '九游',
    cardTitle: '欢迎访问',
    badgeText: '热门'
  };

  // 提示卡片类
  class AlertCard {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.card = null;
    }

    create() {
      if (!this.container) return;
      
      this.card = document.createElement('div');
      this.card.className = 'site-alert-card';
      this.card.innerHTML = `
        <div class="alert-header">
          <span class="alert-icon">ℹ️</span>
          <span class="alert-title">${CONFIG.cardTitle}</span>
        </div>
        <div class="alert-body">
          <p>欢迎来到 <strong>${CONFIG.keyword}</strong> 相关页面。</p>
          <p>访问地址：<a href="${CONFIG.siteUrl}" target="_blank" rel="noopener">${CONFIG.siteUrl}</a></p>
          <p>请遵守平台使用规范，谢谢合作。</p>
        </div>
        <button class="alert-close">✕</button>
      `;

      this.container.appendChild(this.card);
      this.bindEvents();
    }

    bindEvents() {
      const closeBtn = this.card.querySelector('.alert-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.card.style.display = 'none';
        });
      }
    }
  }

  // 关键词徽章生成器
  class KeywordBadge {
    constructor(keywords) {
      this.keywords = keywords;
      this.badgeContainer = null;
    }

    render(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      this.badgeContainer = document.createElement('div');
      this.badgeContainer.className = 'keyword-badge-wrapper';

      this.keywords.forEach((kw) => {
        const badge = document.createElement('span');
        badge.className = 'keyword-badge';
        badge.textContent = kw;
        this.badgeContainer.appendChild(badge);
      });

      container.appendChild(this.badgeContainer);
    }
  }

  // 访问说明模块
  const AccessGuide = {
    render(containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const guide = document.createElement('div');
      guide.className = 'access-guide';
      guide.innerHTML = `
        <h3>访问说明</h3>
        <ul>
          <li>您当前正在浏览 <strong>${CONFIG.keyword}</strong> 相关内容。</li>
          <li>官方网址：${CONFIG.siteUrl}</li>
          <li>如遇问题，请检查网络连接或联系管理员。</li>
        </ul>
      `;

      container.appendChild(guide);
    }
  };

  // 样式注入
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .site-alert-card {
        position: fixed;
        top: 20px;
        right: 20px;
        width: 320px;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        padding: 16px;
        z-index: 9999;
        font-family: sans-serif;
      }
      .alert-header {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }
      .alert-icon {
        font-size: 20px;
        margin-right: 8px;
      }
      .alert-title {
        font-weight: bold;
        font-size: 16px;
      }
      .alert-body {
        font-size: 14px;
        line-height: 1.6;
        color: #333;
      }
      .alert-body a {
        color: #1a73e8;
        text-decoration: none;
      }
      .alert-body a:hover {
        text-decoration: underline;
      }
      .alert-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #888;
      }
      .keyword-badge-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 12px 0;
      }
      .keyword-badge {
        background: #e0f2fe;
        color: #0369a1;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 13px;
        font-weight: 500;
      }
      .access-guide {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 16px;
        margin: 16px 0;
      }
      .access-guide h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
      }
      .access-guide ul {
        margin: 0;
        padding-left: 20px;
      }
      .access-guide li {
        margin-bottom: 4px;
      }
    `;
    document.head.appendChild(style);
  }

  // 初始化
  function init() {
    injectStyles();

    // 创建提示卡片
    const card = new AlertCard('site-alert-card-container');
    card.create();

    // 创建关键词徽章
    const badgeKeywords = [CONFIG.keyword, '游戏', '平台'];
    const badge = new KeywordBadge(badgeKeywords);
    badge.render('keyword-badge-container');

    // 创建访问说明
    AccessGuide.render('access-guide-container');
  }

  // DOM 就绪后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();