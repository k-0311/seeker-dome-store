import image from './img/card-bg.png'

export const shuffle = arr => {
  let len = arr.length
  while (len) {
    const rand = Math.floor(Math.random() * len--);
    [arr[len], arr[rand]] = [arr[rand], arr[len]]
  }
  return arr
}

export const randRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export const createList = (length = 1) => {
  const origin = Array.from({ length }, (_, i) => createItem(i))
  return shuffle(origin.concat(origin.map(item => ({ ...item }))))
}

export const createItem = type => ({
  type,
  color: randomHex(),
  image,
  flip: false,
  hidden: false
})

export const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, '0')}`
