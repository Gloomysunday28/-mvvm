(function(global){
    function Mvvm(option){
        // console.log(option)
        Object.keys(option.data).map(val=>{
            option[val] = option.data[val]
        })
        this.observe = observe(option,option.data)
        this.constroller = new Constroller(option)
        this.constroller.init();
        window.onload = function(){
            option.mounted();
        }
    }
    
    global.Mvvm = Mvvm;
})(window)
