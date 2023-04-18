import './index.css';
import './less.less';
import './sass.scss';
import png from './assets/png.png?year=2023';
import ico from './assets/png.ico';
import text from './assets/png.txt';

function readonly(target, key, descriptor) {
  descriptor.writable = false;
}

class Person {
  @readonly PI = 3.14
}

const person = new Person();
person.PI = 3.15;
console.log(person);

const a = 1; const
  b = 2;
const c = 3;
