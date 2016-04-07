/**
 * Created by Luna Shu on 2015/9/28.
 */
var count = 1; //已进行的游戏数
var all = 19; //游戏总数
var url, urlArr, gameid=1, ajaxUrl;
var shareTit='', shareLink, shareImg, shareDesc;
var gameidArr;
$(function(){
    url = window.location.href;
    console.log(url);
    $('#count #all').html(all);
    if(url.indexOf('?') > 0){
        urlArr = url.split('?');
        if(urlArr[1].indexOf('&')){
            urlArr = urlArr[1].split('&');
            gameidArr = urlArr[0].split('=');
        }else{
            gameidArr = urlArr[1].split('=');
        }

        gameid = gameidArr[1];
    }
    preloadimages([
        'images/gift.jpg',
        'images/index.jpg',
        'game_1/images/ani_1.png',
        'game_1/images/ani_2.png',
        'game_1/images/ani_3.png',
        'game_1/images/bg.jpg',
        'game_2/images/bg.gif',
        'game_3/images/bg.gif',
        'game_4/images/bg.gif',
        'game_5/images/bg.gif',
        'game_6/images/bg.gif',
        'game_7/images/bg.gif',
        'game_8/images/bg.gif',
        'game_9/images/bg.gif',
        'game_10/images/bg.gif',
        'game_11/images/bg.gif',
        'game_12/images/bg.gif',
        'game_13/images/bg.gif',
        'game_14/images/bg.gif',
        'game_15/images/bg.gif',
        'game_16/images/bg.gif',
        'game_17/images/bg.gif',
        'game_18/images/bg.gif',
        'game_19/images/bg.gif'
    ]).done(function(images){
        console.log(images.length); //alerts 3
        console.log('加载完成'); //alerts '1.gif 220'

        var starthtml = '<div class="start"><img src="images/index.jpg" alt=""/></div>';
        $('#game').html(starthtml)

    });

    $('#game').on('touchend', '.start', function(e){
        e.stopPropagation();
        gameChange();
    });




    $('#game').on('touchend', '.targetBound', function(e){
        e.stopPropagation();
        $('.target').show().animate({'width':'+=10%'}, 1000, function(){
            gameid++;
            count++;
            gameChange();
        });
    });
    $('#game').on('touchend', function(){
        $('.noteLayer').show();
    });
    $('#game').on('touchend', '.tryAgain', function(e){
        e.stopPropagation();
        $('.noteLayer').hide();
    })
});
function gameChange(){
    //判断关卡 start ：针对分享后打开游戏，并非从第一关开始的情况，判断游戏是否已全部通关，若没有通关并且已经进行到最后一关则返回第一关开始
    if(count <= all && gameid > all){
        gameid = 1;
    }
    if(count > all){
        alert('您已全部通关');
        var html = '<div class="end"><img src="images/gift.jpg" alt=""/></div>';
        $('#game').html(html);
        $('#count').hide();
        return false;
    }
    //判断关卡 end
    ajaxUrl = 'game_'+gameid;
    $.ajax({
        url: ajaxUrl,
        dataType: 'html',
        success: function(data){
            console.log('success');
            $('#game').html(data);
            shareDesc = $('.shareTxt').val();
            shareTit = $('.shareTitle').val();
            shareLink = window.location.host + window.location.pathname + '?gameid='+ gameid;
            shareImg = $('.bg').css('background-image');
            shareImg = shareImg.slice(4,shareImg.length-1);

            $('title').html(shareTit);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown ){
            alert('ajax error');
            console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        },
        complete: function(){
            $('#count #num').html(count);

        }

    });
}
function preloadimages(arr){
    var newimages=[], loadedimages=0;
    var postaction=function(){};  //此处增加了一个postaction函数
    var arr=(typeof arr!="object")? [arr] : arr;
    function imageloadpost(){
        loadedimages++;
        if (loadedimages==arr.length){
            postaction(newimages); //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
        }
        var x = (loadedimages * 100)/arr.length;
        $('#loading h1 span').html(Math.floor(x));
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image();
        newimages[i].src=arr[i];
        newimages[i].onload=function(){
            imageloadpost()
        };
        newimages[i].onerror=function(){
            imageloadpost()
        };
    }
    return { //此处返回一个空白对象的done方法
        done:function(f){
            postaction=f || postaction
        }
    }
}

