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

    constructor(name, age, gender, score){
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.score = score;
    }
}

class SuperUser extends User {
    item
    constructor(name, age, gender, score, item){
        super(name, age, gender, score);
        this.item = item;
    }
}

class UserManager{
    users = [];

    addUsers(user){
        this.users.push(user);
    }

    getUsers(){
        return this.users;
    }

    removeUser(user){
        // 配列内のインデックスを取得
        const index = this.users.indexOf(user);
        if (index !== -1) {
            this.users.splice(index, 1); // 指定のインデックスを削除
        }
    }

    calculateMeanScore(users){
        let sum = 0;
        users.forEach(user => {
            sum += user.score;
        });

        return Math.floor(sum / this.users.length);
    }

    calculateStddev(users){
        let mean = this.calculateMeanScore(users);
        let stddev = 0;

        users.forEach(user => {
            stddev += Math.pow(user.score - mean, 2);
        })
        stddev /= users.length;
        stddev = Math.sqrt(stddev);
        return stddev.toFixed(2);
    }

    setDeviation(users){
        let mean = this.calculateMeanScore(users);
        let stddev = this.calculateStddev(users);
        users.forEach(user => {
            let deviation = ((user.score - mean) * 10) / stddev + 50;
            deviation = deviation.toFixed(2);
            user.deviation = deviation;
        })
    }

    diaplayUsers(users){
        const dispUsers = document.getElementById('dispUsers');
        
        const mean = document.getElementById('mean');
        mean.textContent = this.calculateMeanScore(users);
        mean.style.color = 'red';

        const stddev = document.getElementById('stddev');
        stddev.textContent = this.calculateStddev(users);
        stddev.style.color = 'blue';

        this.setDeviation(users);

        users.forEach(user => {

            
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
            tr.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = user.score + '点';
            tr.appendChild(td);

            td = document.createElement('td');
            td.textContent = user.deviation;
            tr.appendChild(td);
            
            td = document.createElement('td');
            td.textContent = user.item;
            tr.appendChild(td);
            
            dispUsers.appendChild(tr);
        });
    }
}

const dispUsers = document.getElementById('dispUsers');

const userManager = new UserManager();

let shima = new User('島', 45, 'male', 80);
let yamada = new User('山田', 25, 'female', 50);
let goto = new SuperUser('後藤', 15, 'female', 10, '海に100秒潜る');
let aoki = new SuperUser('青木', 30, 'male', 90, '音速で走る');

userManager.addUsers(shima);
userManager.addUsers(goto);
userManager.addUsers(yamada);
userManager.addUsers(aoki);

userManager.diaplayUsers(userManager.getUsers());


