(function(global){
    var arrObj = [];
    function Constroller(option) {
        this.owner = option;
        if (option.el.nodeType === 1) {
            this.el = option.el;
        } else {
            this.el = document.getElementById(option.el.slice(1))
        }
        this.childNodes = this.arrays(this.el.childNodes); //遍历所有的子节点
        this.data = option.data;
    }
    
    Constroller.prototype = {
        constructor: Constroller,
        init() {
            this.analysis(this.childNodes); //初始化视图
        },
        render() {
            var fragement = document.createDocumentFragment();
            this.childNodes.map(el => {
                fragement.appendChild(el)
            })
            this.el.appendChild(fragement);
        },
        analysis(al) {
            al.map(el => {
                switch (el.nodeType) { //根据nodetype来选用不同方法渲染
                    case 1:
                        this.analysis(this.arrays(el.childNodes))
                        this.nodealaysis(el, this);
                        break;
                    case 3:
                        this.textalaysis(el, this)
                        break;
                    default:
                        break;
                }
            })
        },
        nodealaysis(el, self) { //节点上的属性渲染
            var attr = Array.prototype.slice.call(el.attributes);
            attr.map(val => {
                var name = val.name;
    
                if (name.startsWith('v-bind:') || name.startsWith(':')) {
                    var key = name.slice(name.indexOf(':') + 1)
                    el.removeAttribute(name)
                    el.setAttribute(key, self[key])
                    if (!el.getAttribute('data-flag')) {
                        watcher.addObserve(key, 'node', self.nodealaysis, self[val], el, self.owner)
                    }
                    el.setAttribute('data-flag', true)
                }
            })
        },
        findEvery(str,cha){ //找到模板渲染的位置 以便下次改动数据后可识别位置
            var arr = [];
            var x=str.indexOf(cha);
            arr.push(x)
            for(var i=0;i<Math.ceil(str.length/cha.length+1);i++){
                x=str.indexOf(cha,x+1);
                arr.push(x)
            }
            return arr
        },
        textalaysis(txt, self,index,value) {//节点内容的属性渲染
           
            if (txt.nodeValue !== "undefined") {  
                var text = txt.nodeValue.replace(/\{\{/ig, '=').replace(/\}\}/ig, '=').replace('==', '=').trim();
                if (text.startsWith('=')) {
                    text = text.slice(1)
                }
                if (text.endsWith('=')) {
                    text = text.slice(0, text.length - 1)
                }
              
                var textnext = '';
                if (text.split('=')[0] !== "") {
                    text.split('=').map(val => {
                        if (textnext === '') {
                            textnext = text.replace(/\=/g, '');
                        }

                        if (self.data[val]) {
                            var lengthstart = self.findEvery(text,val);
                            txt.nodeValue = textnext.replace(new RegExp(val,'g'), self.data[val]);
                            textnext = txt.nodeValue;
                            watcher.addObserve(val, 'text', self.textalaysis, self.data[val], txt, self.owner, function (data) {
                                arrObj.push(data)
                            })
                            
                        } else {
                            if(arrObj.length>0&&arrObj[index]){
                                setTimeout(()=>{
                                    txt.nodeValue = txt.nodeValue.replace(new RegExp(arrObj[index].value,'g'), self[arrObj[index].name]);
                                    arrObj[index].value = self[arrObj[index].name];
                                },0)
                            }
                        }
                    })
                }
            }
        },
        arrays(el, index) {
            return Array.prototype.slice.call(el, index === undefined ? 0 : index);
        }
    }

    global.Constroller = Constroller
})(window)


