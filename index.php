<?php
require_once "jssdk.php";
$jssdk = new JSSDK("wxbe91888ccc9220bf", "6a56e750f64f6fa522b85849a08e19a7");
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;" />
    <title></title>
    <link rel="stylesheet" href="style.css"/>
    <script src="jquery-1.9.1.js"></script>
    <script src="main.js"></script>
</head>
<body>
    <div id="count">
        <span id="num">1</span>/<span id="all">18</span>
    </div>
    <div id="game">
        <div id="loading">
            <h1><span>0</span>%</h1>
            <span>loading...</span>
            <i></i>
        </div>

    </div>
</body>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>

    wx.config({
        debug: false,
        appId: '<?php echo $signPackage["appId"];?>',
        timestamp: <?php echo $signPackage["timestamp"];?>,
        nonceStr: '<?php echo $signPackage["nonceStr"];?>',
        signature: '<?php echo $signPackage["signature"];?>',
        jsApiList: [
        // 所有要调用的 API 都要加到这个列表中
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });

    setInterval(function(){
        wx.ready(function () {
            // 在这里调用 API
            wx.onMenuShareTimeline({
                title: shareTit, // 分享标题
                link: 'http://'+ shareLink, // 分享链接
                imgUrl: shareImg, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    alert('分享成功');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: shareTit, // 分享标题
                desc: shareDesc, // 分享描述
                link: 'http://'+ shareLink, // 分享链接
                imgUrl: shareImg, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    alert('分享成功');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    }, 1000)


</script>
</html>