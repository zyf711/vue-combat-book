# iView经典组件剖析   

+ iView：是一套基于Vue2的开源UI组件库。主要服务于PC界面的中后台产品。   
+ 官网：https://www.iviewui.com/   
+ github：https://github.com/iview/iview   

独立组件与业务组件最大的不同是，业务组件往往针对数据的获取、整理、可视化，逻辑清 晰简单，可以使用vuex：而独立组件的复杂度更多集中在细节、交互、性能优化、 API 设计上， 对原生 JavaScript 有一定考验。在使用过程中，可能会有新功能的不断添加，也会发现隐藏的 bug, 所以独立组件一开始逻辑和代码量并不复杂，多次选代后会越来越冗长，当然功能也更丰富，使用更稳定。万事开头难，组件 API 的设计和可扩展性决定了组件迭代的复杂性。一开始不可能考虑到所有的细节，但是整体架构要清晰可扩展，否则很有可能重构。  

https://github.com/iview/iview/blob/2.0/src/components里有他的组件源码   

组件间通信可以通过$emit bus vuex来实现。但iView作为独立组件无法使用bus vuex，为了实现跨组件通讯，模拟了vue1的dispatch和broadcast 

级联选择组件Cascader就是用了几个组件在一起实现：   
cascader.vue   
casitem.vue   
caspanel.vue   

iView内置工具函数，比如:findComponentUpward findComponentDownward findComponentsDownward