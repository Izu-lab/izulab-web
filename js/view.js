/**
 * View - 表示とDOM操作
 */

const View = {
    // 星のコンテナを取得
    getStarsContainer() {
        return document.getElementById('stars-container');
    },

    // 星を生成してDOMに追加
    renderStars(starsData, getSVG, getColor) {
        const container = this.getStarsContainer();
        if (!container) {
            console.error('Stars container not found');
            return;
        }

        starsData.forEach((starData, index) => {
            const star = this.createStar(starData, getSVG, getColor, index);
            container.appendChild(star);
        });
    },

    // 個別の星要素を作成
    createStar(data, getSVG, getColor, index) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('star');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', getColor());
        
        // スタイル設定
        svg.style.width = `${data.width}px`;
        svg.style.height = `${data.height}px`;
        svg.style.left = `${data.left}px`;
        svg.style.top = `${data.top}px`;
        svg.style.setProperty('--rotation', `${data.rotation}deg`);
        
        // SVGパスを追加
        svg.innerHTML = getSVG();
        
        // マウスホバーでさらにキラキラ
        svg.addEventListener('mouseenter', () => this.enhanceStarEffect(svg));
        svg.addEventListener('mouseleave', () => this.resetStarEffect(svg));
        
        // ランダムなクリックエフェクト
        svg.addEventListener('click', () => this.createStarBurst(svg, data));
        
        return svg;
    },

    // 星のホバーエフェクトを強化
    enhanceStarEffect(star) {
        star.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    },

    // 星のエフェクトをリセット
    resetStarEffect(star) {
        star.style.transition = 'all 0.3s ease';
    },

    // 星をクリックした時のバースト効果
    createStarBurst(star, data) {
        const burst = document.createElement('div');
        burst.className = 'star-burst';
        burst.style.cssText = `
            position: absolute;
            left: ${data.left + data.width / 2}px;
            top: ${data.top + data.height / 2}px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: radial-gradient(circle, #FFD700, transparent);
            pointer-events: none;
            animation: burstExpand 0.8s ease-out forwards;
        `;
        
        // バーストアニメーションの追加
        if (!document.getElementById('burst-animation-style')) {
            const style = document.createElement('style');
            style.id = 'burst-animation-style';
            style.textContent = `
                @keyframes burstExpand {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(30);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.getStarsContainer().appendChild(burst);
        
        // パーティクルを追加
        for (let i = 0; i < 8; i++) {
            this.createParticle(data, i);
        }
        
        setTimeout(() => burst.remove(), 800);
    },

    // パーティクルエフェクトを作成
    createParticle(data, index) {
        const particle = document.createElement('div');
        const angle = (360 / 8) * index;
        const distance = 50;
        
        particle.className = 'star-particle';
        particle.style.cssText = `
            position: absolute;
            left: ${data.left + data.width / 2}px;
            top: ${data.top + data.height / 2}px;
            width: 3px;
            height: 3px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 5px #FFD700;
        `;
        
        this.getStarsContainer().appendChild(particle);
        
        // アニメーション
        const animation = particle.animate([
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
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    },

    // スクロール時の視差効果を追加
    initParallaxEffect() {
        const stars = document.querySelectorAll('.star');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            stars.forEach((star, index) => {
                const speed = 0.5 + (index % 3) * 0.2;
                const yPos = -(scrolled * speed);
                star.style.transform = `translateY(${yPos}px) rotate(${star.style.getPropertyValue('--rotation')})`;
            });
        });
    },

    // 背景のキラキラエフェクトを追加
    addBackgroundSparkles() {
        const container = document.querySelector('.container');
        if (!container) return;

        // キラキラパーティクルを定期的に生成
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.createBackgroundSparkle(container);
            }
        }, 500);
    },

    // 背景のキラキラパーティクルを作成
    createBackgroundSparkle(container) {
        const sparkle = document.createElement('div');
        const x = Math.random() * 393;
        const y = Math.random() * 1681;
        const size = 2 + Math.random() * 3;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 228, 181, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleFloat 3s ease-out forwards;
            z-index: 1;
        `;
        
        if (!document.getElementById('sparkle-animation-style')) {
            const style = document.createElement('style');
            style.id = 'sparkle-animation-style';
            style.textContent = `
                @keyframes sparkleFloat {
                    0% {
                        opacity: 0;
                        transform: translateY(0) scale(0);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(-20px) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-40px) scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 3000);
    },

    // 初期化
    init() {
        // 背景のキラキラエフェクトを追加
        this.addBackgroundSparkles();
        
        // 視差効果を初期化
        // this.initParallaxEffect(); // 必要に応じてコメント解除
    }
};

// グローバルスコープに公開
window.View = View;