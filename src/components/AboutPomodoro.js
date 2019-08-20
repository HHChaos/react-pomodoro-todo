import React from 'react';
function AboutPomodoro(props) {
    return (
        <div>
            <p>番茄工作法是简单易行的时间管理方法，是由弗朗西斯科·西里洛于1992年创立的一种相对于GTD更微观的时间管理方法。</p>
            <p>做法：</p>
            <ol>
                <li>每天开始的时候规划今天要完成的几项任务</li>
                <li>设定你的定时器，时间是25分钟。</li>
                <li>开始完成第一项任务，直到25分钟结束。</li>
                <li>停止工作，休息5分钟。25分钟的专注工作加5分钟的休息，这就是所谓的一个番茄钟</li>
                <li>开始下一个番茄钟，继续该任务。一直循环下去，直到完成该任务，并在列表里将该任务划掉。</li>
                <li>每四个番茄钟后，休息15分钟。</li>
            </ol>
            <p>在某个番茄钟的过程里，如果突然想起要做什么事情:</p>
            <ul>
                <li>非得马上做不可的话，停止这个番茄钟并宣告它作废（哪怕还剩5分钟就结束了），去完成这件事情，之后再重新开始同一个番茄钟；</li>
                <li>不是必须马上去做的话，将这件事记在另一个列表里（比如叫“计划外事件”），然后接着完成这个番茄钟。</li>
            </ul>
        </div>

    );
}

export default AboutPomodoro;