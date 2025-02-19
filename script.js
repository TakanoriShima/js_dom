// 一般ユーザークラスの定義
class User {
    // 名前
    name;
    // 年齢
    age;
    // 性別
    gender;
    // 素点
    score;
    // 偏差値
    deviation;

    // コンストラクタ。偏差値（deviation）以外の値を初期化
    constructor(name, age, gender, score){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.score = score;
    }
}

// 一般ユーザークラスを継承したスーパーユーザークラスの定義
class SuperUser extends User {
    item // 特別アイテム
    // コンストラクタ
    constructor(name, age, gender, score, item){
        // 親のクラス（User）のコンストラクタを使って初期化
        super(name, age, gender, score);
        // item値のみ、ここで初期化
        this.item = item;
    }
}

// ユーザー一覧を操作するクラスの定義
class UserManager{
    // 保持するユーザーインスタンスの配列
    users = [];

    // ユーザーをユーザー配列に追加する
    addUsers(user){
        this.users.push(user);
    }

    // 現状のユーザー一覧を取得する
    getUsers(){
        return this.users;
    }

    // 現状のユーザー一覧(users)から、所定のユーザー(user)を削除する
    removeUser(user){
        // 配列内のインデックスを取得
        const index = this.users.indexOf(user);
        if (index !== -1) {
            this.users.splice(index, 1); // 指定のインデックスを削除
        }
    }

    // 与えられたユーザー一覧(users)から平均値を計算して returnする
    calculateMeanScore(users){
        // scoreの合計値の計算
        let sum = 0;
        users.forEach(user => {
            sum += user.score;
        });

        // scoreの平均値をreturn
        return Math.floor(sum / users.length);
    }

    // 与えたれたユーザー一覧(users)の平均年齢を計算して returnする
    calculateMeanAge(users){
        // 年齢の合計値を計算
        let sum = 0;
        users.forEach(user => {
            sum += user.age;
        });

        // ageの平均値を計算して return
        return Math.floor(sum / users.length);
    }

    // 与えられたユーザー一覧(users)の標準偏差を計算して returnする
    calculateStddev(users){
        // このクラスに定義した calculateMeanScore関数を使って、与えられたユーザー一覧の平均値を取得
        let mean = this.calculateMeanScore(users);
        // 以下、平均値とユーザー一覧の素点(score)を使って、標準偏差を計算
        let stddev = 0;
        users.forEach(user => {
            stddev += Math.pow(user.score - mean, 2);
        })
        stddev /= users.length;
        stddev = Math.sqrt(stddev);

        // 標準偏差を計算して、小数点以下2桁までの値を return
        return stddev.toFixed(2);
    }

    // 与えられたユーザー一覧(users)の一人ずつの偏差値を計算して、与えられたユーザー一覧の偏差値(deviation)にセット
    setDeviation(users){
        // このクラスに定義した calculateMeanScore関数を使って、与えられたユーザー一覧(users)の平均値を計算し取得
        let mean = this.calculateMeanScore(users);
        // このクラスに定義した calculateStddev関数を使って、与えられたユーザー一覧(users)の標準偏差を計算し取得
        let stddev = this.calculateStddev(users);
        // 与えられたユーザー一覧(users)から一人ずつ取り出し、各インスタンス(user)の偏差値を計算してdeviation値をセット
        users.forEach(user => {
            // 注目するユーザー(user)の偏差値を計算してインスタンスにセット
            let deviation = ((user.score - mean) * 10) / stddev + 50;
            deviation = deviation.toFixed(2);
            user.deviation = deviation;
        });
    }

    // 与えられたユーザー一覧(users)の平均年齢を計算して return
    getAgeMean(users){
        // 同じクラス内の calculateMeanAge関数を使って、平均年齢を取得
        let meanAge = this.calculateMeanAge(users);
        // 平均年齢を return
        return meanAge;
    }

