/**
 * Flow View - 体験の流れページの表示ロジック
 */

const FlowView = {
    // 星のコンテナを取得
    getStarsContainer() {
        return document.getElementById('stars-container');
    },

    // 星を描画
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
            duration: 500,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => particle.remove();
    },

//     // フローステップにツールチップを追加
//     addStepTooltips(steps) {
//         const flowSteps = document.querySelectorAll('.flow-step');
        
//         flowSteps.forEach((stepEl, index) => {
//             if (steps[index]) {
//                 stepEl.setAttribute('title', steps[index].description);
                
//                 // カスタムツールチップを作成
//                 stepEl.addEventListener('mouseenter', (e) => {
//                     this.showTooltip(e.currentTarget, steps[index].description);
//                 });
                
//                 stepEl.addEventListener('mouseleave', () => {
//                     this.hideTooltip();
//                 });
//             }
//         });
//     },

//     showTooltip(element, text) {

//          document.querySelectorAll('.custom-tooltip').forEach(oldTooltip => {
//         oldTooltip.remove();
//     });
    
//         const tooltip = document.createElement('div');
//         tooltip.className = 'custom-tooltip';
//         tooltip.textContent = text;
//         tooltip.style.cssText = `
//             position: fixed;
//             background: rgba(63, 70, 94, 0.95);
//             color: #E3E4E9;
//             padding: 8px 12px;
//             border-radius: 6px;
//             font-size: 12px;
//             max-width: 200px;
//             z-index: 1000;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
//             pointer-events: none;
//             opacity: 0;
//             transform: translateY(10px);
//             transition: all 0.3s ease;
//         `;
        
//         document.body.appendChild(tooltip);
        
//         const rect = element.getBoundingClientRect();
//         tooltip.style.left = `${rect.right + 10}px`;
//         tooltip.style.top = `${rect.top + rect.height / 2 - tooltip.offsetHeight / 2}px`;
        
//         setTimeout(() => {
//             tooltip.style.opacity = '1';
//             tooltip.style.transform = 'translateY(0)';
//         }, 10);
//     },

//     hideTooltip() {
//         const tooltip = document.querySelector('.custom-tooltip');
//         if (tooltip) {
//             tooltip.style.opacity = '0';
//             setTimeout(() => tooltip.remove(), 300);
//         }
//     }
// };
}
window.FlowView = FlowView;