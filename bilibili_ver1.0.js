//0.初始化  
auto.waitFor();
//1.请求截图 autojs4.1用
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();}
//2.等待某某出现 作出反馈
function wait_sth(sth, showsth, nshowsth){
    if(sth) return toastLog(showsth);else return toastLog(nshowsth);}
//3.点击控件 找不到报错
function sureclick(x) {if(x) return x.click();else toastLog('未找到按钮');}
//4.检测是否在动态页面
function check_in(){
    let cardlike = id('card_like').clickable(true).findOne(2000);
    let card_end = text('到达尽头了').findOne(100);
    if(!cardlike) {toastLog('未处于动态页面,脚本结束');exit();}
    if(card_end) {toastLog('点赞完成！'); exit();}
}
//5.检测有无赞按钮 自动处理并反馈
function check_and_zan(){
    let cardlike = boundsInside(0, dev_hight/2, dev_width, dev_hight).id('card_like').clickable(true).findOne();
    if(!cardlike) return 0;
    let x1 = cardlike.bounds().left+cardlike.bounds().width()*0.33;
    let y1 = cardlike.bounds().top+cardlike.bounds().height()*0.51;
    let img = captureScreen();
    if(y1 > img.getHeight() || y1 <= 0) return 0;
    let color = images.pixel(img, x1, y1);
    if(colors.toString(color) == '#ffff7098') return 0;
        else {sureclick(cardlike);return 1;}}




var dev_hight = device.height;
var dev_width = device.width;
console.show();
toastLog('请切换到某位up的首页\n 5秒后开始');
sleep(5000);
times = 1;
sureclick(text('动态').clickable(true).findOne(2000));
check_in();
toastLog('当前up的名字是:'+id('name').findOne(3000).getText());


while(1) {
    if (check_and_zan()) toastLog('点赞第'+times+++'次');
    swipe(dev_width/2, dev_hight * 3/4, dev_width/2, dev_hight/2,1000);sleep(1000);
    check_in();}










