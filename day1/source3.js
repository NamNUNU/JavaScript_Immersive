function test() {
    var element = document.querySelectorAll("div");
    for (var key in element) {
        var class_name = element[key].className;
        if(class_name === undefined) {
            continue;
        }
        if(class_name.toString().match(/_|-/g) !== null) {
            element[key].className = ""
        }
    }
}
