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

### 枚举的好处

1. 有默认值和可以自增值，节省编码时间
2. 语义更清晰，可读性增强，方法参数类型可以明确为枚举类型