    // テーブルに見出し情報を表示する
    dislayTableHeader(){
        // <table id="dispUsers">タグをJavaScriptのオブジェクトとして取得
        const dispUsers = document.getElementById('dispUsers');     
        
        // <tr></tr>を表現するオブジェクトを新規生成
        let tr = document.createElement('tr');

        // <th></th>を表現するオブジェクトを新規生成
        let th = document.createElement('th');
        // <th>クラス名</th>を表現するように変更
        th.textContent = 'クラス名';
        // 以下を表現
        // <tr>
        //     <th>クラス名</th>
        // </tr>
        tr.appendChild(th);

        // <th></th>を表現するオブジェクトを新規生成
        th = document.createElement('th');
        // <th>名前</th>を表現するように変更
        th.textContent = '名前';
        // 以下を表現
        // <tr>
        //     <th>クラス名</th>
        //     <th>名前</th>
        // </tr>
        tr.appendChild(th);

        
        // <th></th>を表現するオブジェクトを新規生成
        th = document.createElement('th');
        // <th>年齢</th>を表現するように変更
        th.textContent = '年齢';
        // 以下を表現
        // <tr>
        //     <th>クラス名</th>
        //     <th>名前</th>
        //     <th>年齢</th>
        // </tr>
        tr.appendChild(th);
        
        // <th></th>を表現するオブジェクトを新規生成
        th = document.createElement('th');
        // <th>性別</th>を表現するように変更
        th.textContent = '性別';
        // 以下を表現
        // <tr>
        //     <th>クラス名</th>
        //     <th>名前</th>
        //     <th>年齢</th>
        //     <th>性別</th>       
        // </tr>        
        tr.appendChild(th);
        
        // <th></th>を表現するオブジェクトを新規生成
        th = document.createElement('th');
        // <th>得点</th>を表現するように変更        
        th.textContent = '得点';
        // 以下を表現
        // <tr>
        //     <th>クラス名</th>
        //     <th>名前</th>
        //     <th>年齢</th>
        //     <th>性別</th>    
        //     <th>得点</th>            
        // </tr> 
        tr.appendChild(th);

        // <th></th>を表現するオブジェクトを新規生成
        th = document.createElement('th');
        // <th>偏差値</th>を表現するように変更         
        th.textContent = '偏差値';
        // 以下を表現
        // <tr>
        //     <th>クラス名</th>
        //     <th>名前</th>
        //     <th>年齢</th>
        //     <th>性別</th>    
        //     <th>得点</th>
        //     <th>偏差値</th>                   
        // </tr>        
        tr.appendChild(th);
        
        // <th></th>を表現するオブジェクトを新規生成        
        th = document.createElement('th');
        // <th>特別アイデム</th>を表現するように変更         
        th.textContent = '特別アイテム';
        // 以下を表現
        // <tr>
        //     <th>クラス名</th>
        //     <th>名前</th>
        //     <th>年齢</th>
        //     <th>性別</th>    
        //     <th>得点</th>
        //     <th>偏差値</th> 
        //     <th>特別アイテム</th>                           
        // </tr>          
        tr.appendChild(th);

        // 以下を表現
		// <table id="dispUsers">
        //     <tr>
        //         <th>クラス名</th>
        //         <th>名前</th>
        //         <th>年齢</th>
        //         <th>性別</th>    
        //         <th>得点</th>
        //         <th>偏差値</th> 
        //         <th>特別アイテム</th>                           
        //     </tr>
        // </table>
        dispUsers.appendChild(tr);
    }

