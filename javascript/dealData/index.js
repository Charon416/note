/**
 * @description 1、合并数组中每个对象的某些属性
 */
 const cookies = [
  {
    name: 'JSESSIONID',
    value: 'aaaMEGt_DlwUCh4btenoy',
    domain: 'phone.recharge.mipay.com',
  },
  {
    name: 'mipaycom_ph',
    value: 'ZzvaEGo5PZ6RcrYopMfa+Q==',
    domain: '.mipay.com',
  },
]
const res1 = cookies.reduce((pre, { name, value }) => (pre += `${name}=${value};`), '')
console.log(res1) // JSESSIONID=aaaMEGt_DlwUCh4btenoy;mipaycom_ph=ZzvaEGo5PZ6RcrYopMfa+Q==;

/**
 * @description 2、使用 map 重新格式化数组中的对象
 */
const arr2 = [
  { FLDVALUE: '0', CODENAME: '无' },
  { FLDVALUE: '6', CODENAME: '组' },
]
const res2 = arr2.map(({ FLDVALUE, CODENAME }) => ({ [FLDVALUE]: CODENAME }))
console.log(res2) // [ { '0': '无' }, { '6': '组' } ]
const res3 = arr2.reduce((pre, { FLDVALUE, CODENAME }) => {
  pre[FLDVALUE] = CODENAME
  return pre
}, {})
console.log(res3) // { '0': '无', '6': '组' }

/**
 * @description 3、累加对象数组里的值
 */
const arr3 = [{ x: 1 }, { x: 2 }, { x: 3 }]
const value3 = arr3.reduce((pre, { x }) => pre + x, 0)
console.log(value3)

/**
 * @description 4、数组转树结构
 */
const arr4 = [
  {
    Email: 'type11@v8pay.net',
    Id: 62268434,
    ParentId: 0,
  },
  {
    Email: 'a@test.com',
    Id: 62268461,
    ParentId: 62268462,
  },
  {
    Email: 'b@test.com',
    Id: 62268462,
    ParentId: 62268463,
  },
  {
    Email: 'c@test.com',
    Id: 62268463,
    ParentId: 0,
  },
]
const rootNode = arr4.filter(item => item.ParentId === 0)
const getChilds = list => {
  return list.map(item => {
    const children = arr4.filter(temp => item.Id === temp.ParentId)
    item.children = getChilds(children)
    return item
  })
}
console.log(getChilds(rootNode))

/**
 * @description 5、树结构转数组
 */
 const arr5 = [
  {
    entity: '小A1',
    num: 3,
    nodeList: [
      {
        entity: '小B1',
        num: 1,
        nodeList: [
          {
            entity: '小C1',
            num: 1,
            nodeList: [
              {
                entity: '小D1',
                num: 0,
                nodeList: null
              }
            ]
          }
        ]
      },
      {
        entity: '小B2',
        num: 0,
        nodeList: [
          {
            entity: '小C2',
            num: 0,
            nodeList: null
          }
        ]
      },
      {
        entity: '小B3',
        num: 0,
        nodeList: null
      },
    ]
  }
]
const deepFormate = (target, res = [], parent) => {
  for (const o of target) {
    if (parent) res.push({source: parent, target: o.entity})
    if (!o.nodeList) return res
    deepFormate(o.nodeList, res, o.entity)
  }
  return res
}
console.log(deepFormate(arr5))
/**
 * @description 6、对象数组按照字段内容分组
 */
const arr6 = [
  { a: 1, b: 1, c: 1 },
  { a: 1, b: 2, c: 3 },
  { a: 2, b: 2, c: 3 },
]
function groupByField2(arr) {
  return arr.reduce((pre, cur) => {
    const findItem = pre.find(item => item.a === cur.a)
    return findItem
      ? findItem.content.push(cur) && pre
      : pre.push({ a: cur.a, content: [{ ...cur }] }) && pre
  }, [])
}
console.log(groupByField2(arr6))

/**
 * @description 7、深拷贝
 */
function deepClone(obj, cache = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  if (cache.has(obj)) return cache.get(obj) // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
  const cloneObj = new obj.constructor() // 使用对象所属的构造函数创建一个新对象
  cache.set(obj, cloneObj) // 缓存对象，用于循环引用的情况

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], cache) // 递归拷贝
    }
  }
  return cloneObj
}
const obj7 = { name: 'Jack', address: { x: 100, y: 200 } }
// obj7.a = obj7 // 循环引用
const newObj = deepClone(obj7)
console.log(newObj.address === obj7.address) // false
