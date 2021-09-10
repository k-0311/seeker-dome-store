var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var president = {
    id: 'top secret',
    name: 'jianguo chuan',
    age: 74,
    gender: 'male'
};
var arr = [1, 2, 3, 4, 5, '789', 55];
var fibonacci = [1, 1, 2, 3, 5];
function sum(x, y, n, str) {
    return x + y + n + str;
}
sum(1, 'a', 0.1, 'bbb'); //最后一个参数为字符串字面量，因此只能填指定好的参数
var fuckfn = function (x, y) { return x + y; };
var fuckTwo = function (xa, yb) { return xa + yb; };
function overload(x) {
    return x;
}
//断言
function isFish(animal) {
    return typeof animal.swim === 'function';
}
//元组
var tup = ['xxx', 666];
tup.push('scc'); //新增的值 '只能是' 元组中类型的 '联合类型'
// tup.push(false) 报错
//枚举
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
var directions = [
    0 /* Up */,
    1 /* Down */,
    2 /* Left */,
    3 /* Right */
];
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
//上例的编译结果是：
//var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
var Outfit = /** @class */ (function () {
    function Outfit(SCVR, UBI, EG7) {
        this.SCVR = SCVR;
        this.UBI = UBI;
        this.EG7 = EG7;
    }
    Outfit.prototype.show = function () {
        console.log(this.SCVR);
        console.log(this.UBI);
        console.log(this.EG7);
    };
    return Outfit;
}());
var outfit = new Outfit('tag', 999, false);
outfit.show();
/*抽象类
 *抽象类是不允许被实例化
 *抽象类中的抽象方法必须被子类实现
 */
var McLaren = /** @class */ (function () {
    function McLaren(name) {
        this.name = name;
    }
    return McLaren;
}());
var M650s = /** @class */ (function (_super) {
    __extends(M650s, _super);
    function M650s() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    M650s.prototype.run = function () {
        console.log(this.name);
        return '666';
    };
    return M650s;
}(McLaren));
var m650s = new M650s('ennnnnnnnnnnn');
m650s.run();
var ifv = {
    alert: function () { },
    speed: function () { }
};
var Door = /** @class */ (function () {
    function Door() {
    }
    return Door;
}());
var SecurityDoor = /** @class */ (function (_super) {
    __extends(SecurityDoor, _super);
    function SecurityDoor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecurityDoor.prototype.alert = function () {
        console.log('securityDoor alert');
    };
    return SecurityDoor;
}(Door));
//多接口
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.uuid = function () { };
    Car.prototype.alert = function () {
        console.log('car alert');
    };
    Car.prototype.on = function () {
        console.log('open car foglight');
    };
    Car.prototype.off = function () {
        console.log('close car foglight');
    };
    Car.prototype.speed = function () {
        console.log('500km/s');
    };
    return Car;
}());
var magic = {
    type: 'tank',
    alert: function () { },
    on: function () { },
    off: function () { },
    speed: function () { }
};
// 泛型
// 注意！必需的类型参数不能跟在可选类型参数之后 <T = string, E> 会报错
function something(tup) {
    return [tup[1], tup[0]];
}
var build = function (x, y) { return Array(x).map(function (_) { return y; }); };
//此时在使用泛型接口的时候，需要定义泛型的类型
var buildmore = function (x, y) { return Array(x).map(function (_) { return y; }); };
//泛型类
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
