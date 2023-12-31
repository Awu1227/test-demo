# Typescript

## Typescript 的优势

1. 编译时静态类型检测
2. 自动提示更清晰明确
3. 引入了泛型和一系列的 TS 特有的类型
4. 强大的 d.ts 声明文件
5. 轻松编译成 JS 文件
6. 灵活性高（any 与 as any）

## 类型注解

```ts
let data:number = 1
```

## 类型检测

```ts
let name = 'jack'
```

## 24 种数据类型

### 基本类型

> number, string, boolean, symbol, null, undefined

### 根类型

> Object, {}, 后者是前者的简写

```ts
let obj1:Object
let obj2:{}
```

### 对象类型

> Array, object, Function

```ts
let arr:Array<string>
let obj:object
let fun:Function
```

### 枚举

> enum

### 其他特殊类型

> any, unknown, nerver, void, tuple, 可变数组

### 合成类型

> 联合类型，交叉类型

```ts
// 联合类型
let str:string | number = '3'

// 交叉类型
type Tobj1 = {userName: string}
type Tobj2 = {age: number}

let obj: Tobj1 & Tobj2 = {
	userName: 'orange',
	age: 18
}
```

### 字面量数据类型

```ts
type position = 'top' | 'left' | 'bottom' | 'right'
```

## nerver 类型的意义

> 使用 nerver 避免出现未来扩展新的类没有对应类型的实现，目的就是写出**类型绝对安全的代码**

```ts
type TData = string | number

function dataAnalysisWithNerver(data: TData) {
	if (typeof data === 'string') {
		console.log('字符串类型：', data.length)
	} else if (typeof data === 'number') {
		console.log('数值类型：', data.toFixed(2))
	} else {
		data.xxxx
	}
}
```

## 枚举

### 为什么要用枚举？

1. 常量解决
2. 使用常量带来的局限性

```ts
const Status = {
	error: -1,
	warning: 0,
	success: 1,
}

class Notice {
	getStatus(status: number) {
		if (status === Status.error) {
			console.log('状态错误')
		} else if (status === Status.warning) {
			console.log('状态警告')
		} else if (status === Status.success) {
			console.log('状态成功')
		}
	}
}
```

> 方法参数不能定义为具体类型，只能初级使用 number，string 基本类型替代，**降低了代码的可读性和可维护性**

_使用枚举：_

```ts
enum EStatus {
	error = -1,
	warning  = 0,
	success = 1
}

class Notice {
	getStatus(status: EStatus) {
		if (status === EStatus.error) {
			console.log('状态错误')
		} else if (status === EStatus.warning) {
			console.log('状态警告')
		} else if (status === EStatus.success) {
			console.log('状态成功')
		}
	}
}
```

### 枚举的定义，分类，取值方式

#### 1. 枚举的定义

用来存放一组固定的常量的序列

#### 2. 枚举分类

```ts
// 字符串枚举
enum EDay {
	Monday = 'Monday',
	Tuesday = 'Tuesday',
	Wensday = 'Wensday'
}
// 数字枚举
enum EDay {
	Monday,
	Tuesday,
	Wensday
}
enum EDay {
	Monday = 1,
	Tuesday,
	Wensday
}
enum EDay {
	Monday = -1,
	Tuesday,
	Wensday
}
```

注意 ⚠️：

1. 数字枚举可由值取 key，但是**字符串枚举不行**
2. 数字枚举可指定从哪个数字开始

### 枚举的底层

#### 数字枚举

