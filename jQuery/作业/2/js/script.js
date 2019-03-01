$(function(){

    var link1=$('.headerright>div');
        
        function showMenu(event){
            $(this).show();
        }
        function hideMenu(event){
            $(this).hide();
        }
       link1.hover(showMenu,hideMenu);
       // link1.
    
});