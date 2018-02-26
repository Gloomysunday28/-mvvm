function observe(owner,obj){
    if(typeof obj !== 'object'){
        return ;
    }

    Object.keys(obj).map((key)=>{
        observer(owner,obj,key,obj[key])
    })
}

function observer(owner,data,key,val){
    observe(val);//如果val是对象
    Object.defineProperty(owner,key,{
        enumerable:true,//可枚举 
        configurable:true,//可删除
        get:function(){
            return val;
        },
        set:function(newval){
            if(val !== newval){
                watcher.update(key,newval) //通知订阅者vm去通知视图更新
            }
            val = newval;
            return val;
        }
    })
}

