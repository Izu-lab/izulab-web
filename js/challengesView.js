/**
 * Challenges View - 五つの無理難題の表示ロジック
 */

const ChallengesView = {
    getStarsContainer() {
        return document.getElementById('stars-container');
    },

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

    createStar(data, getSVG, getColor, index) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('star');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', getColor());
        
        svg.style.width = `${data.width}px`;
        svg.style.height = `${data.height}px`;
        svg.style.left = `${data.left}px`;
        svg.style.top = `${data.top}px`;
        svg.style.setProperty('--rotation', `${data.rotation}deg`);
        
        svg.innerHTML = getSVG();
        
        svg.addEventListener('mouseenter', () => this.enhanceStarEffect(svg));
        svg.addEventListener('mouseleave', () => this.resetStarEffect(svg));
        svg.addEventListener('click', () => this.createStarBurst(svg, data));
        
        return svg;
    },

    enhanceStarEffect(star) {
        star.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    },

    resetStarEffect(star) {
        star.style.transition = 'all 0.3s ease';
    },

    createStarBurst(star, data) {
        for (let i = 0; i < 8; i++) {
            this.createParticle(data, i);
        }
    },

    createParticle(data, index) {
        const particle = document.createElement('div');
        const angle = (360 / 8) * index;
        const distance = 40;
        
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
        
        const animation = particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            {
                transform: `translate(
                    ${Math.cos(angle * Math.PI / 180) * distance}px,
                    ${Math.sin(angle * Math.PI / 180) * distance}px
                ) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    },

    // チャレンジカードのホバーエフェクトを強化
    enhanceChallengeCards() {
        const challenges = document.querySelectorAll('.challenge');
        
        challenges.forEach(challenge => {
            const image = challenge.querySelector('.challenge-image');
            
            challenge.addEventListener('mouseenter', () => {
                this.addChallengeGlow(challenge);
            });
            
            challenge.addEventListener('mouseleave', () => {
                this.removeChallengeGlow(challenge);
            });
        });
    },

    addChallengeGlow(challenge) {
        const glow = document.createElement('div');
        glow.className = 'challenge-glow';
        glow.style.cssText = `
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.2), transparent 70%);
            border-radius: 12px;
            pointer-events: none;
            animation: glowPulse 2s ease-in-out infinite;
            z-index: -1;
        `;
        challenge.appendChild(glow);
    },

    removeChallengeGlow(challenge) {
        const glow = challenge.querySelector('.challenge-glow');
        if (glow) {
            glow.style.opacity = '0';
            setTimeout(() => glow.remove(), 300);
        }
    },

    // チャレンジ詳細モーダルを表示
    showChallengeModal(challengeData) {
        const modal = document.createElement('div');
        modal.className = 'challenge-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(135deg, #3F465E, #2a2f42);
            color: #E3E4E9;
            padding: 32px;
            border-radius: 16px;
            max-width: 320px;
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
            z-index: 2000;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        modal.innerHTML = `
            <div style="position: relative;">
                <div style="
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, ${challengeData.color}, ${this.adjustColor(challengeData.color, -30)});
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: 700;
                    font-size: 24px;
                    margin: 0 auto 16px;
                    box-shadow: 0 4px 15px ${challengeData.color}40;
                ">${challengeData.id}</div>
                
                <h2 style="
                    text-align: center;
                    font-size: 22px;
                    margin-bottom: 12px;
                    color: ${challengeData.color};
                ">${challengeData.title}</h2>
                
                <div style="
                    background: rgba(255, 255, 255, 0.05);
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 16px;
                ">
                    <p style="
                        font-size: 13px;
                        color: #B8B8B8;
                        margin-bottom: 8px;
                        text-align: center;
                    ">テーマ: ${challengeData.theme}</p>
                </div>
                
                <p style="
                    line-height: 1.8;
                    font-size: 14px;
                    margin-bottom: 20px;
                ">${challengeData.fullDescription}</p>
                
                <button class="modal-close-btn" style="
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, ${challengeData.color}, ${this.adjustColor(challengeData.color, -30)});
                    border: none;
                    border-radius: 8px;
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px ${challengeData.color}40;
                ">体験する</button>
            </div>
        `;
        
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 1999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.style.transform = 'translate(-50%, -50%) scale(0.8)';
            overlay.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                overlay.remove();
            }, 300);
        };
        
        modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        const btn = modal.querySelector('.modal-close-btn');
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.05)';
            btn.style.boxShadow = `0 6px 20px ${challengeData.color}60`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            btn.style.boxShadow = `0 4px 12px ${challengeData.color}40`;
        });
    },

    // 色を調整するヘルパー関数
    adjustColor(color, amount) {
        const num = parseInt(color.replace('#', ''), 16);
        const r = Math.max(0, Math.min(255, (num >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
        return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
    }
};

window.ChallengesView = ChallengesView;