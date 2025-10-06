/**
 * Controller - ModelとViewの橋渡し、アプリケーションロジック
 */

const Controller = {
    // 初期化
    init() {
        // DOMの読み込み完了を待つ
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    },

    // セットアップ
    setup() {
        // Viewの初期化
        View.init();
        
        // 星を描画
        this.renderStars();
        
        // インタラクティブ要素の設定
        this.setupInteractiveElements();
        
        // パフォーマンス最適化
        this.optimizePerformance();
        
        // ページ読み込み完了後のアニメーション
        this.startPageAnimations();
    },

    // 星を描画
    renderStars() {
        View.renderStars(
            Model.starsData,
            Model.getStarSVG.bind(Model),
            Model.getRandomStarColor.bind(Model)
        );
    },

    // インタラクティブ要素の設定
    setupInteractiveElements() {
        // CTAボタンのホバーサウンド効果（オプション）
        this.setupButtonEffects();
        
        // 宝物アイテムのクリックイベント
        this.setupTreasureItems();
        
        // スクロールアニメーション
        this.setupScrollAnimations();
        
        // キーボードナビゲーション
        this.setupKeyboardNavigation();
    },

    // ボタンエフェクトの設定
    setupButtonEffects() {
        const buttons = document.querySelectorAll('.cta-button');
        
        buttons.forEach(button => {
            // ボタンにリップル効果を追加
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
            
            // ホバー時に軽い振動効果
            button.addEventListener('mouseenter', () => {
                this.addButtonVibration(button);
            });
        });
    },

    // リップル効果を作成
    createRippleEffect(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        // リップルアニメーションのスタイルを追加
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    },

    // ボタンの振動効果
    addButtonVibration(button) {
        button.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-1px)' },
            { transform: 'translateX(1px)' },
            { transform: 'translateX(-1px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 200,
            easing: 'ease-in-out'
        });
    },

    // 宝物アイテムの設定
    setupTreasureItems() {
        const treasureItems = document.querySelectorAll('.treasure-item');
        
        treasureItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.showTreasureDetail(item, index);
            });
            
            // ダブルクリックで特別なエフェクト
            item.addEventListener('dblclick', () => {
                this.createMagicEffect(item);
            });
        });
    },

    // 宝物の詳細を表示（将来的にモーダルなどで拡張可能）
    showTreasureDetail(item, index) {
        // キラキラエフェクトを追加
        this.createSparkleEffect(item);
        
        // アイテムをハイライト
        item.style.color = '#FFD700';
        setTimeout(() => {
            item.style.color = '';
        }, 500);
    },

    // 魔法のようなエフェクト
    createMagicEffect(element) {
        const rect = element.getBoundingClientRect();
        const container = document.querySelector('.container');
        
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const angle = (360 / 12) * i;
                const distance = 60 + Math.random() * 40;
                
                particle.style.cssText = `
                    position: absolute;
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                    width: 4px;
                    height: 4px;
                    background: linear-gradient(45deg, #FFD700, #FFA500);
                    border-radius: 50%;
                    pointer-events: none;
                    box-shadow: 0 0 10px #FFD700;
                    z-index: 1000;
                `;
                
                document.body.appendChild(particle);
                
                particle.animate([
                    {
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1
                    },
                    {
                        transform: `translate(
                            ${Math.cos(angle * Math.PI / 180) * distance}px,
                            ${Math.sin(angle * Math.PI / 180) * distance}px
                        ) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 800 + Math.random() * 400,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }).onfinish = () => particle.remove();
            }, i * 50);
        }
    },

    // キラキラエフェクト
    createSparkleEffect(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    font-size: ${12 + Math.random() * 8}px;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                document.body.appendChild(sparkle);
                
                sparkle.animate([
                    {
                        transform: 'translateY(0) scale(1) rotate(0deg)',
                        opacity: 1
                    },
                    {
                        transform: 'translateY(-30px) scale(1.5) rotate(180deg)',
                        opacity: 0
                    }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                }).onfinish = () => sparkle.remove();
            }, i * 100);
        }
    },

    // スクロールアニメーション
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        // 観察対象の要素を追加
        const animatedElements = document.querySelectorAll(
            '.story-text, .treasure-item, .failure-text, .closing-text'
        );
        
        animatedElements.forEach(el => observer.observe(el));
    },

    // キーボードナビゲーション
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Escキーで全てのエフェクトをクリア（将来的にモーダルなどで使用）
            if (e.key === 'Escape') {
                this.clearAllEffects();
            }
            
            // スペースキーでランダムな星をキラキラさせる
            if (e.key === ' ' && e.target === document.body) {
                e.preventDefault();
                this.triggerRandomStarEffect();
            }
        });
    },

    // ランダムな星のエフェクトをトリガー
    triggerRandomStarEffect() {
        const stars = document.querySelectorAll('.star');
        if (stars.length === 0) return;
        
        const randomStar = stars[Math.floor(Math.random() * stars.length)];
        randomStar.dispatchEvent(new MouseEvent('click'));
    },

    // 全てのエフェクトをクリア
    clearAllEffects() {
        // 動的に生成されたパーティクルなどを削除
        const particles = document.querySelectorAll(
            '.star-burst, .star-particle, [style*="pointer-events: none"]'
        );
        particles.forEach(p => p.remove());
    },

    // パフォーマンス最適化
    optimizePerformance() {
        // ページが非表示の時はアニメーションを停止
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.style.animationPlayState = 'paused';
            } else {
                document.body.style.animationPlayState = 'running';
            }
        });
        
        // スクロールイベントのスロットリング
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 100);
        });
    },

    // スクロール処理
    handleScroll() {
        // スクロール位置に応じた追加処理
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // 下部に近づいたら追加のキラキラエフェクト
        if (scrollPosition + windowHeight > document.body.scrollHeight - 200) {
            // フッター近くでの特別なエフェクト
            this.addFooterEffect();
        }
    },

    // フッターエフェクト
    addFooterEffect() {
        const footer = document.querySelector('.footer');
        if (!footer || footer.classList.contains('enhanced')) return;
        
        footer.classList.add('enhanced');
        
        // 軽い輝きを追加
        footer.style.transition = 'box-shadow 0.5s ease';
        footer.style.boxShadow = '0 -5px 20px rgba(255, 228, 181, 0.1)';
    },

    // ページアニメーション開始
    startPageAnimations() {
        // ページ読み込み完了後のウェルカムエフェクト
        setTimeout(() => {
            this.createWelcomeEffect();
        }, 3500);
    },

    // ウェルカムエフェクト
    createWelcomeEffect() {
        // 最初の数秒間、複数の星を同時にキラキラさせる
        const stars = document.querySelectorAll('.star');
        const numberOfStars = Math.min(5, stars.length);
        
        for (let i = 0; i < numberOfStars; i++) {
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * stars.length);
                stars[randomIndex].dispatchEvent(new MouseEvent('mouseenter'));
                
                setTimeout(() => {
                    stars[randomIndex].dispatchEvent(new MouseEvent('mouseleave'));
                }, 500);
            }, i * 200);
        }
    }
};

// アプリケーション開始
Controller.init();

// グローバルスコープに公開（デバッグ用）
window.Controller = Controller;