/**
 * 根据 arr 得到一个 newArr
 *  - 设置指针 i，默认为 0
 *  - 获取 i 的值
 *      - 如果 i 的值为空，i++ 进入下一轮
 * 
 *      - 如果 i 的值不为空
 *          - 设置 j = i + 1
 *          - 获取 j 值，比较 i == j，
 *              - 如果 i != j 的值，把 i 的值添加到 newArr 中，i++ 进入下一轮
 *              - 如果 i == j 的值，把 i+j 的值相加，添加到 newArr，i = j + 1;
 * 
 * 
*/

/**
 * [2, 0, 2, 0]  =>  [4, 0, 0, 0]
 * [2, 2, 0, 2]  =>  [4, 2, 0, 0]
 * [4, 2, 0, 2]  =>  [4, 4, 0, 0]
 * 
 * let arr = [2,0,2,0];
 * 
 */

// 获取所有格子
let imgs = document.querySelectorAll("img");
let reset = document.querySelector(".reset");
let resetAlart = document.querySelector(".alert");
let mask = document.querySelector("#mask");
let scroeNum = document.querySelector('.scroeNum');
let jump = document.querySelector('#jump');
let jumpBtn = jump.querySelector("button");

// 键盘事件
window.addEventListener("keydown",keyDown);

function keyDown(e){
    if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
        switch(e.keyCode){
            case 37:
                run([0, 1, 2, 3]);
                run([4, 5, 6, 7]);
                run([8, 9, 10, 11]);
                run([12, 13, 14, 15]);
                break;
            case 38:
                run([0, 4, 8, 12]);
                run([1, 5, 9, 13]);
                run([2, 6, 10, 14]);
                run([3, 7, 11, 15]);
                break;
            case 39:
                run([3, 2, 1, 0]);
                run([7, 6, 5, 4]);
                run([11, 10, 9, 8]);
                run([15, 14, 13, 12]);
                break;
            case 40:
                run([12, 8, 4, 0]);
                run([13, 9, 5, 1]);
                run([14, 10, 6, 2]);
                run([15, 11, 7, 3]);
                break; 
        };
        createValue();
    };
};

// window 一上来时生成
window.addEventListener("DOMContentLoaded",function(){
    init();
},{
    once: true
});

// 初始化生成
function init(){
    let rondom = Math.floor(Math.random() * imgs.length);
    imgs[rondom].setAttribute('value', 2);
    imgs[rondom].src = `./img/cube_2.png`;
}

// 随机生成
function createValue(){
    let rondom = Math.floor(Math.random() * imgs.length);
    if(imgs[rondom].getAttribute('value') == 0){
        // 如果当前位置为 0 
        imgs[rondom].setAttribute('value', 2);
        imgs[rondom].src = `./img/cube_2.png`;
    } else {
        setTimeout(createValue, 20);
    };
};

// 主要逻辑
function G2048(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        // 如果数值不等于 0
        if(arr[i] !== 0){
            // 判断 j 的值是不是 0
            for(var j = i + 1; j < arr.length; j++){
                // 如果 j 的值不为 0 说明找到了退出循环，否则继续查找下一位
                if(arr[j] != 0) break;
            };
            if(arr[i] !== arr[j]){
                // 如果不相等则添加在新数组中
                newArr.push(arr[i]);
            } else {
                // 如果相等了
                newArr.push(arr[i] + arr[j]);   // 合并
                i = j;  // i 走到下一位
            }
        }
    };
    // 填充
    for(let i = 0; i < 4; i++){
        newArr[i]? newArr[i]: newArr[i] = 0;
    }
    return newArr;
};

function run(arr){
    /****
     *      第一排          第二排
     *    [0, 1, 2, 3]  [4, 5, 6, 7]
    ***/
    let newValue = G2048([
        Number(imgs[arr[0]].getAttribute('value')),
        Number(imgs[arr[1]].getAttribute('value')),
        Number(imgs[arr[2]].getAttribute('value')),
        Number(imgs[arr[3]].getAttribute('value')),
    ]);
    for(let i = 0; i < arr.length; i++){
        imgs[arr[i]].setAttribute('value', newValue[i]);
        imgs[arr[i]].src = `./img/cube_${newValue[i]}.png`;
    };

    // 分数统计
    let total = 2;
    imgs.forEach(item=>{
        if(item.getAttribute("value")){
            // 游戏到达 2048 
            if(item.getAttribute("value") >= 2048){
                jump.style.display = 'block';
                mask.style.display = 'block';
                window.removeEventListener("keydown", keyDown);
            };
            total += Number(item.getAttribute("value"));
        };
    });
    scroeNum.innerHTML = total;
};

// 重置游戏
function resetGame(){
    imgs.forEach(item=>{
        item.setAttribute("value", 0);
        item.src = `./img/cube_0.png`;
    });
};

let first = 0; // 重置分数

// 重新开始点击时
reset.addEventListener("click",function(e){
    // 显示弹窗
    resetAlart.style.display = 'block';
    // 卸载键盘事件
    if(resetAlart.style.display = 'block'){
        window.removeEventListener('keydown', keyDown)
    };
    mask.style.display = 'block';   // 遮罩层
    resetAlart.classList.add("alert-acitive");  // 显示弹窗动画
});

// 完成 2048 小游戏后的重新开始的按钮
jumpBtn.addEventListener("click",function(){
    // 关闭弹窗
    jump.style.display = 'none';
    mask.style.display = 'none';
    // 重新游戏
    resetGame();
    // 初始化棋子
    init()
    scroeNum.innerHTML = first;
    // 重新执行事件
    window.addEventListener('keydown', keyDown);
});

// 弹窗组件
resetAlart.addEventListener("click",function(e){
    if(e.target.classList.contains('yes')){
        // 关闭弹窗、遮罩
        resetAlart.style.display = 'none';
        mask.style.display = 'none'
        // 重置游戏
        resetGame();
        // 重置分数
        scroeNum.innerHTML = first;
        // 初始化生成
        init();
        // 重新执行事件
        window.addEventListener('keydown', keyDown);
    } else if(e.target.classList.contains('no')) {
        // 关闭弹窗、遮罩
        resetAlart.style.display = 'none';
        mask.style.display = 'none';
        // 重新执行事件
        window.addEventListener('keydown', keyDown);
    };
});