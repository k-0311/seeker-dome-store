var Fq;
(function (Fq) {
    Fq[Fq["one"] = 1] = "one";
    Fq[Fq["two"] = 2] = "two";
    Fq[Fq["three"] = 3] = "three";
})(Fq || (Fq = {}));
var fq = Object.entries(Fq);
console.log("fq", fq);
