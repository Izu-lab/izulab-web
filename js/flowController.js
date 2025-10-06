/**
 * Flow Controller - 体験の流れページのコントローラー
 */

const FlowController = {
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
        
        // フローステップのインタラクション設定
        this.setupFlowSteps();
        
        // ツールチップを追加
        FlowView.addStepTooltips(FlowModel.steps);
        
        // ナビゲーションボタンの設定
        this.setupNavigation();
    },

    renderStars() {
        FlowView.renderStars(
            FlowModel.starsData,
            FlowModel.getStarSVG.bind(FlowModel),
            FlowModel.getRandomStarColor.bind(FlowModel)
        );
    },

    setupFlowSteps() {
        const steps = document.querySelectorAll('.flow-step');
        
        steps.forEach((step, index) => {
            // クリックでエフェクト
            step.addEventListener('click', () => {
                this.highlightStep(step, index);
            });
            
            // ダブルクリックで詳細表示
            // step.addEventListener('dblclick', () => {
            //     this.showStepDetails(step, index);
            // });
        });
    },

    highlightStep(step, index) {
        // 全てのステップからハイライトを削除
        document.querySelectorAll('.flow-step').forEach(s => {
            s.style.transform = '';
        });
        
        // クリックされたステップをハイライト
        step.style.transform = 'translateY(-12px) scale(1.05)';
        
        // キラキラエフェクト
        this.createStepSparkles(step);
        
        setTimeout(() => {
            step.style.transform = '';
        }, 1000);
    },

    createStepSparkles(step) {
        const rect = step.getBoundingClientRect();
        
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.textContent = '✨';
                sparkle.style.cssText = `
                    position: fixed;
                    left: ${rect.left + Math.random() * rect.width}px;
                    top: ${rect.top + Math.random() * rect.height}px;
                    font-size: ${10 + Math.random() * 6}px;
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
                        transform: 'translateY(-40px) scale(1.5) rotate(180deg)',
                        opacity: 0
                    }
                ], {
                    duration: 1200,
                    easing: 'ease-out'
                }).onfinish = () => sparkle.remove();
            }, i * 100);
        }
    },

    showStepDetails(step, index) {
        const stepData = FlowModel.steps[index];
        if (!stepData) return;
        
        // 詳細モーダル風の表示
        const modal = document.createElement('div');
        modal.className = 'step-modal';
        modal.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: linear-gradient(135deg, #3F465E, #2a2f42);
            color: #E3E4E9;
            padding: 24px;
            border-radius: 12px;
            max-width: 300px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            z-index: 2000;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        modal.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                <div style="
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #FFD700, #FFA500);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #1C1E28;
                    font-weight: 700;
                    font-size: 18px;
                ">${stepData.number}</div>
                <h3 style="margin: 0; font-size: 18px;">${stepData.title}</h3>
            </div>
            <p style="margin: 0; line-height: 1.6; font-size: 14px;">${stepData.description}</p>
            <button style="
                margin-top: 16px;
                width: 100%;
                padding: 10px;
                background: linear-gradient(135deg, #FFD700, #FFA500);
                border: none;
                border-radius: 6px;
                color: #1C1E28;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">閉じる</button>
        `;
        
        // 背景オーバーレイ
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(modal);
        
        // アニメーション表示
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
            modal.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        
        // 閉じる機能
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.style.transform = 'translate(-50%, -50%) scale(0.8)';
            overlay.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                overlay.remove();
            }, 300);
        };
        
        modal.querySelector('button').addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    },

    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-button');
        
        navButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addButtonRipple(button);
            });
        });
    },

    addButtonRipple(button) {
        button.animate([
            { transform: 'translateX(0) scale(1)' },
            { transform: 'translateX(-2px) scale(1.05)' },
            { transform: 'translateX(0) scale(1)' }
        ], {
            duration: 300,
            easing: 'ease-in-out'
        });
    }
};

FlowController.init();
window.FlowController = FlowController;