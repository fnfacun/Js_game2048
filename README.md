# 基于原生 Js 开发的 Game2048 小游戏

## 游戏介绍
- 键盘方向键控制卡片位移，分数相同时合并生成新的数值，达到 2048 则游戏结束。

## 游戏规则
- 初始化随机生成一张卡片。
- 每移动一次随机位置生成一张卡片。
- 当位置布满且无法移动时，则游戏结束。
- 游戏开始时，可以随时重新开始。
- 有一张卡片分数达到 2048 时则游戏结束，通关成功。

## 项目总体规划
- js_game2048
  - css
  - img
  - js
  - 2048.html

## 项目主要逻辑实现
![](D:\web note\project\js_game2048\img\readme1.png)

- 创建一个数组，设置指针 i，默认为 0。
- 获取 i 的值
  - 如果 i 的值为空，i++ 进入下一轮
  - 如果 i 的值不为空
    - 设置 j = i + 1
    - 获取 j 的值，比较 i === j
      - 如果 i != j 的值，把 i 的值添加到 newArr 中，i++ 进入下一轮
      - 如果 i == j 的值，把 i+j 的值相加，添加到 newArr，i = j + 1

## 项目问题总结
1. 每移动一次时，随机生成一颗棋子，采用递归方式造成堆栈溢出的问题。采取的措施是 setTimeout 间隔定时器异步解决。

## 讨论
欢迎分享共同做一个技术交流。