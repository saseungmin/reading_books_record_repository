"use strict";(self.webpackChunkreading_books_record_repository=self.webpackChunkreading_books_record_repository||[]).push([[5891],{3905:function(e,r,n){n.d(r,{Zo:function(){return m},kt:function(){return d}});var t=n(7294);function l(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function o(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function a(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){l(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function i(e,r){if(null==e)return{};var n,t,l=function(e,r){if(null==e)return{};var n,t,l={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(l[n]=e[n]);return l}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=t.createContext({}),c=function(e){var r=t.useContext(s),n=r;return e&&(n="function"==typeof e?e(r):a(a({},r),e)),n},m=function(e){var r=c(e.components);return t.createElement(s.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},u=t.forwardRef((function(e,r){var n=e.components,l=e.mdxType,o=e.originalType,s=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),u=c(n),d=l,k=u["".concat(s,".").concat(d)]||u[d]||p[d]||o;return n?t.createElement(k,a(a({ref:r},m),{},{components:n})):t.createElement(k,a({ref:r},m))}));function d(e,r){var n=arguments,l=r&&r.mdxType;if("string"==typeof e||l){var o=n.length,a=new Array(o);a[0]=u;var i={};for(var s in r)hasOwnProperty.call(r,s)&&(i[s]=r[s]);i.originalType=e,i.mdxType="string"==typeof e?e:l,a[1]=i;for(var c=2;c<o;c++)a[c]=n[c];return t.createElement.apply(null,a)}return t.createElement.apply(null,n)}u.displayName="MDXCreateElement"},503:function(e,r,n){n.r(r),n.d(r,{assets:function(){return s},contentTitle:function(){return a},default:function(){return p},frontMatter:function(){return o},metadata:function(){return i},toc:function(){return c}});var t=n(3117),l=(n(7294),n(3905));const o={sidebar_position:8,sidebar_label:"7. Promise\uc640 async/await \uad6c\ubb38"},a="\ud83d\udc24 Chapter 7: Promise\uc640 async/await \uad6c\ubb38",i={unversionedId:"typescript/do-it-typescript/chapter-7",id:"typescript/do-it-typescript/chapter-7",title:"\ud83d\udc24 Chapter 7: Promise\uc640 async/await \uad6c\ubb38",description:"\ud83e\udd84 \ube44\ub3d9\uae30 \ucf5c\ubc31 \ud568\uc218",source:"@site/docs/typescript/do-it-typescript/chapter-7.md",sourceDirName:"typescript/do-it-typescript",slug:"/typescript/do-it-typescript/chapter-7",permalink:"/reading_books_record_repository/docs/typescript/do-it-typescript/chapter-7",draft:!1,editUrl:"https://github.com/saseungmin/reading_books_record_repository/tree/master/docs/typescript/do-it-typescript/chapter-7.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8,sidebar_label:"7. Promise\uc640 async/await \uad6c\ubb38"},sidebar:"tutorialSidebar",previous:{title:"6. \ubc18\ubcf5\uae30 \uc774\ud574\ud558\uae30",permalink:"/reading_books_record_repository/docs/typescript/do-it-typescript/chapter-6"},next:{title:"8. \ud568\uc218 \uc870\ud569\uc758 \uc6d0\ub9ac\uc640 \uc751\uc6a9",permalink:"/reading_books_record_repository/docs/typescript/do-it-typescript/chapter-8"}},s={},c=[{value:"\ud83e\udd84 \ube44\ub3d9\uae30 \ucf5c\ubc31 \ud568\uc218",id:"-\ube44\ub3d9\uae30-\ucf5c\ubc31-\ud568\uc218",level:2},{value:"\ud83d\udcda \ub3d9\uae30\uc640 \ube44\ub3d9\uae30 API",id:"-\ub3d9\uae30\uc640-\ube44\ub3d9\uae30-api",level:3},{value:"\ud83d\udcda \ub2e8\uc77c \uc2a4\ub808\ub4dc\uc640 \ube44\ub3d9\uae30 API",id:"-\ub2e8\uc77c-\uc2a4\ub808\ub4dc\uc640-\ube44\ub3d9\uae30-api",level:3},{value:"\ud83d\udcda \ucf5c\ubc31 \uc9c0\uc625",id:"-\ucf5c\ubc31-\uc9c0\uc625",level:3},{value:"\ud83e\udd84 Promise \uc774\ud574\ud558\uae30",id:"-promise-\uc774\ud574\ud558\uae30",level:2},{value:"\ud83d\udcda resolve\uc640 reject \ud568\uc218",id:"-resolve\uc640-reject-\ud568\uc218",level:3},{value:"\ud83d\udcda Promise.resolve\uc640 Promise.reject \uba54\uc11c\ub4dc",id:"-promiseresolve\uc640-promisereject-\uba54\uc11c\ub4dc",level:3},{value:"\ud83d\udcda then-\uccb4\uc778",id:"-then-\uccb4\uc778",level:3},{value:"\ud83d\udcdaPromise.all \uba54\uc11c\ub4dc",id:"promiseall-\uba54\uc11c\ub4dc",level:3},{value:"\ud83d\udcda Promise.race \uba54\uc11c\ub4dc",id:"-promiserace-\uba54\uc11c\ub4dc",level:3},{value:"\ud83e\udd84 async\uc640 await \uad6c\ubb38",id:"-async\uc640-await-\uad6c\ubb38",level:2},{value:"\ud83d\udcda async \ud568\uc218\uc758 \ub450 \uac00\uc9c0 \uc131\uc9c8",id:"-async-\ud568\uc218\uc758-\ub450-\uac00\uc9c0-\uc131\uc9c8",level:3},{value:"\ud83d\udcda async \ud568\uc218\uac00 \ubc18\ud658\ud558\ub294 \uac12\uc758 \uc758\ubbf8",id:"-async-\ud568\uc218\uac00-\ubc18\ud658\ud558\ub294-\uac12\uc758-\uc758\ubbf8",level:3},{value:"\ud83d\udcda async \ud568\uc218\uc758 \uc608\uc678 \ucc98\ub9ac",id:"-async-\ud568\uc218\uc758-\uc608\uc678-\ucc98\ub9ac",level:3},{value:"\ud83d\udcda async \ud568\uc218\uc640 Promise.all",id:"-async-\ud568\uc218\uc640-promiseall",level:3}],m={toc:c};function p(e){let{components:r,...n}=e;return(0,l.kt)("wrapper",(0,t.Z)({},m,n,{components:r,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"-chapter-7-promise\uc640-asyncawait-\uad6c\ubb38"},"\ud83d\udc24 Chapter 7: Promise\uc640 async/await \uad6c\ubb38"),(0,l.kt)("h2",{id:"-\ube44\ub3d9\uae30-\ucf5c\ubc31-\ud568\uc218"},"\ud83e\udd84 \ube44\ub3d9\uae30 \ucf5c\ubc31 \ud568\uc218"),(0,l.kt)("h3",{id:"-\ub3d9\uae30\uc640-\ube44\ub3d9\uae30-api"},"\ud83d\udcda \ub3d9\uae30\uc640 \ube44\ub3d9\uae30 API"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Node.js\uc5d0\uc11c \ud30c\uc77c \uc2dc\uc2a4\ud15c\uacfc \uad00\ub828\ub41c \uae30\ub2a5\uc744 \ubaa8\uc544\ub454 ",(0,l.kt)("inlineCode",{parentName:"li"},"fs")," \ud328\ud0a4\uc9c0\ub97c \uc81c\uacf5\ud558\ub294\ub370, \ub3d9\uae30 \ube44\ub3d9\uae30 \ubc84\uc804\uc73c\ub85c \ub098\ub204\uc5b4 \uc81c\uacf5\ud55c\ub2e4. \uc608\ub97c \ub4e4\uc5b4, \ub3d9\uae30 \ubc84\uc804\uc778 ",(0,l.kt)("inlineCode",{parentName:"li"},"readFileSync"),"\uc640 \ube44\ub3d9\uae30 \ubc84\uc804\uc778 ",(0,l.kt)("inlineCode",{parentName:"li"},"readFile"),"\ub85c \uc81c\uacf5\ud55c\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import { readFileSync, readFile } from \"fs\";\n\n// \ub3d9\uae30 \ubc29\uc2dd\uc73c\ub85c \uc77d\uae30\nconst buffer: Buffer = readFileSync('./package.json');\nconsole.log(buffer.toString());\n\n// \ube44\ub3d9\uae30 \ubc29\uc2dd\uc73c\ub85c \uc77d\uae30\nreadFile('./package.json', (error: Error, buffer: Buffer) => {\n  console.log(buffer.toString());\n});\n\n// Promise\uc640 async/await \uad6c\ubb38\uc744 \uc0ac\uc6a9\ud55c \uc608\nconst readFilePromise = (filename: string): Promise<string> =>\n  new Promise<string>((resolve, reject) => {\n    readFile(filename, (error: Error, buffer: Buffer) => {\n      if(error) {\n        reject(error);\n      } else {\n        resolve(buffer.toString());\n      }\n    });\n  });\n\n(async () => {\n  const content = await readFilePromise('./package.json');\n  console.log(content);\n})();\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"API \ud568\uc218\ub294 \uc77c\ubc18 \ud568\uc218\uc640 \ub2ec\ub9ac \ud558\ub4dc\ub514\uc2a4\ud06c\uc5d0 \uc800\uc7a5\ub41c \ud30c\uc77c\uc744 \uc77d\ub294 \ub4f1 \uc2e4\ud589\uc2dc \ubb3c\ub9ac\uc801\uc778 \uc2dc\uac04\uc774 \uc18c\uc694\ub41c\ub2e4."),(0,l.kt)("li",{parentName:"ul"},"\ub530\ub77c\uc11c \ud30c\uc77c \ub0b4\uc6a9\uc744 \ubaa8\ub450 \uc77d\uc744 \ub54c\uae4c\uc9c0 \ud504\ub85c\uadf8\ub7a8\uc758 \ub3d9\uc791\uc744 \uc7a0\uc2dc \uba48\ucd94\ub294 \ub3d9\uae30 \ubc29\uc2dd\uc758 API\uc640 \ud504\ub85c\uadf8\ub7a8\uc758 \ub3d9\uc791\uc744 \uba48\ucd94\uc9c0 \uc54a\ub294 \ub300\uc2e0 \uacb0\uacfc\ub97c \ucf5c\ubc31 \ud568\uc218\ub85c \uc5bb\uac8c \ud558\ub294 \ube44\ub3d9\uae30 \ubc29\uc2dd\uc758 API\ub97c \uc81c\uacf5\ud55c\ub2e4."),(0,l.kt)("li",{parentName:"ul"},"\ube44\ub3d9\uae30 API\uc758 \ucf5c\ubc31 \ud568\uc218\ub97c ",(0,l.kt)("strong",{parentName:"li"},"\ube44\ub3d9\uae30 \ucf5c\ubc31 \ud568\uc218"),"\ub77c\uace0 \ud55c\ub2e4. \ube44\ub3d9\uae30 \ucf5c\ubc31 \ud568\uc218\ub294 \uc77c\ubc18 \ud568\uc218\uc640 \ub2ec\ub9ac API\uc758 \ubb3c\ub9ac\uc801\uc778 \ub3d9\uc791 \uacb0\uacfc\ub97c \uc218\uc2e0\ud558\ub294 \ubaa9\uc801\uc73c\ub85c\ub9cc \uc0ac\uc6a9\ud55c\ub2e4.")),(0,l.kt)("h3",{id:"-\ub2e8\uc77c-\uc2a4\ub808\ub4dc\uc640-\ube44\ub3d9\uae30-api"},"\ud83d\udcda \ub2e8\uc77c \uc2a4\ub808\ub4dc\uc640 \ube44\ub3d9\uae30 API"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\uc790\ubc14\uc2a4\ud06c\ub9bd\ud2b8\ub294 \ub2e8\uc77c \uc2a4\ub808\ub4dc\ub85c \ub3d9\uc791\ud558\ubbc0\ub85c \ub420 \uc218 \uc788\uc73c\uba74 ",(0,l.kt)("inlineCode",{parentName:"li"},"readFileSync"),"\uc640 \uac19\uc740 \ub3d9\uae30 API\ub97c \uc0ac\uc6a9\ud558\uc9c0 \ub9d0\uc544\uc57c \ud55c\ub2e4."),(0,l.kt)("li",{parentName:"ul"},"\ub3d9\uae30 API\uac00 \uc2e4\ud589\ub418\uba74, \uc6b4\uc601\uccb4\uc81c\ub294 \ub3d9\uae30 API\uc758 \uc791\uc5c5 \uacb0\uacfc\ub97c \ud568\uc218\uc758 \ubc18\ud658\uac12\uc73c\ub85c \ub3cc\ub824\uc918\uc57c \ud55c\ub2e4. \uc774 \ub54c\ubb38\uc5d0 \uc6b4\uc601\uccb4\uc81c\ub294 \ub3d9\uae30 API\uac00 \uc2e4\ud589\ub41c \ucf54\ub4dc\ub97c \uc77c\uc2dc\uc801\uc73c\ub85c \uba48\ucd98 \ub2e4\uc74c, \ub610 \ub2e4\ub978 \uc2a4\ub808\ub4dc\uc5d0\uc11c \uc2e4\uc81c \uc791\uc5c5\uc744 \uc2e4\ud589\ud574 \ucf24\uacfc\ub97c \uc5bb\uc73c\uba74 \uadf8\ub54c\uc11c\uc57c \uc7a0\uc2dc \uba48\ucdc4\ub358 \ub3d9\uae30 API\ub97c \uc2e4\ud589\ud558\uba74\uc11c \uacb0\uad0f\uac12\uc744 \ubc18\ud658\ud55c\ub2e4. \uadf8\ub807\uae30 \ub54c\ubb38\uc5d0 \uacb0\uacfc\ub97c \ubc18\ud658\ud560 \ub54c\uae4c\uc9c0 \uc77c\uc2dc\uc801\uc73c\ub85c \uba48\ucd94\ub294 \ud604\uc0c1\uc774 \ubc1c\uc0dd\ud55c\ub2e4.")),(0,l.kt)("h3",{id:"-\ucf5c\ubc31-\uc9c0\uc625"},"\ud83d\udcda \ucf5c\ubc31 \uc9c0\uc625"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\ube44\ub3d9\uae30 API\ub97c \uc0ac\uc6a9\ud558\uba74 \ucf5c\ubc31 \ud568\uc218\uc5d0\uc11c \ub610 \ub2e4\uc2dc \ub2e4\ub978 \ube44\ub3d9\uae30 API\ub97c \ud638\ucd9c\ud558\ub294 \ucf54\ub4dc\ub97c \ub9cc\ub4e4 \ub54c \ucf54\ub4dc\uac00 \ub9e4\uc6b0 \ubcf5\uc7a1\ud574\uc9c4\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import { readFile } from \"fs\";\n\nreadFile('./package.json', (error: Error, buffer: Buffer) => {\n  if (error) {\n    throw error;\n  } else {\n    const content: string = buffer.toString();\n    console.log(content);\n  }\n\n  readFile('./tsconfig.json',(err: Error, buffer: Buffer) => {\n    if (error) {\n      throw error;\n    } else {\n      const content: string = buffer.toString();\n      console.log(content);\n    }\n  })\n});\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Promise"),"\ub97c \uc0ac\uc6a9\ud558\uba74 \uc774\ub7f0 \ucf5c\ubc31 \uc9c0\uc625\uc5d0 \ube60\uc9c4 \ucf54\ub4dc\ub97c \uc880 \ub354 \ub2e4\ub8e8\uae30 \uc26c\uc6b4 \ud615\ud0dc\uc758 \ucf54\ub4dc\ub85c \ub9cc\ub4e4 \uc218 \uc788\ub2e4.")),(0,l.kt)("h2",{id:"-promise-\uc774\ud574\ud558\uae30"},"\ud83e\udd84 Promise \uc774\ud574\ud558\uae30"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8\uc5d0\uc11c ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise"),"\ub294 \ub2e4\uc74c\uacfc \uac19\uc774 \uc81c\ub124\ub9ad \ud074\ub798\uc2a4 \ud615\ud0dc\ub85c \uc0ac\uc6a9\ub41c\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const numPromise: Promise<number> = new Promise<number>(\ucf5c\ubc31\ud568\uc218);\nconst strPromise: Promise<string> = new Promise<string>(\ucf5c\ubc31\ud568\uc218);\nconst arrayPromise: Promise<number[]> = new Promise<number[]>(\ucf5c\ubca1\ud798\uc218);\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\ud0c0\uc785\uc2a4\ud06c\ub9bd\ud2b8 ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise"),"\uc758 \ucf5c\ubc31 \ud568\uc218\ub294 \ub2e4\uc74c\ucc98\ub7fc ",(0,l.kt)("inlineCode",{parentName:"li"},"resolve"),"\uc640 ",(0,l.kt)("inlineCode",{parentName:"li"},"reject")," \ud568\uc218\ub97c \ub9e4\uac1c\ubcc0\uc218\ub85c \ubc1b\ub294 \ud615\ud0dc\uc774\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"new Promise<T>((\n  resolve: (successValue: T) => void,\n  reject: (any) => void,\n) => {\n  // \ucf54\ub4dc \uad6c\ud604\n});\n")),(0,l.kt)("h3",{id:"-resolve\uc640-reject-\ud568\uc218"},"\ud83d\udcda resolve\uc640 reject \ud568\uc218"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\ub2e4\uc74c\uc740 \ube44\ub3d9\uae30 API\uc778 ",(0,l.kt)("inlineCode",{parentName:"li"},"readFile"),"\uc744 \ud638\ucd9c\ud558\ub294 \ub0b4\uc6a9\uc744 \ud504\ub85c\ubbf8\uc2a4\ub85c \uad6c\ud604\ud55c \uc608\uc774\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import { readFile } from 'fs';\n\nexport const readFilePromise = (filename: string): Promise<string> =>\n  new Promise<string>((\n    resolve: (value: string) => void,\n    reject: (error: Error) => void) => {\n      readFile(filename, (err: Error, buffer: Buffer) => {\n        if(err) {\n          reject(err);\n        } else {\n          resolve(buffer.toString());\n        }\n      })\n    }\n  )\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"\ub2e4\uc74c \ucf54\ub4dc\ub294 ",(0,l.kt)("inlineCode",{parentName:"li"},"readFilePromise")," \ud568\uc218\uac00 \ubc18\ud658\ud558\ub294 ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise")," \ud0c0\uc785 \uac1d\uccb4\uc758 ",(0,l.kt)("inlineCode",{parentName:"li"},"then"),", ",(0,l.kt)("inlineCode",{parentName:"li"},"catch"),", ",(0,l.kt)("inlineCode",{parentName:"li"},"finally")," \uba54\uc11c\ub4dc\ub97c \uba54\uc11c\ub4dc \uccb4\uc778 \ud615\ud0dc\ub85c \uc0ac\uc6a9\ud55c\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import { readFilePromise } from \"./readFilePromise\";\n\nreadFilePromise('./package.json')\n  .then((content: string) => {\n    console.log(content);\n    return readFilePromise('./tsconfig.json');\n  })\n  .then((content: string) => {\n    console.log(content);\n    return readFilePromise('.');\n  })\n  .catch((err: Error) => console.log('error: ', err.message))\n  .finally(() => console.log('\ud504\ub85c\uadf8\ub7a8 \uc885\ub8cc'));\n")),(0,l.kt)("h3",{id:"-promiseresolve\uc640-promisereject-\uba54\uc11c\ub4dc"},"\ud83d\udcda Promise.resolve\uc640 Promise.reject \uba54\uc11c\ub4dc"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Promise.resolve(\uac12)")," \ud615\ud0dc\ub85c \ud638\ucd9c\ud558\uba74 \ud56d\uc0c1 \uc774 \uac11\uc740 ",(0,l.kt)("inlineCode",{parentName:"li"},"then")," \uba54\uc11c\ub4dc\uc5d0\uc11c \uc5bb\uc744 \uc218 \uc788\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"Promise.resolve({ name: 'Jack', age: 32 })\n  .then(value => console.log(value)); // { name: 'Jack', age: 32 }\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Promise.reject(Error \ud0c0\uc785 \uac1d\uccb4)"),"\ub97c \ud638\ucd9c\ud558\uba74 \uc774 Error \ud0c0\uc785 \uac1d\uccb4\ub294 \ud56d\uc0c1 ",(0,l.kt)("inlineCode",{parentName:"li"},"catch")," \uba54\uc11c\ub4dc\uc758 \ucf5c\ubc31 \ud568\uc218\uc5d0\uc11c \uc5bb\uc744 \uc218 \uc788\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"Promise.reject(new Error('\uc5d0\ub7ec \ubc1c\uc0dd'))\n  .catch((err: Error) => console.log('error: ', err.message)); // error: \uc5d0\ub7ec \ubc1c\uc0dd\n")),(0,l.kt)("h3",{id:"-then-\uccb4\uc778"},"\ud83d\udcda then-\uccb4\uc778"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Promise")," \uac1d\uccb4\uc5d0 ",(0,l.kt)("inlineCode",{parentName:"li"},"then")," \uba54\uc11c\ub4dc\ub97c \uc5ec\ub7ec \ubc88 \ud638\ucd9c\ud558\ub294 \ucf54\ub4dc \ud615\ud0dc\ub97c ",(0,l.kt)("inlineCode",{parentName:"li"},"then-\uccb4\uc778"),"\uc774\ub77c\uace0 \ud55c\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"Promise.resolve(1)\n  .then((value: number) => {\n    console.log(value); // 1\n    return Promise.resolve(true);\n  })\n  .then((value: boolean) => {\n    console.log(value); // true\n    return [1, 2, 3];\n  })\n  .then((value: number[]) => {\n    console.log(value); // [1, 2, 3]\n    return { name: 'jack', age: 32 };\n  })\n  .then((value: { name: string, age: number }) => {\n    console.log(value); // { name: 'jack', age: 32 }\n  })\n")),(0,l.kt)("h3",{id:"promiseall-\uba54\uc11c\ub4dc"},"\ud83d\udcdaPromise.all \uba54\uc11c\ub4dc"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Promise.all")," \uba54\uc11c\ub4dc\ub294 ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise")," \uac1d\uccb4\ub97c \ubc30\uc5f4 \ud615\ud0dc\ub85c \ubc1b\uc544, \ubaa8\ub4e0 \uac1d\uccb4\ub97c \ub300\uc0c1\uc73c\ub85c ",(0,l.kt)("inlineCode",{parentName:"li"},"resolve"),"\ub41c \uac12\ub4e4\uc758 \ubc30\uc5f4\ub85c \ub9cc\ub4e4\uc5b4 \uc900\ub2e4."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Promise.all")," \uba54\uc11c\ub4dc\ub294 \uc774\ub7f0 \ub0b4\uc6a9\uc73c\ub85c \uad6c\uc131\ub41c \ub610 \ub2e4\ub978 ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise")," \uac1d\uccb4\ub97c \ubc18\ud658\ud558\ubbc0\ub85c \ud574\uc18c\ub41c \uac12\ub4e4\uc758 \ubc30\uc5f4\uc740 ",(0,l.kt)("inlineCode",{parentName:"li"},"then")," \uba54\uc11c\ub4dc\ub97c \ud638\ucd9c\ud574\uc11c \uc5bb\ub294\ub2e4."),(0,l.kt)("li",{parentName:"ul"},"\ub9cc\uc57d, \ubc30\uc5f4\uc5d0 \ub2f4\uae34 ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise")," \uac1d\uccb4 \uc911 \uac70\uc808 \uac1d\uccb4\uac00 \ubc1c\uc0dd\ud558\uba74 \ub354 \uae30\ub2e4\ub9ac\uc9c0 \uc54a\uace0 \ud574\ub2f9 \uac70\uc808 \uac12\uc744 \ub2f4\uc740 ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise.reject")," \uac1d\uccb4\ub97c \ubc18\ud658\ud55c\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const getAllResolvedResult = <T>(promises: Promise<T>[]) => Promise.all(promises);\n\ngetAllResolvedResult<any>([Promise.resolve(true), Promise.resolve('hello')])\n  .then(result => console.log(result)); // [true, 'hello']\n\ngetAllResolvedResult<any>([Promise.reject(new Error('error')), Promise.resolve(1)])\n  .then(result => console.log(result)) // \ud638\ucd9c\ub418\uc9c0 \uc54a\ub294\ub2e4.\n  .catch(error => console.log('error: ', error.message)); // error: error\n")),(0,l.kt)("h3",{id:"-promiserace-\uba54\uc11c\ub4dc"},"\ud83d\udcda Promise.race \uba54\uc11c\ub4dc"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"Promise.race"),"\ud074\ub798\uc2a4 \uba54\uc11c\ub4dc\ub294 \ubc30\uc5f4\uc5d0 \ub2f4\uae34 \ud504\ub85c\ubbf8\uc2a4 \uac1d\uccb4 \uc911 \ud558\ub098\ub77c\ub3c4 ",(0,l.kt)("inlineCode",{parentName:"li"},"resolve"),"\ub418\uba74 \uc774 \uac12\uc744 \ub2f4\uc740 ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise.resolve")," \uac1d\uccb4\ub97c \ubc18\ud658\ud55c\ub2e4. \ub9cc\uc77c \uac70\uc808 \uac12\uc774 \uac00\uc7a5 \uba3c\uc800 \ubc1c\uc0dd\ud558\uba74 ",(0,l.kt)("inlineCode",{parentName:"li"},"promise.reject")," \uac1d\uccb4\ub97c \ubc18\ud658\ud55c\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"Promise.race([Promise.resolve(true), Promise.resolve('hello')])\n  .then(value => console.log(value)); // true\n\nPromise.race([Promise.resolve(true), Promise.reject(new Error('hello'))])\n  .then(value => console.log(value)) // true\n  .catch(error => console.log(error.message)); // \ud638\ucd9c\ub418\uc9c0 \uc54a\ub294\ub2e4\n\nPromise.race([Promise.reject(new Error('error')), Promise.resolve(true)])\n  .then(value => console.log(value)) // \ud638\ucd9c\ub418\uc9c0 \uc54a\ub294\ub2e4\n  .catch(error => console.log(error.message)); // error\n")),(0,l.kt)("h2",{id:"-async\uc640-await-\uad6c\ubb38"},"\ud83e\udd84 async\uc640 await \uad6c\ubb38"),(0,l.kt)("h3",{id:"-async-\ud568\uc218\uc758-\ub450-\uac00\uc9c0-\uc131\uc9c8"},"\ud83d\udcda async \ud568\uc218\uc758 \ub450 \uac00\uc9c0 \uc131\uc9c8"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"async")," \ud568\uc218 \uc218\uc815\uc790\uac00 \ubd99\uc740 \ud568\uc218\ub294 \ub2e4\uc74c\uacfc \uac19\uc740 \uc131\uc9c8\uc744 \uac00\uc9c0\uace0 \uc788\ub2e4.")),(0,l.kt)("blockquote",null,(0,l.kt)("ol",{parentName:"blockquote"},(0,l.kt)("li",{parentName:"ol"},"\uc77c\ubc18 \ud568\uc218\ucc98\ub7fc \uc0ac\uc6a9\ud560 \uc218 \uc788\ub2e4."),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("inlineCode",{parentName:"li"},"Promise")," \uac1d\uccb4\ub85c \uc0ac\uc6a9\ud560 \uc218 \uc788\ub2e4."))),(0,l.kt)("h3",{id:"-async-\ud568\uc218\uac00-\ubc18\ud658\ud558\ub294-\uac12\uc758-\uc758\ubbf8"},"\ud83d\udcda async \ud568\uc218\uac00 \ubc18\ud658\ud558\ub294 \uac12\uc758 \uc758\ubbf8"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"async")," \ud568\uc218\ub294 \uac12\uc744 \ubc18\ud658\ud560 \uc218 \uc788\ub2e4. \uc774\ub54c \ubc18\ud658\uac12\uc740 ",(0,l.kt)("inlineCode",{parentName:"li"},"Promise")," \ud615\ud0dc\ub85c \ubcc0\ud658\ub418\ubbc0\ub85c \ub2e4\uc74c\ucc98\ub7fc ",(0,l.kt)("inlineCode",{parentName:"li"},"then")," \uba54\uc11c\ub4dc\ub97c \ud638\ucd9c\ud574 ",(0,l.kt)("inlineCode",{parentName:"li"},"async")," \ud568\uc218\uc758 \ubc18\ud658\uac12\uc744 \uc5bb\uc5b4\uc57c \ud55c\ub2e4.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const asyncReturn = async() => {\n  return [1, 2, 3];\n}\n\nasyncReturn()\n  .then(value =>  console.log(value)); // [1, 2, 3]\n")),(0,l.kt)("h3",{id:"-async-\ud568\uc218\uc758-\uc608\uc678-\ucc98\ub9ac"},"\ud83d\udcda async \ud568\uc218\uc758 \uc608\uc678 \ucc98\ub9ac"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"const asyncException = async () => {\n  throw new Error('error');\n}\n\nasyncException()\n  .catch(err => console.log('error: ', err.message)); // error: error\n")),(0,l.kt)("h3",{id:"-async-\ud568\uc218\uc640-promiseall"},"\ud83d\udcda async \ud568\uc218\uc640 Promise.all"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ts"},"import { readFilePromise } from \"./readFilePromise\"\n\nconst readFilesAll = async (fileNames: string[]) => {\n  return await Promise.all(\n    fileNames.map(fileNames => readFilePromise(fileNames))\n  );\n}\n\nreadFilesAll(['./package.json', './tsconfig.json'])\n  .then(([packageJson, tsConfigJson]: string[]) => {\n    console.log(packageJson);\n    console.log(tsConfigJson);\n  })\n  .catch(err => console.log(err))\n")))}p.isMDXComponent=!0}}]);