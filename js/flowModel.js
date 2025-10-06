/**
 * Flow Model - 体験の流れページのデータ
 */

const FlowModel = {
    // 星のデータ（左側と右側）
    starsData: [
        // 左側の星
        { width: 18.53, height: 18.53, left: 31.66, top: 287.89, rotation: 23 },
        { width: 8.65, height: 8.65, left: 22.43, top: 425.02, rotation: 39 },
        { width: 19.71, height: 19.71, left: 27.98, top: 648.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 30.17, top: 578.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 40.34, top: 474, rotation: 34 },
        { width: 14.92, height: 14.92, left: 38.98, top: 815.29, rotation: 34 },
        { width: 8.65, height: 8.65, left: 17.43, top: 771, rotation: 39 },
        { width: 19.71, height: 19.71, left: 27.98, top: 954.76, rotation: -12 },
        
        // 右側の星
        { width: 13.03, height: 13.03, left: 337.23, top: 344.92, rotation: 114 },
        { width: 18.53, height: 18.53, left: 360.66, top: 373.89, rotation: 23 },
        { width: 8.65, height: 8.65, left: 351.43, top: 511.02, rotation: 39 },
        { width: 19.71, height: 19.71, left: 356.98, top: 734.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 359.17, top: 664.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 369.34, top: 560, rotation: 34 },
        { width: 14.92, height: 14.92, left: 367.98, top: 901.29, rotation: 34 },
        { width: 8.65, height: 8.65, left: 346.43, top: 857, rotation: 39 },
        { width: 19.71, height: 19.71, left: 356.98, top: 1040.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 359.17, top: 985.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 30.17, top: 899.64, rotation: 34 },
        { width: 8.65, height: 8.65, left: 28.43, top: 1033.02, rotation: 39 }
    ],

    // フローステップのデータ
    steps: [
        {
            number: 1,
            title: '月灯を受け取る',
            description: '会場で美しい月灯（提灯）を受け取り、月光のような灯りを手にします。'
        },
        {
            number: 2,
            title: '五つの無理難題に挑む',
            description: 'かぐや姫の物語に基づいた五つの体験に挑戦します。'
        },
        {
            number: 3,
            title: '月へ思いを届ける',
            description: '体験を通じて感じた思いを月へ届けます。'
        },
        {
            number: 4,
            title: '月灯を返却する',
            description: '体験を終えた後、月灯をスタッフに返却します。'
        }
    ],

    // 星のSVGパス
    getStarSVG() {
        return `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`;
    },

    // ランダムな星の色を生成
    getRandomStarColor() {
        const colors = [
            '#FFE4B5',
            '#FFD700',
            '#FFF8DC',
            '#FAFAD2',
            '#F0E68C',
            '#FFFACD',
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

// グローバルスコープに公開
window.FlowModel = FlowModel;