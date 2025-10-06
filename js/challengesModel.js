/**
 * Challenges Model - 五つの無理難題のデータ
 */

const ChallengesModel = {
    // 星のデータ
    starsData: [
        { width: 18.53, height: 18.53, left: 354.66, top: 376.89, rotation: 23 },
        { width: 19.71, height: 19.71, left: 350.98, top: 737.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 353.17, top: 667.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 363.34, top: 563, rotation: 34 },
        { width: 18.53, height: 18.53, left: 356.33, top: 1135, rotation: 23 },
        { width: 8.65, height: 8.65, left: 345.43, top: 514.02, rotation: 39 },
        { width: 19.71, height: 19.71, left: 350.98, top: 1043.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 353.17, top: 988.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 361.98, top: 904.29, rotation: 34 },
        { width: 14.92, height: 14.92, left: 361.98, top: 1224.29, rotation: 34 },
        { width: 18.53, height: 18.53, left: 350.66, top: 1301.89, rotation: 23 },
        { width: 19.71, height: 19.71, left: 346.98, top: 1662.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 349.17, top: 1592.64, rotation: 34 },
        { width: 8.65, height: 8.65, left: 341.43, top: 1439.02, rotation: 39 },
        { width: 19.71, height: 19.71, left: 346.98, top: 1968.76, rotation: -12 },
        { width: 14.92, height: 14.92, left: 349.17, top: 1913.64, rotation: 34 },
        { width: 14.92, height: 14.92, left: 357.98, top: 1829.29, rotation: 34 },
        { width: 14.92, height: 14.92, left: 359.34, top: 1488, rotation: 34 },
        { width: 14.92, height: 14.92, left: 361.98, top: 1224.29, rotation: 34 },
        { width: 14.92, height: 14.92, left: 353.17, top: 988.64, rotation: 34 }
    ],

    // 五つの無理難題のデータ
    challenges: [
        {
            id: 1,
            title: '仏の御石の鉢',
            shortDescription: '月灯を近づけて不思議な力を受けとる',
            fullDescription: '仏の御石の鉢は、釈迦が使っていたとされる伝説の鉢です。月灯を近づけることで、星屑のように煌めく不思議な力が宿ります。',
            theme: '光と神秘',
            color: '#FFD700'
        },
        {
            id: 2,
            title: '蓬莱の玉の枝',
            shortDescription: '悪戯好きの月兎によって分かれた枝を戻す',
            fullDescription: '蓬莱山に生える宝石の枝。悪戯好きの月兎によってバラバラにされた枝を、あなたの手で正しい姿に戻してください。',
            theme: '知恵と調和',
            color: '#98FB98'
        },
        {
            id: 3,
            title: '火鼠の皮衣',
            shortDescription: '盗人に盗まれた皮衣を月灯で探す',
            fullDescription: '火に燃えない不思議な火鼠の皮衣。何者かに盗まれてしまったこの宝物を、月灯の光を頼りに探し出しましょう。',
            theme: '探索と発見',
            color: '#FF6347'
        },
        {
            id: 4,
            title: '龍の首の玉',
            shortDescription: '龍を恐れぬ勇気があれば玉と共に力を授かる',
            fullDescription: '龍の首に輝く伝説の玉。本来の持ち主である龍が会場に現れました。勇気が認められれば、龍の怒りを鎮め、玉の力を授かることができます。',
            theme: '勇気と対峙',
            color: '#4169E1'
        },
        {
            id: 5,
            title: '燕の子安貝',
            shortDescription: '砂に埋もれた安産と幸福の象徴を見つける',
            fullDescription: '古来より安産と幸福の象徴とされる燕の子安貝。ヤドカリに貸していた貝が砂に埋もれてしまいました。砂をかき分けて見つけ出しましょう。',
            theme: '幸福と探求',
            color: '#FFB6C1'
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
    },

    // 特定のチャレンジを取得
    getChallengeById(id) {
        return this.challenges.find(c => c.id === id);
    }
};

window.ChallengesModel = ChallengesModel;