import "@/style/common.styl";

class Person{
  constructor(name,age){
    this.name=name;
  }
  say(){
    console.log(this.name+'--'+this.age)
  }
}
let person=new Person('小明',18);
person.say();