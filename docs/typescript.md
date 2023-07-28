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