[Playground](https://www.typescriptlang.org/zh/play?#code/KYOwrgtgBAogIgQwJ5QN4FgBQBIAsgexABNkoBeKAWgEYAaLbAFTGAGcSl6cB1Ud5LAF8gA)

> 采用的是双向映射

```js
var EDay;
(function (EDay) {
    EDay[EDay["Monday"] = -1] = "Monday";
    EDay[EDay["Tuesday"] = 0] = "Tuesday";
    EDay[EDay["Wensday"] = 1] = "Wensday";
})(EDay || (EDay = {}));
```

#### 字符串枚举

[Playground](https://www.typescriptlang.org/zh/play?#code/KYOwrgtgBAogIgQwJ5QN4FgBQBIAsgexABNkoBeKAcgOOUoBotsAVMYAZxJQstY64ZMA6qE6keIkGKSUsAXyA)

> 采用的就是普通对象

### 枚举的好处:memo:

1. 有默认值和可以自增值，节省编码时间
2. 语义更清晰，可读性增强，方法参数类型可以明确为枚举类型

## any 和 unknown 的区别

- 相同点：**any** 和 **unknown** 可以是任何类的父类，所以任何类型的变量都可以赋值给 any 类型或 unknown 类型的变量

- 不同点 1： **any** 也可以是任何类的子类，但 **unknown** 不可以，所以**any**类型的变量都可以赋值给 其他类型的变量。
- 不同点 2： 不能拿 **unknown** 类型的变量来获取任何属性和方法，但 **any** 类型的变量可以获取任意名称的属性和任意名称的方法。

**总结：**

- any 类型可以允许任何类型的值，而 unknown 类型要求进行类型检查或类型断言。
- any 类型几乎失去了类型系统的好处，可能导致类型错误和运行时异常，而 unknown 类型提供了更严格的类型检查。
- 使用 unknown 类型可以在编译时捕获更多的类型错误，并提供更可靠的代码。

## 接口和应用场景

> 另一种定义对象类型的类型

### 接口应用场景

1. 一些第三方包或者框架底层源码种有大量的接口类型
2. 提供方法的对象类型的参数时使用
3. 为多个同类别的类提供统一的方法和属性声明

### 接口定义

```ts
interface Point {
	x: number,
	y: number
}
```

### 继承接口

> 新的接口只是在原来接口继承之上增加一些属性或方法，这时就用接口继承

```ts
interface IPerson {
	name: string,
	sex: string
}

interface ITeacher extends IPerson {
	teach():void
}

interface ISinger extends IPerson {
	sing():void
}

```

> 为多个同类别的类提供统一的方法和属性声明

```ts
interface List {
	add(): void
	remove():void
}

class ArrayList implements List {
	add():void {
		'xxx'
	}
	remove():void {
		'xxx'
	}
}

class LinkedList implements List {
	add():void {
		'xxx'
	}
	remove():void {
		'xxx'
	}
}
```

### 可索引签名

```ts
interface Product {
	name: string
	price: number
	account: number
	[x: string]: any
}

let p: Product {
	name: 'Orange',
	price: 15,
	account: 1000,
	isOnSale: true
}
```

> 可索引签名的类型需兼容其他属性的类型，一般写为**any**

### 索引访问类型

```ts
const symId = Symbol('product')

interface Product {
	[symId]: number
	name: string
	price: number
	account: number
	buy(): string
}

type A = Product["price"]
type B = Product["price" | "name"]
type S = Product[typeof symId]

type PKeys = keyof Product

type AllKeys<T> = T extends any ? T : never

type PKeys2 = AllKeys<keyof Product>

let key: PKeys2 = "name"

console.log(key)

```

## TS 函数与 rest 参数

```ts
function printInfo(name: string, age:number, ...rest: any) {
	return 3
}

printInfo('orange',13,'das',true)
```

## TS 函数类型及相关解构

```ts
type TInfo = {name: string, age:number,phone: number}

function printInfo({name, age}: TInfo) {
	console.log('name',name)
	console.log('age',age)
}

const info = {name: 'orange', age:18,phone: 12111}
printInfo(info)
```

## interface 和 type 的区别

1. 定义范围不同
   > interface 只能定义对象类型或接口当名字的函数类型；type 可以定义任何类型，包括基础类型、联合类型、交叉类型、元组
2. 继承功能
   > 接口可以 extends 一个或者多个接口或类，也可以继承 type，但 type 类型没有继承功能
3. 交叉合并
   > 用 type 交叉类型可让类型中的成员合并成一个新的 type，但接口不能交叉合并
4. 接口可合并声明
   > 定义两个相同名称的接口会合并声明，定义两个同名的 type 会出现编译错误

```ts
interface Error {
	name: string
}

interface Error {
	message: string
	stack?:string
}

let error:Error = {
	message: '空指针',
	name: "NullPointException"
}
```

## 元组

满足以下 3 点的数组就是元组

1. 在定义时每个元素的类型都确定
2. 元素值的数据类型必须是当前元素定义你的类型
3. 元素值的个数必须和定义时的个数相同

```ts
const salary: [string,number, number] = ['张三', 25000,1000]
```

## 数组和数组元素怎样同时为只读

```ts
const account = [10,40,50,60,90] as const
// account[1] =100
```

## 可变元组

```ts
const customers: [string,number,...any[]] =

['张三'，18，'男','会员']
```

### 可变元组解构

```ts
let [custname,age,...rest]: [string,number,...any[]] =

['张三',18,'男','会员']

console.log(custname, age, rest)
```
