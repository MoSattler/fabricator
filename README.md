<div align="center">
<h1>Fabricator</h1>

<a href="https://www.emojione.com/emoji/1f527">
<img height="80" width="80" alt="wrench" src="https://raw.githubusercontent.com/MoSattler/fabricator/master/other/wrench.png" />
</a>

<p>Fabricate objects for your tests</p>
</div>
<hr />

## The Problem

Fabricator is based on the excellent
[Fabrication](https://www.fabricationgem.org/). Its purpose is to easily
generate objects in JavaScript. It is particularly useful for testing.

## Installation

`npm install --dev @mosattler/fabricator`

## Defining Models

Models are defined with `Fabricator()` in this way:

```js
import { Fabricator } from "@mosattler/fabricator";
import faker from "faker";

const userFabricator = Fabricator({
  id: () => uniqueId(),
  name: () => faker.name.firstName() + faker.name.lastName(),
  admin: false,
});
```

You simply pass a model definition. The definition is an object where each key
is a function. If you need dynamic data you can use a
library like [faker](https://www.npmjs.com/package/faker).

You can also extend existing models. For example:

```js
const adminFabricator = userFabricator.extend({ admin: true });
```

In this case, `adminFabricator` will inherit all the properties from
`userFabricator` but will overwrite the value for the `admin` property.

## Fabricating Objects

Once your model is defined you can create it by calling the returned function:

```js
const user = userFabricator();
// => { id: 1, name: 'John Doe', admin: false }
const admin = adminFabricator();
// => { id: 2, name: 'Susan Smith', admin: true }
```

You can overwrite some values by passing a model definition as parameter:

```js
const blockedUser = userFabricator({ isBlocked: true });
// => { id: 3, name: 'Donald Brown', admin: false, isBlocked: true }
```

Note that there's a difference between passing a function and a static value in
a fabricator definition. A function gets executed every time you create a new
object, a constant value is cached. Consider the following example:

```js
const withConstant = Fabricator({ foo: Math.random() });
withConstant(); // => { foo: 0.11134742452557367 }
withConstant(); // => { foo: 0.11134742452557367 }
withConstant(); // => { foo: 0.11134742452557367 }

const withMethod = Fabricator({ foo: () => Math.random() });
withMethod("withMethod"); // => { foo: 0.4426388385403983 }
withMethod("withMethod"); // => { foo: 0.572825488636862 }
withMethod("withMethod"); // => { foo: 0.4322506522885017 }
```