    // 与えられたユーザー一覧(users)を画面に表示
    diaplayUsers(users){
        // 与えられたユーザー一覧(users)から各ユーザーの偏差値を計算してdviationにセット
        this.setDeviation(users);

        // <table id="dispUsers">タグをJavaScriptのオブジェクトとして取得
        const dispUsers = document.getElementById('dispUsers');
        
        // <table id="dispUsers">タグに挟まれた子要素を一旦すべて削除
        dispUsers.innerHTML = '';
        
        // テーブルに見出し情報を表示
        this.dislayTableHeader();

        // <span id="meanAge">タグをJavaScriptのオブジェクトとして取得
        const meanAge = document.getElementById('meanAge');
        // このspanタグに挟まれた文字列を 与えられたユーザー一覧(users)の平均値の値にセット
        // <span id="meanAge">〇歳</span>
        meanAge.textContent = this.getAgeMean(users) + '歳';

        // <span id="count">タグをJavaScriptのオブジェクトとして取得
        const count = document.getElementById('count');
        // このspanタグに挟まれた文字列を 与えられたユーザー一覧(users)の人数の値にセット
        // <span id="count">〇人</span>       
        count.textContent = users.length + '人';
        // <span id="count" style="color: green;">〇人</span>
        count.style.color = 'green';
        
        // <span id="mean">タグをJavaScriptのオブジェクトとして取得
        const mean = document.getElementById('mean');
        // このspanタグに挟まれた文字列を 与えられたユーザー一覧(users)のscoreに平均値の値にセット
        // <span id="mean">〇</span>            
        mean.textContent = this.calculateMeanScore(users);
        // <span id="mean" style="color: red;">〇</span>        
        mean.style.color = 'red';

        // <span id="stddev">タグをJavaScriptのオブジェクトとして取得
        const stddev = document.getElementById('stddev');
        // このspanタグに挟まれた文字列を 与えられたユーザー一覧(users)のscoreに標準偏差の値にセット
        // <span id="stddev">〇</span>             
        stddev.textContent = this.calculateStddev(users);
        // <span id="stdddev" style="color: blue;">〇</span>        
        stddev.style.color = 'blue';

        // 与えられたユーザー一覧(users)によって、<table>タグにユーザー情報を表示
        users.forEach(user => {

            // 以降のコメントは dislayTableHeader 関数のコメントを参考に記述してみよう！
            let tr = document.createElement('tr');

            let td = document.createElement('td');
            td.textContent = user.constructor.name;
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.name;
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.age + '歳';
            tr.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = user.gender === 'male' ? '男性' : '女性';
            if(user.gender === 'male'){
                td.style.color = 'blue';
            }else{
                td.style.color = 'red';
            }
            tr.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = user.score + '点';
            tr.appendChild(td);

            td = document.createElement('td');
            console.log(user.deviation);
            td.textContent = user.deviation;
            tr.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = user.item;
            tr.appendChild(td);
            
            dispUsers.appendChild(tr);
        });
    }

    // 与えられた性別(gender)値によって、ユーザー一覧をフィルタリングして表示
    getfilteredUsersByGender(gender){
        // 一旦、フィルタリングされたユーザー一覧の変数に、現状のすべてのユーザー一覧(thi.users)をセット
        let filteredUsers = this.users;

        // 性別が選択された場合は、その性別を持つユーザー一覧で上書き
        if(gender !== ''){
            filteredUsers = this.users.filter(user => user.gender === gender);
        }

        // フィルタリングされたユーザー一覧(filteredUsers)だけで偏差値を再計算して、値を各インスタンスの deviationにセット
        this.setDeviation(filteredUsers);

        // フィルタリングされたユーザー一覧(filteredUsers)を画面に表示
        this.diaplayUsers(filteredUsers);
    }
}
// ↑ ----- ここまでは、単なるクラス、関数の定義（約束ごとの定義）------

// ↓ ----- 以降はストーリーの記述 ------

// UserManagerクラスのインスタンスを生成
const userManager = new UserManager();

// 初期のユーザー一覧を userManegerクラスのインスタンスのusers配列に追加し、画面に表示する（初期化）関数の定義
function init(){
    // 5つのインスタンスを生成
    let shima = new User('島', 45, 'male', 30);
    let yamada = new User('山田', 25, 'female', 95);
    let goto = new SuperUser('後藤', 15, 'female', 10, '海に100秒潜る');
    let aoki = new SuperUser('青木', 30, 'male', 75, '音速で走る');
    let watanabe = new User('渡邉', 55, 'male', 50);
    
    // userManagerインスタンスに5つのインスタンスを追加
    userManager.addUsers(shima);
    userManager.addUsers(goto);
    userManager.addUsers(yamada);
    userManager.addUsers(aoki);
    userManager.addUsers(watanabe);
    
    // 画面に表示
    userManager.diaplayUsers(userManager.getUsers());
}
// 初期化実行
init();

// <select id="gender">  タグを JavaScripに取り込み、オブジェクトとする
const gender = document.getElementById('gender');

// 性別を選択した際のイベント処理の定義
gender.addEventListener('change', function(e){
    // 選択された性別の value値を取得
    const selectedGenderOption = e.target.options[e.target.selectedIndex];
    const selectedGenderValue = selectedGenderOption.value;
    // useManagerの getfilteredUsersByGender関数を使って、選択された性別の情報のみを画面に表示
    userManager.getfilteredUsersByGender(selectedGenderValue);
});


