import { Node, Shape } from '@antv/x6';

export const node = {
  x: 20,
  // y: 300,
  width: 200,
  height: 60,
  markup: [
    {
      tagName: 'rect',// 矩形
      selector: 'body',
    },
    {
      tagName: 'text', // 文本
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'content',
    },
    {
      tagName: 'image',// 图片
      selector: 'fold',
    },
    {
      tagName: 'image',// 图片
      selector: 'copy',
    },
    {
      tagName: 'image',
      selector: 'abstract',
    },
    {
      tagName: 'image',
      selector: 'jump',
    }
  ],
  attrs: {
    body: {
      // stroke: '#d7d9de',
      strokeWidth: 0,
      fill: 'rgba(255,165,0,0.5)',
      rx: 6,
      ry: 6
    },
    title: {
      text: '销售订单  JYSO220529E',
      // refX: 40,
      refY: 20,
      fill: 'rgba(12,111,255,1)',
      fontSize: 14,
      // 'text-anchor': 'start',//start middle end
    },
    content: {
      text: '2022-05-13',
      refY: 38,
      fontSize: 12,
      fill: 'rgba(25,25,25,1)',
    },
    fold: {
      event: 'node:fold',
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 12,
      height: 12,
    },
    copy: {
      event: 'node:copy',
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 12,
      height: 12,
      y: 12,
    },
    abstract: {
      event: 'node:abstract',
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 12,
      height: 12,
      y: 24,
    },
    jump: {
      event: 'node:jump',
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 12,
      height: 12,
      y: 36,
    },
  },
  data: {
    disableMove: false,//禁止拖动
  }
};

//====================
export const textBlock = new Shape.TextBlock({
  x: 50,      // Number，必选，节点位置的 x 值
  y: 40,      // Number，必选，节点位置的 y 值
  width: 360,   // Number，可选，节点大小的 width 值
  height: 120,  // Number，可选，节点大小的 height 值
  text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  attrs: {
    label: {
      contenteditable: "true",// 编辑开启
    },
    body: {
      fill: '#efdbff',
      stroke: '#9254de',
      rx: 4,
      ry: 4,
    },
  },
  data: {
    disableMove: false,//禁止拖动
  }
});
export const customNode = new Node({
  x: 400,
  y: 350,
  width: 200,
  height: 60,
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    text: {
      fontSize: 14,
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
    },
    rect: {
      ref: 'label',
      stroke: '#000',
      fill: '#fff',
      rx: 3,
      ry: 3,
      refWidth: 100,
      refHeight: 100,
      refX: -50,
      refY: -50,
    },
    label: {
      text: "自定义node", // 文字
    },
  },
});