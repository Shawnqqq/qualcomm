const PAGE={
    data:{
        index:0,
        itemLeft:0,   //位移距离
        itemNumber:null,   //图片数量
        itemWidth:240,      //图片宽度
        navFixed: false,  //固定定位
        navHeight: 70,   //导航高度
        navDistance: 565  //导航底部距离顶部高度
    },
    init:function(){
        this.bind()
        this.clone()
    },
    bind:function(){
        $('.video-item-title').on('click',this.hide);
        $('#teacher-left').on('click',this.leftItem);
        $('#teacher-right').on('click',this.rightItem);
        $(window).on('scroll',this.refresh);
        $('.navigation-item').on('click',this.positionNav)
    },
    refresh:function(){
        PAGE.fixedNav()
        PAGE.hightLight()
    },
    fixedNav:function(){
        let scroll =$(window).scrollTop();
        navFixed = scroll >= PAGE.data.navDistance;
        if(navFixed !== PAGE.data.navFixed){
            PAGE.data.navFixed = navFixed
            if(navFixed){
                $('#navigation-section').toggleClass('active')
            }else{
                $('#navigation-section').toggleClass('active')
            }
        }
    },
    hightLight:function(){
        let scroll =$(window).scrollTop();
        let itemNav;
        $.each($('.navcontent'),(index,item)=>{
            $('.navigation-item').removeClass('active');
            if(scroll >= item.offsetTop-PAGE.data.navHeight){
                itemNav = $('.navigation-item')[index]
            }
        })
        $(itemNav).addClass('active')
    },
    positionNav:function(e){
        let data = e.target.dataset.nav;
        let index = data-1;
        let offsetTop;
        if(index<4){
            offsetTop = $('.navcontent')[index].offsetTop-60
        }else{
            offsetTop = $('.navcontent')[index].offsetTop-500
        }
        //$(window).scrollTop(offsetTop);
        $('html,body').animate({
            scrollTop: offsetTop
        },1000)
    },
    hide:function(){
        $(this).next().slideToggle();
        $(this).parent().toggleClass('active')
    },
    clone:function(){
        let itemLength = $('.teacher-item').length
        for(let i=0;i<4;i++){
            $($('.teacher-item')[i]).clone().appendTo('#teacher-list')
        }
        $($('.teacher-item')[itemLength-1]).clone().prependTo('#teacher-list')
        let index = PAGE.data.index;
        let itemWidth =PAGE.data.itemWidth;
        PAGE.data.itemNumber = itemLength;
        PAGE.data.itemLeft = -(itemWidth+itemWidth*index)
        PAGE.goIndex(index);
    },
    goIndex:function(index){
        let itemNumber =PAGE.data.itemNumber;
        let itemWidth = PAGE.data.itemWidth;
        let itemLeft= -(itemWidth+itemWidth*index)
        $('#teacher-list').stop().animate({left:`${itemLeft}px`},500,function(){
            if(index === -1){
                index =itemNumber-1;
                let lastLeft = -(itemWidth+itemWidth*index)
                $('#teacher-list').css('left',`${lastLeft}px`)
            }
            if(index === itemNumber){
                index = 0;
                let firstLeft =-(itemWidth+itemWidth*index)
                $('#teacher-list').css('left',`${firstLeft}px`)
            }
            PAGE.data.index=index
        })
    },
    leftItem:function(){
        let index= PAGE.data.index;
        PAGE.goIndex(index-1);
    },
    rightItem:function(){
        let index= PAGE.data.index;
        PAGE.goIndex(index+1);
    }
}
PAGE.init()