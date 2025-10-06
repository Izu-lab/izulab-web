/**
 * Challenges Controller - 五つの無理難題のコントローラー
 */

const ChallengesController = {
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    },

    setup() {
        // 星を描画
        this.renderStars();
        
        // チャレンジカードのインタラクション設定
        this.setupChallenges();
        
        // カードのホバーエフェクトを強化
        ChallengesView.enhanceChallengeCards();
        
        // ナビゲーションボタンの設定
        this.setupNavigation();
        
        // スクロールアニメーション
        this.setupScrollEffects();
    },

    renderStars() {
        ChallengesView.renderStars(
            ChallengesModel.starsData,
            ChallengesModel.getStarSVG.bind(ChallengesModel),
            ChallengesModel.getRandomStarColor.bind(ChallengesModel)
        );
    },

    setupChallenges() {
        const challenges = document.querySelectorAll('.challenge');
        
        challenges.forEach((challenge, index) => {
            const challengeId = parseInt(challenge.getAttribute('data-challenge'));
            const challengeData = ChallengesModel.getChallengeById(challengeId);
            
            // クリックで詳細モーダル表示
            challenge.addEventListener('click', () => {
                this.showChallengeDetails(challengeData);
            });
            
            // ダブルクリックで特別なエフェクト
            challenge.addEventListener('dblclick', (e) => {
                e.preventDefault();
                this.createMagicalEffect(challenge, challengeData);
            });
            
            // ホバーで説明をハイライト
            challenge.addEventListener('mouseenter', () => {
                this.highlightDescription(challenge);
            });
            
            challenge.addEventListener('mouseleave', () => {
                this.unhighlightDescription(challenge);
            });
        });
    },

    showChallengeDetails(challengeData) {
        if (!challengeData) return;
        
        // キラキラエフェクトを追加
        this.createSparkleEffect();
        
        // モーダルを表示
        ChallengesView.showChallengeModal(challengeData);
    },

    createMagicalEffect(element, challengeData) {
        const rect = element.getBoundingClientRect();
        
        // マジックサークルを作成
        for (let i = 0; i < 16; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const angle = (360 / 16) * i;
                const distance = 80 + Math.random() * 40;
                
                particle.textContent = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
                particle.style.cssText = `
                    position: fixed;
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                    font-size: ${14 + Math.random() * 8}px;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                document.body.appendChild(particle);
                
                particle.animate([
                    {
                        transform: 'translate(0, 0) scale(0) rotate(0deg)',
                        opacity: 0
                    },
                    {
                        transform: `translate(
                            ${Math.cos(angle * Math.PI / 180) * distance * 0.5}px,
                            ${Math.sin(angle * Math.PI / 180) * distance * 0.5}px
                        ) scale(1.5) rotate(180deg)`,
                        opacity: 1
                    },
                    {
                        transform: `translate(
                            ${Math.cos(angle * Math.PI / 180) * distance}px,
                            ${Math.sin(angle * Math.PI / 180) * distance}px
                        ) scale(0) rotate(360deg)`,
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }).onfinish = () => particle.remove();
            }, i * 50);
        }
        
        // 中央に光のバースト
        const burst = document.createElement('div');
        burst.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, ${challengeData.color}, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
        `;
        
        document.body.appendChild(burst);
        
        burst.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(50)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => burst.remove();
    },

    highlightDescription(challenge) {
        const descLines = challenge.querySelectorAll('.desc-line');
        descLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.transform = 'translateX(-5px)';
                line.style.textShadow = '0 0 10px rgba(255, 228, 181, 0.5)';
            }, index * 50);
        });
    },

    unhighlightDescription(challenge) {
        const descLines = challenge.querySelectorAll('.desc-line');
        descLines.forEach(line => {
            line.style.transform = '';
            line.style.textShadow = '';
        });
    },

    createSparkleEffect() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    font-size: ${12 + Math.random() * 12}px;
                    pointer-events: none;
                    z-index: 1500;
                `;
                
                document.body.appendChild(sparkle);
                
                sparkle.animate([
                    {
                        transform: 'translateY(0) scale(0) rotate(0deg)',
                        opacity: 0
                    },
                    {
                        transform: 'translateY(-20px) scale(1.5) rotate(180deg)',
                        opacity: 1
                    },
                    {
                        transform: 'translateY(-40px) scale(0) rotate(360deg)',
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'ease-out'
                }).onfinish = () => sparkle.remove();
            }, i * 100);
        }
    },

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-button');
        
        navButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addButtonAnimation(button);
            });
        });
    },

    addButtonAnimation(button) {
        button.animate([
            { transform: 'translateX(0) scale(1)' },
            { transform: 'translateX(-3px) scale(1.05)' },
            { transform: 'translateX(0) scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-in-out'
        });
    },

    setupScrollEffects() {
        let lastScrollTop = 0;
        const challenges = document.querySelectorAll('.challenge');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            challenges.forEach((challenge, index) => {
                const rect = challenge.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const scrollProgress = 1 - (rect.top / window.innerHeight);
                    const parallaxOffset = scrollProgress * 20;
                    
                    // 視差効果（微妙に）
                    challenge.style.transform = `translateY(${parallaxOffset}px)`;
                }
            });
            
            lastScrollTop = scrollTop;
        });
    }
};

ChallengesController.init();
window.ChallengesController = ChallengesController;