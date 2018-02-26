function Watcher(){
    this.listener = {text:[],node:[]};
    this.repeat = {};
    this.arr = [];
}

Watcher.prototype = {
    constructor:Watcher,
    update(key,value){
        // console.log(this.listener)
        Object.keys(this.listener).map((ext)=>{
            this.listener[ext].map((obj,index)=>{
                if(obj.name === key){
                    obj.fn(obj.el,obj.owner,index,value)
                }
            })   
        })
    },
    // arrrepeat(){
    //     this.listener.map(val=>{
    //         var text = val.name+val.type;
    //         if(!this.repeat[text]){
    //             this.arr.push(val)
    //             this.repeat[text] = 1;
    //         }
    //     })
    //     this.listener = [...this.arr];  //订阅者去重
    // },
    addObserve(key,type,fnname,value,el,owner,cb){
        var obj = {
            name:key,
            type,
            fn:fnname,
            value,
            el,
            owner
        }
        if(type === 'text'){
            this.listener.text.push(obj)
        }else if(type === 'node'){
            this.listener.node.push(obj) //添加订阅者
        }

        cb&&cb(obj) //返回视图constroll做处理
    }
}

var watcher = new Watcher();