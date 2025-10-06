/**
 * Model - データとビジネスロジック
 */

const Model = {
    // 星のデータ
    starsData: [
        // 左側の星
        { width: 21.15, height: 21.15, left: 64.66, top: 303.93, rotation: 34 },
        { width: 12.26, height: 12.26, left: 22.40, top: 263, rotation: 2 },
        { width: 21.15, height: 21.15, left: 41.81, top: 41, rotation: 34 },
        { width: 15.22, height: 15.22, left: 40, top: 188.32, rotation: -9 },
        { width: 18.53, height: 18.53, left: 38.66, top: 839.89, rotation: 23 },
        { width: 8.65, height: 8.65, left: 29.43, top: 1007.02, rotation: 39 },
        { width: 19.71, height: 19.71, left: 34.98, top: 1230.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 37.17, top: 1132.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 45.98, top: 1367.29, rotation: 34 },
        { width: 20.49, height: 20.49, left: 40.87, top: 488.75, rotation: 23 },
        { width: 21.79, height: 21.79, left: 39.05, top: 729.47, rotation: -12 },
        { width: 16.49, height: 16.49, left: 37.08, top: 643.46, rotation: 34 },
        { width: 16.49, height: 16.49, left: 27.21, top: 910, rotation: 34 },
        { width: 18.53, height: 18.53, left: 21.33, top: 1524.36, rotation: 23 },
        { width: 19.71, height: 19.71, left: 15.98, top: 1433.13, rotation: -12 },
        { width: 14.92, height: 14.92, left: 18.17, top: 1378, rotation: 34 },
        { width: 18.53, height: 18.53, left: 38.33, top: 1204.36, rotation: 23 },
        { width: 19.71, height: 19.71, left: 32.98, top: 1113.13, rotation: -12 },
        { width: 14.92, height: 14.92, left: 35.17, top: 1058, rotation: 34 },
        { width: 14.92, height: 14.92, left: 43.98, top: 1293.65, rotation: 34 },
        { width: 19.71, height: 19.71, left: 16.98, top: 1326.40, rotation: -12 },
        { width: 18.53, height: 18.53, left: 20.33, top: 1300, rotation: 23 },
        
        // 右側の星
        { width: 21.15, height: 21.15, left: 307.65, top: 45.91, rotation: -97 },
        { width: 12.26, height: 12.26, left: 336.95, top: 35.25, rotation: -129 },
        { width: 21.15, height: 21.15, left: 349.81, top: 195, rotation: 34 },
        { width: 12.26, height: 12.26, left: 355.69, top: 319, rotation: 39 },
        { width: 14.60, height: 14.60, left: 345.31, top: 156, rotation: 17 },
        { width: 18.53, height: 18.53, left: 352.33, top: 1403, rotation: 23 },
        { width: 8.65, height: 8.65, left: 336.43, top: 1128, rotation: 39 },
        { width: 19.71, height: 19.71, left: 346.98, top: 1311.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 349.17, top: 1256.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 357.98, top: 1492.29, rotation: 34 },
        { width: 18.53, height: 18.53, left: 350.66, top: 644.89, rotation: 23 },
        { width: 8.65, height: 8.65, left: 341.43, top: 782.02, rotation: 39 },
        { width: 19.71, height: 19.71, left: 346.98, top: 1005.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 349.17, top: 935.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 359.34, top: 831, rotation: 34 },
        { width: 14.92, height: 14.92, left: 357.98, top: 1172.29, rotation: 34 }
    ],

    // 星のSVGパス
    getStarSVG() {
        return `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`;
    },

    // ランダムな星の色を生成
    getRandomStarColor() {
        const colors = [
            '#FFE4B5',  // ミルク色
            '#FFD700',  // ゴールド
            '#FFF8DC',  // コーンシルク
            '#FAFAD2',  // ライトゴールデンロッド
            '#F0E68C',  // カーキ
            '#FFFACD',  // レモンシフォン
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    // アニメーション設定
    animationConfig: {
        headerDelay: 1200,
        titleDelay: 400,
        subtitleDelay: 800,
        headingDelay: 600,
        storyStartDelay: 800,
        storyInterval: 200,
        treasureStartDelay: 1600,
        treasureInterval: 150,
        failureStartDelay: 2400,
        failureInterval: 100,
        closingStartDelay: 2900,
        closingInterval: 100,
        footerDelay: 3200
    }
};

// グローバルスコープに公開
window.Model = Model;