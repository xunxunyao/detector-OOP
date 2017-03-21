/**
 * Created by yaoxunxun on 2017/3/20.
 */

!function (global) {
    function DetectorBase(configs) {
        if(!this instanceof DetectorBase){
            //限制一定要通过构造器调用，在外部不能直接调用这个函数
            //如果通过构造器调用，this是最后要返回的对象，
            throw  new Error('Do not invoke without new.');
        }
        this.configs=configs;
        //this.analyze();
    }
    DetectorBase.prototype.detect=function () {
        throw new Error('Not implemented');
    };
    DetectorBase.prototype.analyze=function () {
        console.log('analyzing...');
        this.data="###data###";
    };

    function LinkDetector(links) {
        if(!this instanceof LinkDetector){
            throw new Error('detector')
        }
        this.links=links;
        DetectorBase.apply(this.arguments);
    }
    function ContainerDetector(containers) {
        if(!this instanceof ContainerDetector){
            throw  new Error('Do not invoke without new.');
        }
        this.containers=containers;
        DetectorBase.apply(this.arguments);
    }


    inherit(LinkDetector,DetectorBase);//要先实现继承，再去linkDecectorBase,以防被覆盖
    inherit(ContainerDetector,DetectorBase);

    LinkDetector.prototype.detect=function () {
        console.log('Loading data'+this.data);
        console.log('link detection started.');
        console.log('Scaning links:'+this.links);
    };

    ContainerDetector.prototype.detect=function () {
        console.log('Loading data'+this.data);
        console.log('link detection started.');
        console.log('Scaning links:'+this.containers);
    };

    //冻结，不可更改
    Object.freeze(DetectorBase);
    Object.freeze(DetectorBase.prototype);
    Object.freeze(LinkDetector);
    Object.freeze(LinkDetector.prototype);
    Object.freeze(ContainerDetector);
    Object.freeze(ContainerDetector.prototype);

    //挂载到全局对象
    Object.defineProperties(global,{
        LinkDetector:{value:LinkDetector},
        ContainerDetector:{value:ContainerDetector},
        DetectorBase:{value:DetectorBase}
    });

    function inherit(subClass,superClass) {
        subClass.prototype=Object.create(superClass);
        subClass.prototype.constructor=subClass;
    }

}(this);

var cd=new ContainerDetector("#abc #def #ghi");
var ld=new LinkDetector("http://123");

cd.detect();
ld.detect();
